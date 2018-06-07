<template>
  <v-container class="pt-3 pb-2 pl-4 pr-4 cards fill-height">
    <v-layout
      col
      wrap>
      <v-flex
        xs12
        class="card_content">
        <router-link
          :aria-label="product.name"
          :alt="product.name"
          :to="{name: 'product', params: {id: product._id}}"
          class="card_link mb-3"
          tag="a">
          <v-card-media
            :src="product.image"
            :alt="product.name"
            class="card_img ma-1 "
            height="100%"
          />
        </router-link>
        <h3 class="card_heading headline">{{ product.name }}</h3>
        <div class="card_describe">
          <p class="subheading" ><span class="title card_vendor">Vendor</span>: {{ product.vendor.charAt(0).toUpperCase() + product.vendor.substr(1) }}</p>
          <p class="subheading">{{ product.description.substring(0, 60) }}...</p>
          <p class="subheading card_price"><span class="title">Price:  </span>${{ product.price }}</p>
        </div>
        <v-card-actions justify-center>
          <v-btn
            :to="{ name: 'product', params: { id: product._id }}"
            alt="description"
            dark
            class="subheading"
            outline
            round
            color="light-blue darken-4">
            Description
          </v-btn>
          <v-btn
            v-if="isUserLoggedIn"
            dark
            round
            class="subheading btns_buyNow"
            color="light-blue darken-4"
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
    font-weight bold
    word-wrap break-word
    text-align center
    margin-bottom 1.5rem
    font-family $body-font-family
  .card_content
    display flex
    flex-direction column
  .card_describe
    margin-top auto
    padding-left 1rem
  .card_title
    justify-content center
  .card_vendor
    font-weight bold
    color black
  .card_price
    color #c00f1b
  .card_link
    height 300px
  .cards
    max-width 290px
    display flex
    flex-direction column

  .btns
    margin-top auto
</style>
