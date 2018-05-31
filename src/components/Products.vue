<template>
  <v-container grid-list-lg>
      <Cards :products="products" />
           <p class="pages headline text-xs-center">{{currentPage+1 }} / {{ pages }}</p>
        <div class="pagination justify-center">
                <v-btn :disabled="prevUrl === ''" class="headline pagination_link" @click="checkPage(prevUrl)">Previous</v-btn>
                <v-btn :disabled="nextUrl === ''" class="headline pagination_link pagination_link__next" @click="checkPage(nextUrl)">Next</v-btn>
        </div>
  </v-container>
</template>

<script>
import Cards from './Cards'
import Api from '../../config/Api'
export default {
    components: {
        Cards
    },
    data () {
        return {
            products: [],
            currentPage: '',
            pages: '',
            prevUrl: '',
            nextUrl: ''
        }
    },
    created () {
        Api().get('/products')
            .then(response => {
                this.products = response.data.products;
                this.currentPage = response.data.currentPage;
                this.pages = response.data.pages;
                this.nextUrl = response.data.nextUrl;
                this.prevUrl = response.data.prevUrl;
            })
    },
  methods: {
    checkPage (url) {
      Api().get(url)
        .then(response => {
          this.products = response.data.products;
          this.currentPage = response.data.currentPage;
          this.pages = response.data.pages;
          this.nextUrl = response.data.nextUrl;
          this.prevUrl = response.data.prevUrl;
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .pages
    color #00695C
   .pagination
      width 100%
      &_link
        color #00695C
        width 170px
        &:disabled
          pointer-events auto
          cursor no-drop
          color #B2DFDB
</style>
