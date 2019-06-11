import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/Login.native.vue';
import Dashboard from './views/Dashboard.native.vue';
import Clock from './views/Clock.native.vue';
import Break from './views/Break.native.vue';
import Register from './views/Register.native.vue';

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
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
});

export default router;

