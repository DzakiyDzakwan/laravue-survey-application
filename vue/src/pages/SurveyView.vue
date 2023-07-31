<template>
    <PageComponent title="View or Create a Survey">
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold">
                    {{ empty_survey.id ? empty_survey.title : "Create Survey" }}
                </h2>
            </div>
        </template>

        <!-- <pre>
            {{ empty_survey }}
        </pre> -->

        <form @submit.prevent="saveSurvey">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!-- Survey Fields -->
                <div class="px-4 py-5 bg-gray-100 space-y-6 sm:p-6">
                    <!-- Image -->
                    <div>
                        <label
                            for="image"
                            class="block text-sm font-medium text-gray-700"
                            >Image</label
                        >
                        <div class="mt-1 flex items-center">
                            <img
                                v-if="empty_survey.image"
                                :src="empty_survey.image"
                                :alt="empty_survey.title"
                            />
                            <span
                                v-else
                                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                            >
                                <PhotoIcon
                                    class="block h-[80%] w-[80%] text-gray-300"
                                ></PhotoIcon>
                            </span>
                            <button
                                class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                type="button"
                            >
                                <input
                                    type="file"
                                    name=""
                                    id=""
                                    class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                                />
                                Change
                            </button>
                        </div>
                    </div>
                    <!--/ Image end -->

                    <!-- Title -->
                    <div>
                        <label
                            for="title"
                            class="block text-sm font-medium text-gray-700"
                            >Title</label
                        >
                        <input
                            type="text"
                            name="title"
                            id="title"
                            v-model="empty_survey.title"
                            autocomplete="survey_title"
                            class="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <!--/ Title End -->

                    <!-- Description -->
                    <div>
                        <label
                            for="description"
                            class="block text-sm font-medium text-gray-700"
                            >Description</label
                        >
                        <textarea
                            rows="3"
                            name="description"
                            id="description"
                            v-model="empty_survey.description"
                            autocomplete="survey_title"
                            class="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="describe your survey"
                        ></textarea>
                    </div>
                    <!--/ Description End -->

                    <!-- Expire Date -->
                    <div>
                        <label
                            for="expire_date"
                            class="block text-sm font-medium text-gray-700"
                            >Expire Date</label
                        >
                        <input
                            type="date"
                            name="expire_date"
                            id="expire_date"
                            v-model="empty_survey.expire_date"
                            autocomplete="survey_title"
                            class="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    <!--/ Expire Date End -->

                    <!-- Status -->
                    <div class="flex items-start">
                        <div clas="flex items-center h-5">
                            <input
                                id="status"
                                type="checkbox"
                                v-model="empty_survey.status"
                                class="h-4 w-4 focus:ring-purple-500 text-purple-600 block border-gray-300 rounded"
                            />
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="status">Active</label>
                        </div>
                    </div>
                    <!--/ Status End -->

                    <!-- Question Field -->
                    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <h3
                            class="text-2xl font-semibold flex items-center justify-between"
                        >
                            Question

                            <button
                                type="button"
                                @click="addQuestion"
                                v-if="!empty_survey.questions.length"
                                class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-4 h-4"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>

                                Add Question
                            </button>
                        </h3>

                        <div v-if="!empty_survey.questions.length">
                            <p>You dont have any questions</p>
                        </div>
                        <div
                            v-for="(question, index) in empty_survey.questions"
                            :key="question.id"
                        >
                            <QuestionEditor
                                :question="question"
                                :index="index"
                                @change="questionChange"
                                @addQuestion="addQuestion"
                                @deleteQuestion="deleteQuestion"
                            ></QuestionEditor>
                            <!-- {{ question.id }} -->
                        </div>
                    </div>
                    <!-- Question Field -->

                    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </PageComponent>
</template>

<script>
import { ref } from "vue";
import PageComponent from "../components/PageComponent.vue";
import QuestionEditor from "../components/QuestionEditor.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { PhotoIcon } from "@heroicons/vue/24/solid";

export default {
    name: "Survey View",
    props: ["title"],
    components: { PageComponent, QuestionEditor, PhotoIcon },
    setup() {
        const store = useStore();
        const route = useRoute();

        //empty survey
        const empty_survey = ref({
            title: "",
            status: false,
            description: null,
            image: null,
            expire_date: null,
            questions: [],
        });

        if (route.params.id) {
            /*   empty_survey.value = store.state.surveys.find((item) => {
                item.id === parseInt(route.params.id);
            });
            console.log(empty_survey.value); */

            store.state.surveys.find((item) => {
                if (item.id === parseInt(route.params.id)) {
                    empty_survey.value = item;
                }
            });
        }

        function questionChange() {
            //
        }

        function getQuestion() {
            return empty_survey.value.questions;
        }

        function setQuestion(question) {
            empty_survey.value.questions = question;
        }

        function addQuestion(index) {
            console.log(index);
        }

        function deleteQuestion(q) {
            setQuestion(getQuestion().filter((question) => question != q));
            // console.log(getQuestion().filter((question) => question != q));
        }

        return {
            PageComponent,
            empty_survey,
            questionChange,
            addQuestion,
            deleteQuestion,
        };
    },
};
</script>
