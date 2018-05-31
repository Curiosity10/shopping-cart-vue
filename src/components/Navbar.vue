<template>
  <div>
    <v-navigation-drawer app temporary v-model="sideNav">
    <v-list class="pt-3">
      <v-list-tile
        :to="link.url"
        v-for="link of links"
        :key="link.title"
        :alt="link.title"
      >
        <v-list-tile-action class="list_link">
          <v-icon right medium>{{link.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="title" v-text="link.title"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile
        @click="onLogout"
        v-if="isUserLoggedIn"
        alt="Logout"
      >
        <v-list-tile-action>
          <v-icon right medium>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="title">Logout</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="teal darken-3">
      <v-toolbar-side-icon alt="Menu" class="hidden-md-and-up" @click="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-btn alt="Home" class="headline" flat :to = "{name: 'home'}">
        <v-icon left>home</v-icon>
        Shopping Cart
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" v-for="link of links" :key="link.title">
        <v-btn :alt="link.title" dark class="title" flat :to = "link.url">
          <span>{{link.title}}</span>
          <v-icon v-if="link.title !== 'Cart'" right medium>{{link.icon}}</v-icon>
          <v-badge v-if="link.title === 'Cart'">
            <v-icon right medium>{{link.badge}}</v-icon>
            <span slot="badge">{{ cart.length }}</span>
          </v-badge>
        </v-btn>
        <v-btn
          @click="onLogout"
          flat
          v-if="isUserLoggedIn"
          dark
          class="title"
          alt="Logout"
        >
          Logout
          <v-icon medium right>exit_to_app</v-icon>
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
  methods: {
    onLogout () {
      this.$store.dispatch('logoutUser');
      this.$router.push('/');
    }
  },
  computed: {
    cart () {
      return this.$store.getters.getCart
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    links () {
      if (this.isUserLoggedIn) {
        return [
          {title: 'Cart', icon: 'shopping_cart', url: '/checkout', badge: 'shopping_cart'}
        ]
      }
      return [
        {title: 'Login', icon: 'account_box', url: '/login'},
        {title: 'Registration', icon: 'face', url: '/registration'}
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
