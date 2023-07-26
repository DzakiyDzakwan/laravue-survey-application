<template>
    <header class="bg-white shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                {{ title }}
            </h1>
            <slot name="header"></slot>
        </div>
    </header>
    <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <slot> </slot>
        </div>
    </main>
</template>

<script>
// import { mapState } from "vuex";
// import store from "../../store";

export default {
    name: "Dashboard",
    components: {},
    props: {
        title: {
            type: String,
            default: "Title Here",
        },
    },
    setup() {
        return {};
    },
    /* computed: {
        ...mapState(["user"]),
    }, */
};
</script>
