import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false


// element引入
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(element)


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
