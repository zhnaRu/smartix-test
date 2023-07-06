import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import _ from 'lodash'

Vue.config.productionTip = false

Vue.filter(
  'getNested',
  (value: unknown, path: string, defaultValue?: any) => _.get(value, path, defaultValue)
)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
