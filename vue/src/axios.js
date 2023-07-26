import axios from "axios";
import store from "./store";

const axiosClient = axios.create({
    credentials: true,
    baseURL: "http://localhost:8000/api",
});

//Mengambil token user
axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`;
    return config;
});

export default axiosClient;
