import { createStore } from "vuex";
import axiosClient from "../axios";

const exampleSurveys = [
    {
        id: 1,
        title: "Survey Number 1",
        slug: "survey-number-1",
        status: "draft",
        image: "",
        description:
            "Heloo its the first survey called <b>Survey Number 1</b>. This is the first example of surveys.",
        created_at: "2023-07-26 15:30:00",
        updated_at: "2023-07-26 15:30:00",
        expired_at: "2023-08-02 15:30:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "What's this called ?",
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa cum autem cupiditate itaque adipisci mollitia alias vero voluptatem soluta iure, minus odit qui omnis commodi! Tenetur impedit omnis praesentium unde!",
                data: {
                    options: [
                        {
                            uuid: "99369fd9-568a-4d42-933d-876ceb39401b",
                            text: "Car",
                        },
                        {
                            uuid: "99369fd9-568a-4d42-933d-876ceb39401c",
                            text: "Plane",
                        },
                    ],
                },
            },
            {
                id: 2,
                type: "checkbox",
                question: "What's is the A.K.A stands for ?",
                description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa cum autem cupiditate itaque adipisci mollitia alias vero voluptatem soluta iure, minus odit qui omnis commodi! Tenetur impedit omnis praesentium unde!",
                data: {
                    options: [
                        {
                            uuid: "99369fd9-568a-4d42-933d-876ceb39401d",
                            text: "Also known As",
                        },
                        {
                            uuid: "99369fd9-568a-4d42-933d-876ceb39402a",
                            text: "A kill Apes",
                        },
                    ],
                },
            },
            {
                id: 3,
                type: "text",
                question: "Who am I ?",
                description: "",
                data: {
                    options: [],
                },
            },
        ],
    },
    {
        id: 2,
        title: "Survey Number 2",
        slug: "survey-number-2",
        status: "draft",
        image: "",
        description:
            "Heloo its the first survey called <b>Survey Number 2</b>. This is the first example of surveys.",
        created_at: "2023-07-26 15:30:00",
        updated_at: "2023-07-26 15:30:00",
        expired_at: "2023-08-02 15:30:00",
        questions: [
            {
                id: 1,
                type: "select",
                question: "What's this called ?",
                description: "",
                data: {
                    options: [
                        {
                            uuid: "99369fd9-568a-4d42-933d-876ceb39401b",
                            text: "Car",
                        },
                        {
                            uuid: "99369fd9-568a-4d42-933d-876ceb39401c",
                            text: "Plane",
                        },
                    ],
                },
            },
            {
                id: 2,
                type: "checkbox",
                question: "What's is the A.K.A stands for ?",
                description: "",
                data: {
                    options: [
                        {
                            uuid: "99369fd9-568a-4d42-933d-876ceb39401d",
                            text: "Also known As",
                        },
                        {
                            uuid: "99369fd9-568a-4d42-933d-876ceb39402a",
                            text: "A kill Apes",
                        },
                    ],
                },
            },
            {
                id: 3,
                type: "text",
                question: "Who am I ?",
                description: "",
                data: {
                    options: [],
                },
            },
        ],
    },
    {
        id: 3,
        title: "Survey Number 3",
        slug: "survey-number-3",
        status: "draft",
        image: "",
        description:
            "Heloo its the first survey called <b>Survey Number 3</b>. This is the first example of surveys.",
        created_at: "2023-07-26 15:30:00",
        updated_at: "2023-07-26 15:30:00",
        expired_at: "2023-08-02 15:30:00",
        questions: [],
    },
];

const questionTypes = ["checkbox", "select", "text", "radio"];

const store = createStore({
    //state merupakan data yang disimpan dan akan digunakan
    state: {
        user: {
            data: {},
            //Mengambil token dari session
            token: sessionStorage.getItem("TOKEN"),
        },
        surveys: [...exampleSurveys],
        questionTypes: questionTypes,
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
        deleteSurvey({}, id) {
            console.log(id);
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
