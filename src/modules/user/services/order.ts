import { httpRequestAuth } from "@/lib/api";

export const orderService = {
    getOrders: (params?: { [key: string]: string }, serverSideToken?: string) => {
        const headers = serverSideToken ? { "Authorization": `Bearer ${serverSideToken}` } : {}

        return httpRequestAuth.get("/market/order/", { params, headers })
    },
}
