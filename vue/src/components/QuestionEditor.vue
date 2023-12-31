<template>
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium">
            {{ index + 1 }}. {{ question_model.question }}
        </h3>

        <div class="flex items-center justify-between">
            <!-- Add new Question -->
            <button
                type="button"
                @click="$emit('addQuestion', index + 1)"
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
                Add
            </button>

            <!-- Delete Question -->
            <button
                type="button"
                @click="$emit('deleteQuestion', question)"
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
                Delete
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
        <div class="mt-3 col-span-3">
            <label
                for="question-type"
                class="block text-sm font-medium text-gray-700"
                >Select Question Type</label
            >
            <select
                id="question-type"
                name="question-type"
                v-model="question_model.type"
                @change="typeChange"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option v-for="tipe in questionTypes" :key="tipe" :value="tipe">
                    {{ upperCaseFirst(tipe) }}
                </option>
            </select>
        </div>
    </div>

    <!-- Question Description-->
    <div class="mt-3 col-span-9">
        <label
            :for="`question_description_${question_model.id}`"
            class="block text-sm font-medium text-gray-700"
            >Description</label
        >
        <textarea
            :name="`question_description_${question_model.id}`"
            :id="`question_description_${question_model.id}`"
            v-model="question_model.description"
            @change="dataChange"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            rows=""
            cols=""
        ></textarea>
    </div>

    <!-- Data -->
    <div>
        <div v-if="shouldHaveOptions()" class="mt-2">
            <h4
                class="text-sm font-semibold mb-1 flex justify-between items-center"
            >
                Options
                <button
                    type="button"
                    @click="addOption"
                    class="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
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
                    Add Option
                </button>
            </h4>

            <div
                v-if="!question_model.data.options.length"
                class="text-xs text-gray-600 text-center py-3"
            >
                You don't have any options
            </div>

            <!-- Option List -->
            <div
                v-for="(option, index) in question_model.data.options"
                :key="option.uuid"
                class="flex items-center mb-1"
            >
                <span class="w-6 text-sm"> {{ index + 1 }}.</span>
                <input
                    type="text"
                    v-model="option.text"
                    @change="dataChange"
                    class="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500"
                />
                <button
                    type="button"
                    @click="removeOption(option)"
                    class="h-6 w-6 rounded-full flex items-center justify-center border border-transparent transition-colors hover:border-red-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-3 h-3 text-red-500"
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
    </div>

    <hr class="my-8" />
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

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
    setup(props, { emit }) {
        const store = useStore();
        //Re-create the whole question data to avoid unintentional reference change
        const question_model = ref(JSON.parse(JSON.stringify(props.question)));

        function dataChange() {
            const data = JSON.parse(JSON.stringify(question_model.value));
            if (!shouldHaveOptions()) {
                delete data.data.options;
            }

            emit("change", data);
        }

        function getOptions() {
            return question_model.value.data.options;
        }

        function setOptions(options) {
            question_model.value.data.options = options;
        }

        function typeChange() {
            if (shouldHaveOptions()) {
                setOptions(getOptions() || []);
            }
            dataChange();
        }

        function upperCaseFirst(str) {
            const upperWord = str[0].toUpperCase() + str.substring(1);
            return upperWord;
        }

        function shouldHaveOptions() {
            return ["select", "radio", "checkbox"].includes(
                question_model.value.type
            );
        }

        function addOption() {
            setOptions([...getOptions(), { uuid: uuidv4(), text: "" }]);
            dataChange();
        }

        function removeOption(op) {
            setOptions(getOptions().filter((option) => option != op));
            dataChange();
        }

        return {
            question_model,
            questionTypes: computed(() => store.state.questionTypes),
            typeChange,
            upperCaseFirst,
            shouldHaveOptions,
            addOption,
            removeOption,
        };
    },
};
</script>

<style lang="scss" scoped></style>
