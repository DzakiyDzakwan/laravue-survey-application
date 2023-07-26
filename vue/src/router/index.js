import { createRouter, createWebHistory } from "vue-router";
import MasterLayout from "../layout/MasterLayout.vue";
import AuthLayout from "../layout/AuthLayout.vue";
import Dashboard from "../pages/Dashboard.vue";
import Survey from "../pages/Survey.vue";
import SurveyView from "../pages/SurveyView.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
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
            {
                path: "/survey/create",
                name: "Survey Create",
                component: SurveyView,
            },
            {
                path: "/survey/:id",
                name: "Survey View",
                component: SurveyView,
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
