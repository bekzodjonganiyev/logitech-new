import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { getCookie } from "cookies-next"

const BASE_URL = process.env.BASE_URL ?? "https://api.logitech.uz/api/v1"

export const httpRequest = axios.create({
    baseURL: BASE_URL,
})

export const httpRequestAuth = axios.create({
    baseURL: BASE_URL,
})

httpRequestAuth.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getCookie("access")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

httpRequestAuth.interceptors.response.use(
    (value: AxiosResponse) => {

        return value
    },
    (error: AxiosError) => {

        // if (error.status === 401) {
        
        // }

        return error
    }
)