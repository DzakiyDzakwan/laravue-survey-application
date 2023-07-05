import { createRouter, createWebHistory } from "vue-router";
import MasterLayout from "../components/MasterLayout.vue";
import Dashboard from "../components/pages/Dashboard.vue";
import Survey from "../components/pages/Survey.vue";
import Login from "../components/pages/Login.vue";
import Register from "../components/pages/Register.vue";

const routes = [
    {
        path: "/",
        redirect: "/dashboard",
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
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
