import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import './styles/index.css'
import './assets/font/iconfont.css'
import './assets/font2/iconfont.css'
// import './assets/font/iconfont2.css'
Vue.use(Vant)
Vue.prototype.$bus=new Vue()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
