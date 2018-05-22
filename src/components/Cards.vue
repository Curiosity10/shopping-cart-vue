<template>
  <v-container grid-list-lg>
    <v-layout row wrap class="justify-space-around">
      <v-card class="item teal lighten-4 mb-4" xs12 sm6 md4 v-for="product in products" :key="product._id">
        <Card :product="product"/>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  import Card from './Card'

  export default {
    props: ['products'],
    components: {
      Card
    }
  }
</script>

<style scoped>

</style>
