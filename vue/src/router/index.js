import { createRouter, createWebHistory } from "vue-router";
import MasterLayout from "../components/layout/MasterLayout.vue";
import AuthLayout from "../components/layout/AuthLayout.vue";
import Dashboard from "../components/pages/Dashboard.vue";
import Survey from "../components/pages/Survey.vue";
import Login from "../components/pages/Login.vue";
import Register from "../components/pages/Register.vue";
import store from "../store";

const routes = [
    {
        path: "/",
        redirect: "/dashboard",
        meta: { requiresAuth: true },
        component: MasterLayout,
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                component: Dashboard,
            },
            {
                path: "/survey",
                name: "Survey",
                component: Survey,
            },
        ],
    },
    {
        path: "/auth ",
        redirect: "/login",
        name: "Auth",
        component: AuthLayout,
        meta: { isGuest: true },
        children: [
            {
                path: "/login",
                name: "Login",
                component: Login,
            },
            {
                path: "/register",
                name: "Register",
                component: Register,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    //Jika route yang dituju memerlukan autentikasi dan autentikasi tidak ada
    if (to.meta.requiresAuth && !store.state.user.token) {
        //redirect ke login page
        next({ name: "Login" });
        // Jika user sudah teruatentikasi mengakses route login dan register
    } else if (to.meta.isGuest && store.state.user.token) {
        next({ name: "Dashboard" });
    } else {
        next();
    }
});

export default router;
