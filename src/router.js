import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/Login.vue';
import Dashboard from '~/views/Dashboard.vue';

Vue.use(Router);

export const options = {
  routes: [
    {
      path: '/',
      redirect: {
        name: "Login"
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
};
export default new Router(options);
