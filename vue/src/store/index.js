import { createStore } from "vuex";
import axiosClient from "../axios";
import axios from "axios";

const store = createStore({
    //state merupakan data yang disimpan dan akan digunakan
    state: {
        user: {
            data: {},
            //Mengambil token dari session
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
        //Without Axioss with Async Await
        /* async register({ commit }, data) {
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
        }, */
        /* async login({ commit }, data) {
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
        }, */
        //Axioss with Try and Catch
        /* async register({ commit }, data) {
            try {
                const response = await axiosClient.post("/reigster", data);
                commit("setUser", response);
                return response.data;
            } catch (error) {
                console.error("Registration error:", error);
            }
        },

        async login({ commit }, data) {
            try {
                const response = await axiosClient.post("/login", data);
                commit("setUser", response.data);
                return response.data;
            } catch (error) {
                console.error("Authentication error:", error);
            }
        }, */
        //Axioss Without Try and Catch
        register({ commit }, data) {
            /* await axios.get("http://localhost:8000/sanctum/csrf-cookie"); */

            return axiosClient.post("/register", data).then((response) => {
                commit("setUser", response.data);
                return response.data;
            });
        },
        login({ commit }, data) {
            // axios.get("http://localhost:8000/sanctum/csrf-cookie");

            return axiosClient.post("/login", data).then((response) => {
                commit("setUser", response.data);
                return response.data;
            });
        },
        logout({ commit, state }) {
            return axiosClient
                .post("/logout", {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            "TOKEN"
                        )}`,
                    },
                })
                .then((response) => {
                    commit("logout");
                    return response;
                });
        },
    },
    //mutations adalah method yang digunakan untuk melakukan Perubahan terhadap state
    mutations: {
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            //Menghapus token dari session
            sessionStorage.removeItem("TOKEN");
        },
        setUser: (state, data) => {
            //data = hasil return api
            state.user.data = data.user;
            state.user.token = data.token;
            //Mendaftarkan token ke session
            sessionStorage.setItem("TOKEN", data.token);
        },
    },
    modules: {},
});

export default store;
