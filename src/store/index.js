import Vuex from 'vuex';
import Vue from 'vue';

import user from "./modules/user";
import products from "./modules/products";
import common from "./modules/common";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    products,
    common
  }
});

export default store
