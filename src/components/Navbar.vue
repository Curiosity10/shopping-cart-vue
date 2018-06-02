<template>
  <div>
    <v-navigation-drawer
      v-model="sideNav"
      app
      temporary>
      <v-list class="pt-3">
        <v-list-tile
          v-for="link of links"
          :to="link.url"
          :key="link.title"
          :alt="link.title"
          :loading="loading"
        >
          <v-list-tile-action class="list_link">
            <v-icon
              right
              medium>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title
              class="title"
              v-text="link.title"/>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="isUserLoggedIn"
          :loading="loading"
          alt="Logout"
          @click="onLogout"
        >
          <v-list-tile-action>
            <v-icon
              right
              medium>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="title">Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      class="blue darken-2">
      <v-toolbar-side-icon
        name="Menu"
        dark
        class="hidden-md-and-up"
        @click="sideNav = !sideNav"/>
      <v-btn
        :to = "{name: 'home'}"
        alt="Home"
        dark
        class="headline"
        flat>
        <v-icon left>home</v-icon>
        Shopping Cart
      </v-btn>
      <v-spacer/>
      <v-toolbar-items
        v-for="link of links"
        :key="link.title"
        class="hidden-sm-and-down">
        <v-btn
          :alt="link.title"
          :to = "link.url"
          :loading="loading"
          class="title"
          dark
          flat>
          <span>{{ link.title }}</span>
          <v-icon
            v-if="link.title !== 'Cart'"
            right
            medium>{{ link.icon }}</v-icon>
          <v-badge
            v-if="link.title === 'Cart'"
            color="white">
            <v-icon
              right
              medium>{{ link.badge }}</v-icon>
            <span
              slot="badge"
              class="badge_text">{{ cart.length }}</span>
          </v-badge>
        </v-btn>
        <v-btn
          v-if="isUserLoggedIn"
          :loading="loading"
          flat
          class="title"
          alt="Logout"
          dark
          @click="onLogout"
        >
          Logout
          <v-icon
            medium
            right>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      items: {}
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    cart () {
      return this.$store.getters.getCart
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          { title: 'Cart', icon: 'shopping_cart', url: '/checkout', badge: 'shopping_cart' }
        ]
      }
      return [
        { title: 'Login', icon: 'account_box', url: '/login' },
        { title: 'Registration', icon: 'face', url: '/registration' }
      ]
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .badge_text
    color #2087C4
</style>
