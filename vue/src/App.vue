<template>
    <router-view></router-view>
</template>

<script>
import { ref } from "vue";
import { mapState } from "vuex";

export default {
    setup() {
        return {};
    },
    computed: {
        ...mapState(["user"]),
    },
};
</script>

<style scoped></style>
