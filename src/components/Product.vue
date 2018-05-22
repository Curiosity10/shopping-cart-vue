<template>
  <v-container>
    <section class="product mt-3 pa-4">
      <v-layout row wrap>
        <v-flex xs12 md6>
          <img :src="product.image" :alt="product.name" class="product_img">
        </v-flex>
        <v-flex xs12 md6>
          <div class="product_info ml-5">
            <h5 class="product_title display-2 mb-3 mt-3">{{ product.name }}</h5>
            <p class="product_category title">
              <span class="product_title headline">Vendor</span>: {{ product.vendor }}
            </p>
            <p class="product_price title">
              <span class="product_title headline">Price</span>: ${{product.price}}</p>
            <p class="product_color title">
              <span class="product_title headline">Color:</span> {{product.color}}
            </p>
            <p class="product_country title">
              <span class="product_title headline">Country:</span> {{product.country}}
            </p>
            <p class="product_material title">
              <span class="product_title headline">Material:</span> {{product.material}}
            </p>
            <div class="product_description title mb-5">
              <p class="product_title headline">Description: </p>{{ product.description }}
            </div>
            <v-btn
              color="primary"
              class="headline product_buyNow"
              @click="addToCart(product); snackbar = true"
              :disabled="!isUserLoggedIn"
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
          <v-btn flat dark @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-layout>
    </section>
  </v-container>
</template>

<script>
  import mixins from '../mixins/mixins'
  import Api from '../../config/Api'

  export default {
    props: ['id'],
    mixins: [mixins],
    data() {
      return {
        product: {},
        text: 'The product was successfully added to the cart!',
        snackbar: false,
      }
    },
    created() {
      Api().get(`/products/${this.id}`)
        .then(response => {
          this.product = response.data
        })
    },
    computed: {
      isUserLoggedIn () {
        return this.$store.getters.isUserLoggedIn
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .product
    display flex
    align-items center
    flex-wrap wrap
    border 1px solid rgb(0, 105, 92)

    &_info
      margin-left 50px

    &_img
      width 100%
      height 100%

    &_title
      font-weight bold
      color #2FA5BA
      margin-bottom 0
    &_buyNow:disabled
      pointer-events auto
      cursor no-drop

</style>
