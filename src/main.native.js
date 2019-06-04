import Vue from 'nativescript-vue';
import Navigator from 'nativescript-vue-navigator'

import Login from '@/views/Login.native.vue';


// Set the following to `true` to hide the logs created by nativescript-vue
Vue.config.silent = false;
// Set the following to `false` to not colorize the logs created by nativescript-vue
// disabled in template due to typing issue for Typescript projects....NEEDS TO BE FIXED
// Vue.config.debug = true;

new Vue({
  //store,
  render: h => h('frame', [h(Login)]),
}).$start();
