import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/views/Login.native.vue';
import Dashboard from '@/views/Dashboard.native.vue';
import Register from '@/views/Register.native.vue';

Vue.use(Router);

export const options = ({
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

export default new Router(options)
