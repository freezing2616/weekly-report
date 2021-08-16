import Vue from 'vue'
import routes from './config/routes'

import Razor from '@sensetime/razor'
// 引入样式
import '@sensetime/razor/dist/lib/style/white/index.css'

Vue.use(Razor);

Vue.config.productionTip = false

new Vue({
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute]
    }
  },
  render (h) { return h(this.ViewComponent) }
}).$mount('#app')
