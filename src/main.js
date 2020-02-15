import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//==============================================================================
// import firebase from "firebase/app";
// import "firebase/database";
//==============================================================================
// import "@fortawesome/fontawesome-free/js/all";
// import { library, dom } from "@fortawesome/fontawesome-svg-core";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { far } from "@fortawesome/free-regular-svg-icons";
// import { fab } from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// dom.watch();
// library.add(fas, far, fab);
// Vue.component("font-awesome-icon", FontAwesomeIcon);
//==============================================================================
import Buefy from "buefy";
Vue.use(Buefy, {
  // defaultIconComponent: FontAwesomeIcon,
  defaultIconPack: "fas"
});
//==============================================================================
// import VueTippy, { TippyComponent } from "vue-tippy";
// import "tippy.js/themes/light.css";
// import "tippy.js/themes/light-border.css";
// import "tippy.js/themes/google.css";
// import "tippy.js/themes/translucent.css";
// Vue.use(VueTippy);
// or
// Vue.use(VueTippy, {
//   directive: "tippy", // => v-tippy
//   flipDuration: 0,
//   popperOptions: {
//     modifiers: {
//       preventOverflow: {
//         enabled: false
//       }
//     }
//   }
// });
// Vue.component("tippy", TippyComponent);
//==============================================================================
Vue.config.productionTip = false;
Vue.config.devtools = false;
//==============================================================================
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
