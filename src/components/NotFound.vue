<template>
  <div class="notFound">
    <v-alert v-model="alert" :value="true" type="warning" class="headline" dismissible>
      Sorry, that page doesn't exist.
    </v-alert>
    <v-container grid-list-md class="text-xs-center">
      <v-avatar
        :tile="tile"
        :size="500"
        color="grey lighten-4"
        class="hidden-xs-only"
      >
        <img src="../assets/404.jpg" alt="notFound">
      </v-avatar>
      <img  class="notFound_img hidden-sm-and-up" src="../assets/404.jpg" alt="notFound">
      <br>
      <v-btn color="success" tag="a" :to="{name: 'home'}" class="headline mt-3">Back to Web site</v-btn>
    </v-container>

  </div>
</template>

<script>
export default {
  data (){
    return {
      alert: true
    }
  },
}
</script>

<style lang="stylus" scoped>
  @media screen and (max-width: 600px)
    .notFound_img
      width 400px
      border-radius 100%
</style>
