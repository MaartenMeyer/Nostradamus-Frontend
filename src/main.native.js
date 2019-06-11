import Vue from 'nativescript-vue';
import router from './router.native';

import Login from '@/views/Login.native.vue';
import store from './store';


// Set the following to `true` to hide the logs created by nativescript-vue
Vue.config.silent = false;
// Set the following to `false` to not colorize the logs created by nativescript-vue
// disabled in template due to typing issue for Typescript projects....NEEDS TO BE FIXED
// Vue.config.debug = true;

new Vue({
  router,
  store,
  render: h => h('frame', [h(Login)]),
}).$start();
