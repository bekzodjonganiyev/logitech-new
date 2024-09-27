"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

import { fetcher } from "./fetcher"
import { decodeToken } from "./checkAuth";

export async function sendCode(phone: string) {
    const res = await fetcher("/user/sendcode/", {
        method: "POST",
        body: JSON.stringify({ phone }),
        headers: {
            "Content-type": "application/json"
        }
    })

    return res
}

export async function verifyCode(phone: string, code: string) {
    const res = await fetcher("/user/verify/", {
        method: "POST",
        body: JSON.stringify({ phone, code }),
        headers: {
            "Content-type": "application/json"
        }
    })

    if (res) {
        cookies().set("access", res.access)
        cookies().set("refresh", res.refresh)
    }

    return res
}

export async function refreshAccessToken(refreshToken: string) {
    const res = await fetcher("/user/token/refresh/", {
        method: "POST",
        body: JSON.stringify({ refresh: refreshToken }),
        headers: {
            "Content-type": "application/json"
        }
    })

    console.log(res, "while refresh access")

    if (res) {
        cookies().set("access", res.access)
    }
}

export async function privateFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    const accessToken = cookies().get("access")
    const decodedAccessToken = decodeToken(accessToken?.value)

    if (!accessToken || !decodedAccessToken) return Promise.resolve({ message: "Token is not found", data: null, error: 401 } as T)

    const res: T = await fetcher(url, {
        ...options,
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + accessToken.value,
            ...options.headers
        }
    })

    return res
}

export async function logout() {
    cookies().delete("access")

    return redirect("/")
}