import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios";

export const apiInstance = {
    create: (configDefault?: CreateAxiosDefaults) => {
        const api = axios.create(configDefault)
        api.interceptors.request.use((config) => {
            return {
                ...config,  
            } as unknown as InternalAxiosRequestConfig
        })
        return api
    }
}