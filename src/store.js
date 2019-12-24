import Vue from "vue";
import axios from '../axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import Vuex from "vuex";

Vue.use(VueAxios,axios);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},

  getters:{},

  actions: {}
});
