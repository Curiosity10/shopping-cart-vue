<template>
  <v-app class="teal lighten-5">
    <Navbar/>
    <v-content>
      <router-view/>
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
</style>
