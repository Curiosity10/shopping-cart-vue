<template>
  <div class="thankyou">
    <p class="headline text-xs-center mt-3">You will recieve an Email soon, Thank you !</p>
    <v-carousel dark hide-controls hide-delimiters>
      <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i"></v-carousel-item>
    </v-carousel>
    <v-btn alt="Home" tag="a" :to="{name: 'home'}" color="success" class="mt-3 title thankyou_back">Back to Web site</v-btn>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/course-vue.appspot.com/o/images%2Fbg-min.jpg?alt=media&token=bc0abd9a-24bf-4d0f-a141-3a3e60b1b5b3'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/course-vue.appspot.com/o/images%2Fbg3-min.jpg?alt=media&token=f1625c9f-13e7-4bb0-90be-bd008665cad2'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/course-vue.appspot.com/o/images%2Fbg4-min.jpg?alt=media&token=efbd8e22-7cec-454f-bda2-6929a92507d9'
        },
        {
          src: 'https://firebasestorage.googleapis.com/v0/b/course-vue.appspot.com/o/images%2Fbg5-min.jpg?alt=media&token=ef3eda98-2206-4964-b53f-c0a8958015ce'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
