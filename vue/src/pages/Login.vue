<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
            class="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
        />
        <h2
            class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
            Login for full access
        </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div
            v-if="errorMessage"
            class="flex items-center justify-between rounded-sm bg-red-500 px-2 py-2 my-4 text-center text-white font-medium text-sm"
        >
            {{ errorMessage }}
            <XMarkIcon
                @click="errorMessage = ''"
                class="block h-8 w-8 p-1 cursor-pointer rounded-full transition-colors hover:bg-[rgba(0,0,0,0.2)]"
                aria-hidden="true"
            />
        </div>
        <form class="space-y-6" @submit.prevent="login">
            <div>
                <label
                    for="email"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Email address</label
                >
                <div class="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required=""
                        v-model="credential.email"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label
                        for="password"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Password</label
                    >
                    <EyeIcon
                        class="block h-6 w-6 cursor-pointer"
                        aria-hidden="true"
                    />
                </div>
                <div class="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required=""
                        v-model="credential.password"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Log in
                </button>
            </div>
        </form>

        <p class="mt-6 text-center text-sm text-gray-500">
            doesnt have account to log in ? Register
            <router-link
                class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                :to="{ name: 'Register' }"
                >here</router-link
            >
        </p>
    </div>
</template>

<script>
import { ref } from "vue";
/* import store from "../store"; */

import { useRouter } from "vue-router";
import { EyeIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useStore } from "vuex";

export default {
    name: "Login",
    components: { EyeIcon, XMarkIcon },
    setup() {
        const store = useStore();
        const credential = ref({
            email: "",
            password: "",
        });

        const errorMessage = ref("");

        const router = useRouter();

        async function login() {
            /* store
                .dispatch("login", credential.value)
                .then(() => {
                    console.log("berhasil");
                    router.push({ name: "Dashboard" });
                })
                .catch((e) => {
                    console.log(e);
                    errorMessage.value = e.response.data.error;
                }); */

            try {
                await store.dispatch("login", credential.value);
                console.log("berhasil");
                router.push({ name: "Dashboard" });
            } catch (e) {
                console.log(e);
                errorMessage.value = e.response.data.error;
            }
        }
        return {
            credential,
            errorMessage,
            login,
        };
    },
};
</script>
