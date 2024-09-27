import { httpRequestAuth } from "@/lib/api";

export const orderService = {
    getOrders: (params?: {[key: string]: string}) => httpRequestAuth.get("/market/order/", {params}),
    getOrder: (params?: {[key: string]: string | number}) => httpRequestAuth.get("/market/order/", {params}),
}
