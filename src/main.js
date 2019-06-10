import Vue from 'vue';
import App from '@/App.vue';
import router from './router';
import store from './store';
window.$ = require('jquery')
window.JQuery = require('jquery')
import VueCookie from 'vue-cookie';
import VueTouchKeyboard from "vue-touch-keyboard";

Vue.config.productionTip = false;

Vue.use(VueCookie);
Vue.use(VueTouchKeyboard);

new Vue({
  router,
  store,
  VueCookie,
  VueTouchKeyboard,
  render: (h) => h(App)
}).$mount('#app');
