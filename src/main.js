import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as fb from 'firebase/app'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
require('firebase/auth')
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import App from './App.vue'
import router from './router'
import store from './store/index'

Vue.config.productionTip = true
Vue.use(Vuetify)
Vue.use(VueRouter)

new Vue({
  store,
  router,
  created () {
    OfflinePluginRuntime.install({
      onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
      onUpdated: () => window.swUpdate = true,
    })
    fb.initializeApp({
      apiKey: 'AIzaSyC1XVw8-SymhR3kK3EanygHNeijXgjS9kE',
      authDomain: 'course-vue.firebaseapp.com',
      databaseURL: 'https://course-vue.firebaseio.com',
      projectId: 'course-vue',
      storageBucket: 'course-vue.appspot.com',
      messagingSenderId: '1012528004285'
    })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
