import App from './App'
import { makeSvg } from './utils/svg-icons.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.config.devtools = false
Vue.prototype.$svgIcon = makeSvg
App.mpType = 'app'
const app = new Vue({ ...App })
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$svgIcon = makeSvg
  return { app }
}
// #endif
