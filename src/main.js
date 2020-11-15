import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import md5 from 'js-md5';
import store from './store'
// 3、写到vue原型上
Vue.prototype.$md5 = md5
Vue.config.productionTip = false
Vue.use(Element)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
