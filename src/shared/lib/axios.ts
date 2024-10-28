import axios from "axios";

import {accessTokenStorage} from './lsStorage';

export const fetcher = axios.create({
    baseURL: "/api",
})

fetcher.interceptors.request.use((config: any) => {
    if (accessTokenStorage.get() && !config.url.includes('refresh') && !config.url.includes('login')) {
        config.headers.Authorization = `Bearer ${accessTokenStorage.get()}`
    }
    return config;
})
fetcher.interceptors.response.use((response: any) => response, (error: any) => {
    if (error?.response?.status === 401 && !error?.config?.url.includes('refresh') && !error?.config?.url.includes('login')) {
        // return authService.refresh().then((response: any) => {
        //     accessTokenStorage.save(response.data?.access)
        //     refreshTokenStorage.save(response.data?.refresh)
        //     error.config.headers.Authorization = `Bearer ${response.data?.access}`
        //     return fetcher.request(error.config)
        // }).catch(() => {
        //     accessTokenStorage.clear()
        //     refreshTokenStorage.clear()
        //     window.location.href = "/"
        // })
    }
    return Promise.reject(error);
})
