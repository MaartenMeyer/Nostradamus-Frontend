import Vue from 'vue';
import Router from 'vue-router';

import App from '~/App.vue';
import Dashboard from '~/views/Dashboard.vue';

Vue.use(Router);

export const options = {
  routes: [
    {
      path: '/',
      name: 'Login',
      component: App
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
};
export default new Router(options);
