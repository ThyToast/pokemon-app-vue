<template>
  <q-card bordered class="my-card">
    <div class="row justify-center items-center">
      <router-link :to="{ name: 'Details', params: { id: pokemon.id } }">
        <q-card-section>
          <img
            class="center outline"
            :src="pokemon.sprites.front_default"
            alt="image"
          />
        </q-card-section>
      </router-link>

      <q-card-section class="text-center">
        <h6>{{ pokemon.id }}</h6>
        <p>
          Pokemon Name: <b>{{ pokemon.name }}</b>
        </p>
        <p>
          Height: <b>{{ pokemon.height }}</b>
        </p>
        <p>
          Weight: <b>{{ pokemon.weight }}</b>
        </p>

        <q-btn
          v-if="!isFavorite"
          round
          color="primary"
          icon="star"
          @click="storeFavorite(pokemon.id)"
        />

        <q-btn
          v-if="isFavorite"
          round
          color="primary"
          icon="delete"
          @click="deleteFavorite(pokemon.id)"
        />
      </q-card-section>
    </div>
  </q-card>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  props: {
    pokemon: Object,
  },
  setup(props, { emit }) {
    var isFavorite = false;
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

    const deleteFavorite = (id) => {
      emit("delete", id);
    };

    const checkRoute = () => {
      switch (useRoute().name) {
        case "Favorite":
          isFavorite = true;
          break;

        default:
          isFavorite = false;
          break;
      }
    };

    checkRoute();

    return {
      storeFavorite,
      deleteFavorite,
      isFavorite,
    };
  },
};
</script>

<style lang="sass">
.center
  display: block
  margin-left: auto
  margin-right: auto
  width: 200px

.my-card
  display: inline-block
  width: 100%
  max-width: 350px
  margin: 50px
  border-color: black
  border-width: 2px

.outline
  border-color: black
  border: 2px

a:hover
  background-color: lightgrey

a
  color: black
  text-decoration: none
</style>