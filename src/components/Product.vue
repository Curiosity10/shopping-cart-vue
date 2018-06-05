<template>
  <v-container>
    <section class="product mt-3">
      <v-layout
        row
        wrap>
        <v-flex
          xs12
          lg6>
          <img
            :src="product.image"
            :alt="product.name"
            class="product_img">
        </v-flex>
        <v-flex
          xs12
          lg6>
          <div class="product_info">
            <h5 class="product_title display-1 mb-3 mt-3">{{ product.name }}</h5>
            <p class="product_category title">
              <span class="product_title">Vendor</span>: {{ product.vendor.charAt(0).toUpperCase() + product.vendor.substr(1) }}
            </p>
            <p class="product_price title">
            <span class="product_title">Price:</span> ${{ product.price }}</p>
            <p class="product_color title">
              <span class="product_title">Color:</span>
              <span
                :title="product.color"
                :style="{ backgroundColor: product.color}"
                class="product_color__bg"/>
            </p>
            <p class="product_material title">
              <span class="product_title">Material:</span> {{ product.material.charAt(0).toUpperCase() + product.material.substr(1) }}
            </p>
            <div class="product_description title mb-5">
              <p class="product_title mb-2">Description: </p>{{ product.description }}
            </div>
            <v-btn
              :disabled="!isUserLoggedIn"
              color="primary"
              class="headline product_buyNow"
              @click="addToCart(product); snackbar = true"
            >
              Buy Now
            </v-btn>
          </div>
        </v-flex>
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
      </v-layout>
    </section>
  </v-container>
</template>

<script>
/* eslint-disable vue/require-prop-types */

import mixins from '../mixins/mixins'
import Api from '../../config/Api'

export default {
  mixins: [mixins],
  props: ['id'],
  data () {
    return {
      product: {},
      text: 'The product was successfully added to the cart!',
      snackbar: false
    }
  },
  computed: {
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    }
  },
  created () {
    Api().get(`/products/${this.id}`)
      .then(response => {
        this.product = response.data
      })
  }
}
</script>

<style lang="stylus" scoped>
  .product
    display flex
    align-items center
    flex-wrap wrap
    border 1px solid rgb(0, 105, 92)
    padding 30px
    &_color__bg
      display inline-block
      width 50px
      height 20px
      border 1px solid #2b2b2b
      border-radius 10px

    &_info
      margin-left 50px

    &_img
      height 100%
      width 550px
    &_price
      color #c00f1b
    &_title
      font-size 1.6rem
      font-weight bold
      color #1875D0
      margin-bottom 0
    &_buyNow:disabled
      pointer-events auto
      cursor no-drop
  @media screen and (max-width: 1270px)
    .product
      text-align center
      &_info
        margin-left 0
  @media screen and (max-width: 620px)
    .product
      text-align start
      &_img
        width 100%
        height 100%
      &_title
        text-align center
  @media screen and (max-width: 400px)
    .product
      padding 10px
      text-align start
      &_img
        height 220px
      &_info
        margin-left 0

</style>
