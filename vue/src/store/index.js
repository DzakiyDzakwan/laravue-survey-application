import { createStore } from "vuex";

const store = createStore({
    state: {
        user: {
            data: { name: "Azaelf" },
            token: null,
        },
        post: {
            title: "Ini adalah post state",
        },
    },
    getters: {},
    actions: {},
    mutations: {},
    modules: {},
});

export default store;
