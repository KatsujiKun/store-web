import Vue from 'vue'
import App from './pages'
import store from './store'
import router from './router'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(elementUi)

new Vue({
  store,
  router,
  render: createElement => createElement(App)
}).$mount('#app')
