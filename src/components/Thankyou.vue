<template>
  <div class="thankyou">
    <p class="headline text-xs-center mt-3">You will recieve an Email soon, Thank you !</p>
    <v-btn
      :to="{name: 'home'}"
      alt="Home"
      tag="a"
      color="success"
      class="mt-3 title thankyou_back">Back to Web site</v-btn>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>
