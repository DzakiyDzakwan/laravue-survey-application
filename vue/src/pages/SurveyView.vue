<template>
    <PageComponent :title="this.$route.name">
        <template v-slot:header>
            <h1>View Survey page</h1>
        </template>
    </PageComponent>
</template>

<script>
import PageComponent from "../components/PageComponent.vue";

export default {
    name: "Survey View",
    props: ["title"],
    components: { PageComponent },
    setup() {
        return {
            PageComponent,
        };
    },
};
</script>
