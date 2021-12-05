<template>
  <body>
    <div class="row justify-center items-center">
      <div v-for="pokemon in favPokemon" :key="pokemon.id">
        <cardView :pokemon="pokemon"></cardView>
      </div>
    </div>
  </body>
</template>

<script>
import { ref } from "@vue/reactivity";
import axios from "axios";
import cardView from "./UI/cardView.vue";

export default {
  components: {
    cardView,
  },
  setup() {
    const favPokemon = ref();
    const favList = JSON.parse(localStorage.getItem("favorite"));

    const loadFavorite = async () => {
      let list = [];
      for (let index = 0; index < favList.length; index++) {
        await axios
          .get("https://pokeapi.co/api/v2/pokemon/" + favList[index])
          .then((res) => {
            list.push(res.data);
          });
      }
      favPokemon.value = list;
    };

    loadFavorite();
    console.log(favPokemon);

    return {
      loadFavorite,
      favPokemon,
    };
  },
};
</script>

<style lang="sass" scoped>
.center
  display: block
  margin-left: auto
  margin-right: auto
  width: 200
</style>