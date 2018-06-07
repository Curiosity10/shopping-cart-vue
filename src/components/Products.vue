<template>
  <v-container grid-list-sm>
    <v-carousel
      delimiter-icon="stop"
      prev-icon="mdi-arrow-left"
      next-icon="mdi-arrow-right"
      class="mb-4"
    >
      <v-carousel-item
        v-for="(item,i) in items"
        :src="item.src"
        :key="i"/>
    </v-carousel>
    <v-layout
      row
      wrap>
      <v-flex lg2>
        <form>
          <v-radio-group
            v-model="radioGroup"
            name="Vendors">
            <v-radio
              v-for="ven in vendor"
              :key="ven._id"
              :label="`${ven.vendor.charAt(0).toUpperCase() + ven.vendor.substr(1)}`"
              :value="ven.vendor"
            />
          </v-radio-group>
          <v-btn
            @click="submit"
          >
            submit
          </v-btn>
        </form>
      </v-flex>
      <v-flex lg10>
        <v-flex
          xs12
          sm6
          class="mb-4 sort">
          <p class="mb-2 mr-2 title">Sort by price:</p>
          <v-btn-toggle v-model="toggle_exclusive">
            <v-btn
              flat
              @click="sortByPrice('/products/price?price=1')">
              <v-icon>arrow_upward</v-icon>
            </v-btn>
            <v-btn
              flat
              @click="sortByPrice('/products/price?price=-1')">
              <v-icon>arrow_downward</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-flex>
        <Cards :products="products" />
      </v-flex>
      <v-flex lg12>
        <p class="pages headline text-xs-center">{{ currentPage+1 }} / {{ pages }}</p>
        <div class="pagination justify-center">
          <v-btn
            :disabled="prevUrl === ''"
            class="headline pagination_link"
            @click="sortByPrice(prevUrl) ">Previous</v-btn>
          <v-btn
            :disabled="nextUrl === ''"
            class="headline pagination_link pagination_link__next"
            @click="sortByPrice(nextUrl) ">Next</v-btn>
        </div>
      </v-flex>

    </v-layout>
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
      radioGroup: 1,
      color: [],
      material: [],
      vendor: [],
      currentPage: '',
      pages: '',
      prevUrl: '',
      nextUrl: '',
      items: [
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/course-vue.appspot.com/o/slider%2Fphone-1-min.jpg?alt=media&token=26ae8d09-e049-4500-9eec-c09bd777c863'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/course-vue.appspot.com/o/slider%2Fphone-2-min.jpg?alt=media&token=0c3fe6e2-6c02-4732-b8dd-c67fcba327af'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/course-vue.appspot.com/o/slider%2Fphone-3-min.jpg?alt=media&token=ffa8de84-966d-45f0-851f-a6778292963e'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/course-vue.appspot.com/o/slider%2Fphone-4-min.jpg?alt=media&token=325cc761-6776-4682-8fde-3f875c4ce8b4'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/course-vue.appspot.com/o/slider%2Fphone-5-min.jpg?alt=media&token=f22f04ee-9c4b-449e-9a8a-86833d8a5335'
        }
      ]
    }
  },
  created () {
    Api().get('/color')
      .then(response => {
        this.color = response.data
      })
    Api().get('/material')
      .then(response => {
        this.material = response.data
      })
    Api().get('/vendor')
      .then(response => {
        this.vendor = response.data
      })
    Api().get('/products')
      .then(response => {
        this.products = response.data.products
        this.currentPage = response.data.currentPage
        this.pages = response.data.pages
        this.nextUrl = response.data.nextUrl
        this.prevUrl = response.data.prevUrl
      })
  },
  methods: {
    checkPage (url) {
      Api().get(url)
        .then(response => {
          this.products = response.data.products
          this.currentPage = response.data.currentPage
          this.pages = response.data.pages
          this.nextUrl = response.data.nextUrl
          this.prevUrl = response.data.prevUrl
        })
    },
    sortByPrice (price) {
      Api().get(price)
        .then(response => {
          this.products = response.data.products
          this.currentPage = response.data.currentPage
          this.pages = response.data.pages
          this.nextUrl = response.data.nextUrl
          this.prevUrl = response.data.prevUrl
        })
    },
    submit () {
      // eslint-disable-next-line no-console
      console.log('hello')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .sort
    display flex
    margin-left auto
    justify-content flex-end
    align-items center
  .pages
    color #2087C4
   .pagination
      width 100%
      margin-bottom 80px
      &_link
        color #2087C4
        width 150px
        &:disabled
          pointer-events auto
          cursor no-drop
          color #2087C4
  @media screen and (max-width: 420px)
    .pagination
      margin-bottom 120px
</style>
