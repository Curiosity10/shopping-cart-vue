import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as fb from 'firebase'
import 'babel-polyfill'
import App from './App.vue'
import router from './router'
import store from './store/index'


Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueRouter);



new Vue({
  store,
  router,
  created() {
    fb.initializeApp({
          apiKey: "AIzaSyC1XVw8-SymhR3kK3EanygHNeijXgjS9kE",
          authDomain: "course-vue.firebaseapp.com",
          databaseURL: "https://course-vue.firebaseio.com",
          projectId: "course-vue",
          storageBucket: "course-vue.appspot.com",
          messagingSenderId: "1012528004285"
        });
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
      },
  render: h => h(App),
}).$mount('#app');
