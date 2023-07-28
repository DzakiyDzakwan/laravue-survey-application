<template>
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium">
            {{ index + 1 }}. {{ question_model.question }}
        </h3>

        <div class="flex items-center justify-between">
            <!-- Add new Question -->
            <button
                type="button"
                @click="addQuestion"
                class="flex items-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
                Add
            </button>

            <!-- Delete Question -->
            <button
                type="button"
                @click="deleteQuestion"
                class="flex items-center text-xs py-1 px-3 rounded border border-transparent text-red-500 hover:border-red-500"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
            </button>
        </div>
    </div>

    <!-- Question Index -->
    <div class="grid gap-3 grid-cols-12">
        <!-- Question -->
        <div class="mt-3 col-span-9">
            <label
                :for="'question_text' + question_model.data"
                class="block text-sm font-medium text-gray-700"
            >
                Question Text
            </label>
            <input
                type="text"
                :name="'question_text' + question_model.data"
                :id="'question_text' + question_model.data"
                v-model="question_model.question"
                @change="dataChange"
                class="mt-1 focus:ring-purple-500 focus:border-purple-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
        </div>
        <!-- Question Type -->
    </div>
    <!-- Question Description-->
</template>

<script>
import { ref } from "vue";

/* Composition API */
/* const props = defineProps({"props1", "props2"}) 
const emit = defineEmits(["function1", "function2", "function3"]) */

/* Option API */
export default {
    props: {
        question: Object,
        index: Number,
    },
    emits: ["change", "addQuestion", "deleteQuestion"],
    components: {},
    setup(props) {
        //Re-create the whole question data to avoid unintentional reference change
        const question_model = ref(JSON.parse(JSON.stringify(props.question)));
        return {
            question_model,
        };
    },
};
</script>

<style lang="scss" scoped></style>
