<template>
    <PageComponent :title="this.$route.name">
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">Sub Content Here</h2>
                <div
                    class="flex items-center justify-between bg-green-600 text-white py-2 px-4"
                >
                    <router-link :to="{ name: 'Survey Create' }"
                        >Create Survey
                    </router-link>
                    <PlusIcon class="block h-6 w-6 ms-1"></PlusIcon>
                </div>
            </div>
        </template>
        <h1 class="text-2xl font-semibold">Content here Here</h1>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            <div
                v-for="(survey, index) in surveys"
                :key="survey.id"
                class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-grey-50 h-[470px]"
            >
                <img src="" alt="" class="w-full h-48 object-cover" />
                <h4 class="mt-4 text-lg font-bold">{{ survey.title }}</h4>
                <div
                    v-html="survey.description"
                    class="overflow-hidden flex-1"
                ></div>

                <div class="flex justify-between items-center mt-3">
                    <router-link
                        :to="{ name: 'Survey View', params: { id: survey.id } }"
                        class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >Edit</router-link
                    >
                </div>
            </div>
        </div>
    </PageComponent>
</template>

<script>
import PageComponent from "../components/PageComponent.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
    name: "Dashboard",
    components: {
        PageComponent,
        PlusIcon,
    },
    setup() {
        const store = useStore();
        return {
            PageComponent,
            surveys: computed(() => store.state.surveys),
        };
    },
};
</script>
