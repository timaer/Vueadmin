import Vue from 'vue'
import App from './page/app'
import router from './router'
import store from './vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/icon/loadAll.js'
import './index.css'
import './responsive'
import filters from '@/utils/filter.js'
Object.keys(filters).forEach((key)=>{
  Vue.filter(key,filters[key])
})

Vue.config.productionTip = false
Vue.use(ElementUI);


import { post } from './api'
Vue.prototype.$post = post

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
