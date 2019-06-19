import Vue from 'nativescript-vue';
import router from './router.native';
//import localStorage from 'nativescript-localstorage';
import store from './store.native';
const localStorage = require('nativescript-localstorage');

// Set the following to `true` to hide the logs created by nativescript-vue
Vue.config.silent = false;
// Set the following to `false` to not colorize the logs created by nativescript-vue
// disabled in template due to typing issue for Typescript projects....NEEDS TO BE FIXED
// Vue.config.debug = true;

Vue.use(localStorage);
Vue.prototype.$router = router
Vue.prototype.$goto = function (to, options) {
  this.$navigateTo(this.$router[to], options)
}

new Vue({
  store,
  localStorage,
  render: h => h('frame', [h(router['login'])]),
}).$start();
