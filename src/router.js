import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import Clock from '@/views/Clock.vue';
import Break from '@/views/Break.vue';
import Overview from '@/views/Overview.vue';
import Register from '@/views/Register.vue';
import Logout from '@/views/Logout.vue'

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
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/clock',
      name: 'Clock',
      component: Clock
    },
    {
      path: '/break',
      name: 'Break',
      component: Break
    },
    {
      path: '/overview',
      name: 'Overview',
      component: Overview
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
