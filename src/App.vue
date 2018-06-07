<template>
  <v-app class="white">
    <Navbar/>
    <v-content>
      <router-view/>
      <v-footer
        absolute
        height="80px"
        class="light-blue darken-4 footer">
        <v-layout
          row
          wrap
          fill-height
        >
          <v-flex
            class="d-flex"
            justify-space-around>
            <v-btn
              href="https://vk.com/mr.respekton"
              color="white"
              target="_blank"
              flat
              class="mb-0"
            >
              VK <v-icon>fab fa-vk</v-icon>
            </v-btn>
            <v-btn
              href="https://github.com/Curiosity10"
              color="white"
              target="_blank"
              flat
              class="mb-0"
            >
              Github
            </v-btn>
            <v-btn
              href="https://www.facebook.com/profile.php?id=100004164407398"
              color="white"
              target="_blank"
              flat
              class="mb-0"
            >
              Facebook
            </v-btn>
          </v-flex>
          <v-flex
            xs12
            text-xs-center
            white--text>
            &copy; 2018 — <strong>Dmitrij Alexandrovsky</strong>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
    <template v-if="error">
      <v-snackbar
        :timeout="5000"
        :multi-line="true"
        :value="true"
        color="error"
        @input="closeError"
      >
        {{ error }}
        <v-btn
          flat
          dark
          @click.native="closeError">Close</v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Products from './components/Products.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Products
  },
  data () {
    return {
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .footer
      height 80px
  @media screen and (max-width: 420px)
    .footer
      height 80px !important
</style>
