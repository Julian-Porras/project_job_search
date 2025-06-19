import useAxios from '../hooks/useAxios'
import type { LoginCredentials, RegisterCredentials } from '../types/index';

const { AxiosAuth, GuestAxios } = useAxios();

export const loginApi = async (credentials: LoginCredentials) => {
    await GuestAxios.get("/sanctum/csrf-cookie");
    const response = await GuestAxios.post("/api/login", credentials);
    return response.data;
};

export const registerApi = async (credentials: RegisterCredentials) => {
    await GuestAxios.get("/sanctum/csrf-cookie");
    const response = await GuestAxios.post("/api/register", credentials);
    return response.data;
};

export const userInfoApi = async () => {
    const response = await AxiosAuth.get("/api/user-info");
    return response.data;
};

export const logoutApi = async () => {
    await AxiosAuth.post("/api/logout");
};
