import { Dispatch, SetStateAction } from "react";
import Cookie from "js-cookie"

import { fetcher } from "./fetcher";
import { decodeToken } from "./checkAuth";

export function publicFetch<T>(hasPaginate: boolean) {

    return async (url: string, setState: Dispatch<SetStateAction<T>>, options: RequestInit = {}) => {
        try {
            setState({ loading: true } as T)

            const res = await fetcher(url, options)

            const data = hasPaginate ? res.results : res
            setState({ loading: false, data: data } as T)
        } catch (error) {
            setState({ error: error } as T)
        }
    }
}

// TODO - pagination process should handle
export function privateFetch<T>(hasPaginate: boolean) {
    const accessToken = Cookie.get("access")
    const decodedAccessToken = decodeToken(accessToken)

    return async (url: string, setState: Dispatch<SetStateAction<T>>, options: RequestInit = {}) => {
        try {
            setState({ loading: true } as T)

            if (!accessToken || !decodedAccessToken) {
                setState({ loading: false, data: null, error: "Tasdiqlanmagan foydalanuvchi" } as T)
                return;
            }

            const res = await fetcher(url, {
                ...options,
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + accessToken,
                    ...options.headers
                },
            })

            const data = hasPaginate ? res.results : res
            setState({ loading: false, data: data } as T)
        } catch (error) {
            setState({ error: error, loading: false } as T)
        }
    }
}