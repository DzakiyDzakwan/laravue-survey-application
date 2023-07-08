import { createStore } from "vuex";

const store = createStore({
    //state merupakan data yang disimpan dan akan digunakan
    state: {
        user: {
            data: {},
            //Mengambil data token dari session
            token: sessionStorage.getItem("TOKEN"),
        },
        post: {
            title: "Ini adalah post state",
        },
    },
    getters: {},
    actions: {
        //Without Axioos and no Async Await
        /* register({ commit }, data) {
            return fetch(`http://localhost:8000/api/register`, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            })
                .then((res) => {
                    res.json();
                })
                .then((res) => {
                    commit("setUser", res);
                    return res;
                });
        }, */

        //Register Without Axioss with Async Await
        async register({ commit }, data) {
            try {
                const response = await fetch(
                    `http://localhost:8000/api/register`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify(data),
                    }
                );

                const res = await response.json();
                console.log(res);
                commit("setUser", res);
                return res;
            } catch (error) {
                // Handle any errors that occurred during the registration process
                console.error("Registration error:", error);
                throw error; // Rethrow the error to be handled by the caller
            }
        },

        //Register With Axioss

        //Login without Axioss
        async login({ commit }, data) {
            try {
                const response = await fetch(
                    `http://localhost:8000/api/login`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        method: "POST",
                        body: JSON.stringify(data),
                    }
                );

                const res = await response.json();
                console.log(res);
                commit("setUser", res);
                return res;
            } catch (error) {
                // Handle any errors that occurred during the registration process
                console.error("Registration error:", error);
                throw error; // Rethrow the error to be handled by the caller
            }
        },
    },
    //mutations adalah method yang digunakan untuk melakukan Perubahan terhadap state
    mutations: {
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem("TOKEN");
        },
        setUser: (state, data) => {
            //data = hasil return api
            /* state.user.data = data.user; */
            state.user.token = data.token;
            //Mendaftarkan token ke session
            sessionStorage.setItem("TOKEN", data.token);
        },
    },
    modules: {},
});

export default store;
