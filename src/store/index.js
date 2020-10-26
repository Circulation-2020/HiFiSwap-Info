import Vue from 'vue'
import Vuex from 'vuex'
import sitecfg from '@/sitecfg.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    site_name: sitecfg.site_name,
    theme_color: sitecfg.theme_color,
    swap_app_url: sitecfg.swap_app_url,
    scan_view_url: sitecfg.scan_view_url,
  },
  mutations: {},
  actions: {},
  modules: {},
});
