<template>
  <v-container grid-list-sm>
    <v-layout
      row
      wrap
      class="cards_layout">
      <v-card
        v-for="product in products"
        :key="product._id"
        class="item mb-4 elevation-5"
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

<style lang="stylus" scoped>
  .cards_layout
      justify-content space-around
  .item
    border 2px solid #bdbdbd
  @media screen and (max-width: 620px)
    .cards_layout
      justify-content center
</style>
