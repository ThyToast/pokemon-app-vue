<template>
  <body>
    <div class="row button">
      <a
        v-if="pokemon.id > 1"
        :href="
          $router.resolve({ name: 'Details', params: { id: pokemon.id - 1 } }).href
        "
      >
        <q-btn color="primary" icon="navigate_before" @click="getDetail" />
      </a>

      <a
        :href="
          $router.resolve({ name: 'Details', params: { id: pokemon.id + 1 } }).href
        "
      >
        <q-btn
          class="end"
          color="primary"
          icon="navigate_next"
          @click="getDetail"
        />
      </a>
    </div>

    <q-card v-if="pokemon" class="center">
      <img class="center" :src="pokemon.sprites.front_default" alt="image" />
      <h3 class="text-center">{{ pokemon.id }}</h3>
      <h3 class="text-center">{{ pokemon.name }}</h3>
      <h4 class="text-center">Type:</h4>
      <div class="text-center">
        <h5 v-for="typeList in pokemon.types" :key="typeList.slot">
          {{ typeList.type.name }}
        </h5>
      </div>

      <h4 class="text-center">Height: {{ pokemon.height }}</h4>
      <h4 class="text-center">Weight: {{ pokemon.weight }}</h4>

      <h4 class="text-center">Abilities:</h4>
      <h5
        class="text-center"
        v-for="abilities in pokemon.abilities"
        :key="abilities.ability.name"
      >
        {{ abilities.ability.name }}
      </h5>

      <h4 class="text-center">Basic stats:</h4>
      <h5
        class="text-center"
        v-for="item in pokemon.stats"
        :key="item.stat.name"
      >
        {{ item.stat.name }} : {{ item.base_stat }}
      </h5>
    </q-card>
  </body>
</template> 

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const route = useRoute();
    const pokemon = ref();
    const getDetail = async () => {
      await axios
        .get("https://pokeapi.co/api/v2/pokemon/" + route.params.id)
        .then((res) => {
          pokemon.value = res.data;
        });
    };

    getDetail();

    return {
      pokemon,
      getDetail,
    };
  },
};
</script>

<style lang="sass">
.center
  display: flex
  width: 50%
.button
  justify-content: center
</style>