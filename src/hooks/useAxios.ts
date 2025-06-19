import axios from 'axios';
import type { AxiosInstance } from 'axios';

const useAxios = (): { AxiosAuth: AxiosInstance; GuestAxios: AxiosInstance } => {
    const backend = import.meta.env.VITE_BACKEND_URL as string;
    const timeout = 1000 * 20;
    const AxiosAuth = axios.create({
        baseURL: backend,
        timeout,
        withCredentials: true,
    });

    AxiosAuth.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) { config.headers["Authorization"] = `Bearer ${token}`; }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const GuestAxios = axios.create({
        baseURL: backend, 
        timeout, 
        withCredentials: true,
    });

    return { AxiosAuth, GuestAxios, };
};

export default useAxios;