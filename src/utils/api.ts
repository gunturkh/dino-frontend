import axios from "axios";
import { useAuthStore, useStore } from "./store";
import { API_ENDPOINT } from "./config";
// const URL = "https://beta-api.jurassicegg.co/";
const {token} = useAuthStore.getState()
console.log('token on api', token)
console.log('store state api', useStore.getState())
console.log('auth state api', useAuthStore.getState())
export const axiosInstance = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 10000,
    headers: { 'my-auth-key': token ? `${token}` : null }
});