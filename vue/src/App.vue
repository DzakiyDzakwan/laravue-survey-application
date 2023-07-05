<template>
    <router-view></router-view>
</template>

<script>
import { ref } from "vue";
import { mapState } from "vuex";

export default {
    setup() {
        /* const routes = ref([
            {
                path: "/",
                name: "Dashboard",
            },
            {
                path: "/register",
                name: "Register",
            },
            {
                path: "/login",
                name: "Login",
            },
        ]); */
        return {
            // routes,
        };
    },
    computed: {
        ...mapState(["user", "post"]),
    },
};
</script>

<style scoped></style>
