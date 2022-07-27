import Vue from 'vue'
import routes from './config/routes'

import Bmob from "hydrogen-js-sdk"

import Sensed from '@sensetime/sensed-vue';
// 引入样式
import '@sensetime/sensed-vue/dist/lib/style/white/index.css';

if (process.env.NODE_ENV === 'development') {
  Bmob.initialize('86538450add29ed6', '40F024') // 测试环境
} else {
  Bmob.initialize('e48734be9552512a', '40F024') // 生产环境
}




Vue.prototype.Bmob = Bmob

Vue.use(Sensed)

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
