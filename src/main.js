import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueScratchable from 'vue-scratchable';

Vue.config.productionTip = false
Vue.component('vue-scratchable', VueScratchable);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
