<template>
    <PageComponent :title="this.$route.name">
        <h1 class="text-xl font-semibold">Content Here</h1>
    </PageComponent>
</template>

<script>
import PageComponent from "../components/PageComponent.vue";
export default {
    name: "Dashboard",
    components: {
        PageComponent,
    },
    setup() {
        return {};
    },
};
</script>
