import Vue from "vue"
import Router from "vue-router"
import Login from "../components/web/Login.vue"
import Dashboard from "../components/web/Dashboard.vue"

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Login",
            component: Login
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard
        }
    ]
})
