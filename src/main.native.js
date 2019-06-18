import Vue from 'nativescript-vue';
import router from './router.native';

import store from './store.native';


// Set the following to `true` to hide the logs created by nativescript-vue
Vue.config.silent = false;
// Set the following to `false` to not colorize the logs created by nativescript-vue
// disabled in template due to typing issue for Typescript projects....NEEDS TO BE FIXED
// Vue.config.debug = true;

Vue.prototype.$router = router
Vue.prototype.$goto = function (to, options) {
  this.$navigateTo(this.$router[to], options)
}

new Vue({
  store,
  render: h => h('frame', [h(router['login'])]),
}).$start();
