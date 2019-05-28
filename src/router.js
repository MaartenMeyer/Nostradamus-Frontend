import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Register from '@/views/Register.vue';

Vue.use(Router);

const router = new Router ({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: "Default",
      redirect: '/login'
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
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
});

export default router;
