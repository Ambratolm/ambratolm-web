import Vue from "vue";
import Vuex from "vuex";

import websites from "./modules/websites";
import profiles from "./modules/profiles";
import contactLinks from "./modules/contact-links";
import categories from "./modules/categories";
import creations from "./modules/creations";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    websites,
    profiles,
    contactLinks,
    categories,
    creations
  }
  // state: {},
  // getters: {},
  // mutations: {},
  // actions: {}
});
