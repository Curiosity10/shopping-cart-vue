<template>
  <v-container grid-list-lg>
    <v-layout
      row
      wrap
      class="justify-space-around">
      <v-card
        v-for="product in products"
        :key="product._id"
        class="item teal lighten-4 mb-4"
        xs12
        sm6
        md4>
        <Card :product="product"/>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable vue/require-prop-types */

import Card from './Card'

export default {
  components: {
    Card
  },
  props: ['products']
}
</script>

<style scoped>

</style>
