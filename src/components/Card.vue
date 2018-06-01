<template>
  <v-container class="pa-2 cards fill-height">
    <v-layout
      col
      wrap>
      <v-flex xs12 class="card_content">
        <router-link
          :aria-label="product.name"
          :alt="product.name"
          :to="{name: 'product', params: {id: product._id}}"
          class="card_link"
          tag="a">
          <v-card-media
            :src="product.image"
            :alt="product.name"
            class="card_img"
            height="300px"/>
        </router-link>
        <v-card-title
          class="headline mb-4 justify-center"
          primary-title>
          <h3 class="card_heading">{{ product.name }}</h3>
        </v-card-title>
        <p class="subheading"><span class="title">Vendor</span>: {{ product.vendor }}</p>
        <p class="subheading"><span class="title">Description: </span>{{ product.description.substring(0, 25) }}...</p>
        <p class="subheading"><span class="title">Price:  </span>${{ product.price }}</p>
        <v-card-actions class="btns justify-center">
          <v-btn
            :to="{ name: 'product', params: { id: product._id }}"
            alt="description"
            dark
            class="subheading"
            color="teal darken-3">
            Description
          </v-btn>
          <v-btn
            :disabled="!isUserLoggedIn"
            dark
            class="subheading btns_buyNow"
            color="teal darken-1"
            @click="addToCart(product); snackbar = true">Buy Now</v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
    <v-snackbar
      :timeout="1000"
      :vertical="true"
      v-model="snackbar"
      :top="true"
      color="success"
    >
      {{ text }}
      <v-btn
        flat
        dark
        @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
/* eslint-disable vue/require-prop-types */

import mixins from '../mixins/mixins'

export default {
  mixins: [mixins],
  props: ['product'],
  data () {
    return {
      text: 'The product was successfully added to the cart!',
      snackbar: false
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    }
  }
}
</script>

<style lang="stylus" scoped>
  .card_heading
    color #00695C
    word-wrap break-word
    text-align center
  .card_content
    max-width 270px
  .cards
    max-width 330px
    display flex
    flex-direction column

  .btns
    margin-top auto

    &_buyNow:disabled
      pointer-events auto
      cursor no-drop
</style>
