<template>
  <div v-if="!isLoaded">
    <q-spinner class="center" color="primary" size="3em" />
  </div>

  <router-link to="/favorite"
    ><h3 class="text-center">Go to favorites</h3></router-link
  >

  <q-input
    v-model="searchPokemon"
    filled
    type="search"
    v-on:keyup.enter="pokemonSearch()"
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>

  <div class="sort q-pa-md">
    <div class="q-gutter-sm">
      <q-radio
        v-model="searchRadio"
        val="ascending"
        label="Ascending"
        @click="sortPokemon()"
      />
      <q-radio
        v-model="searchRadio"
        val="descending"
        label="Descending"
        @click="sortPokemon()"
      />
      <q-radio
        v-model="searchRadio"
        val="weight"
        label="Weight"
        @click="sortPokemon()"
      />
      <q-radio
        v-model="searchRadio"
        val="height"
        label="Height"
        @click="sortPokemon()"
      />
    </div>
  </div>

  <div v-if="!isWorking">
    <h4 class="text-center">Unable to find pokemon</h4>
  </div>

  <div v-if="isLoaded">
    <div class="row justify-center items-center">
      <div v-for="pokemon in pokemonList" :key="pokemon.id">
        <cardView :pokemon="pokemon"></cardView>
      </div>
    </div>
  </div>

  <div class="row justify-center items-center">
    <q-btn
      class="items-center"
      color="white"
      text-color="black"
      label="Load more"
      @click="addPokemon()"
    />
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "@vue/reactivity";
import cardView from "./UI/cardView.vue";

export default {
  components: {
    cardView,
  },
  setup() {
    const isLoaded = ref(false);
    const pokemonAmount = ref(15);
    const searchRadio = ref("ascending");
    const pokemonList = ref();
    const searchPokemon = ref("");
    const isWorking = ref(true);

    const loadPokemon = async () => {
      let list = [];
      for (let index = 1; index <= pokemonAmount.value; index++) {
        await axios
          .get("https://pokeapi.co/api/v2/pokemon/" + index)
          .then((res) => {
            list.push(res.data);
          });
      }
      pokemonList.value = list;
      isLoaded.value = true;
    };

    const addPokemon = () => {
      pokemonAmount.value += 15;
      loadPokemon();
    };

    const pokemonSearch = async () => {
      let list = [];
      try {
        await axios
          .get("https://pokeapi.co/api/v2/pokemon/" + searchPokemon.value)
          .then((res) => {
            list.push(res.data);
          });
        pokemonList.value = list;
        isWorking.value = true;
      } catch (error) {
        isWorking.value = false;
      }
    };

    const sortPokemon = () => {
      let rawList = pokemonList.value;
      if (searchRadio.value == "ascending") {
        rawList.sort((a, b) => {
          return a.id - b.id;
        });
      }

      if (searchRadio.value == "descending") {
        rawList.sort((a, b) => {
          return b.id - a.id;
        });
      }

      if (searchRadio.value == "weight") {
        rawList.sort((a, b) => {
          return a.weight - b.weight;
        });
      }

      if (searchRadio.value == "height") {
        rawList.sort((a, b) => {
          return a.height - b.height;
        });
      }
      pokemonList.value = rawList;
    };

    const storeFavorite = (id) => {
      let list = JSON.parse(localStorage.getItem("favorite"));
      if (list.indexOf(id) !== -1) {
        console.log("pokemon exists");
        return;
      } else {
        list.push(id);
        localStorage.setItem("favorite", JSON.stringify(list));
        console.log(localStorage.getItem("favorite"));
      }
    };

    loadPokemon(15);

    return {
      pokemonList,
      isLoaded,
      isWorking,
      searchRadio,
      loadPokemon,
      addPokemon,
      pokemonSearch,
      sortPokemon,
      storeFavorite,
      searchPokemon,
    };
  },
};
</script>

<style lang="sass" scoped>
.center
  display: block
  margin-left: auto
  margin-right: auto

.sort
  display: flex
  align-items: flex-end

.q-input
  background-color: white

.q-radio
  color: white


</style>