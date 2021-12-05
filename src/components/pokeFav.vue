<template>
  <body>
      <router-link to="/">
      <div class="row button">
        <q-btn color="primary" icon="home" />
      </div>
    </router-link>
    <div class="row justify-center items-center">
      <div v-for="pokemon in favPokemon" :key="pokemon.id">
        <cardView :pokemon="pokemon" @delete="deletePokemon"></cardView>
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
    const favList = ref([]);

    const loadFavorite = async () => {
      favList.value = JSON.parse(localStorage.getItem("favorite"));
      let list = [];
      for (let index = 0; index < favList.value.length; index++) {
        await axios
          .get("https://pokeapi.co/api/v2/pokemon/" + favList.value[index])
          .then((res) => {
            list.push(res.data);
          });
      }
      favPokemon.value = list;
    };

    const deletePokemon = (id) => {
      let list = favList.value;
      let index = list.findIndex((list) => {
        return list === id;
      });
      if (index != -1) {
        list.splice(index, 1);
        favList.value = list;
        localStorage.setItem("favorite", JSON.stringify(favList.value));
        loadFavorite();
        console.log(favList.value);
      }
    };

    loadFavorite();
    console.log(favPokemon);

    return {
      loadFavorite,
      deletePokemon,
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

.button
  justify-content: center
  margin-bottom: 20px
</style>