import Vue from "vue";

import axios from '../axios'
import VueAxios from 'vue-axios'
import api from '../api.config'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from "./router";
import store from "./store";
import App from "./App.vue";

Vue.config.productionTip = false;


Vue.use(VueAxios,axios);

axios.defaults.baseURL=api.baseURL;

Vue.use(ElementUI);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
