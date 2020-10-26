import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// plugins
import VueClipboard from "vue-clipboard2";
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

// filter
import filters from './filter/'
for (let key in filters){
  Vue.filter(key, filters[key])
}

// api
import api from './api/'
Vue.prototype.api = api

// util
import util from './util'
Vue.prototype.util = util

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
