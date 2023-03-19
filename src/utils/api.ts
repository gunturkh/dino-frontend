import axios from "axios";
const URL = "https://beta-api.jurassicegg.co/";
const token = localStorage.getItem("token")
export const axiosInstance = axios.create({
    baseURL: URL,
    timeout: 1000,
    headers: { 'my-auth-key': token ? `${token}` : null }
});