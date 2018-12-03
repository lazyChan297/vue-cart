import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import store from './store'
import './common/stylus/index.styl'

Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('./common/images/loading.jpg')
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
