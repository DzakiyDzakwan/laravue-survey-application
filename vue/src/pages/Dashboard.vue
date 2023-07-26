<template>
    <PageComponent :title="this.$route.name">
        <h1 class="text-2xl font-semibold">Content Here</h1>
    </PageComponent>
</template>

<!-- Option Api -->
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
