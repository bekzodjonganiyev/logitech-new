type Products = {
    id: number
    name: string
    price: number
    image: string
    color: { id: number, name: string, value: string, qty: number }
    qty: number
    skuId: string
    rating: number
}

export type CartWithCustomer = {
    id: number
    products: Products[]
    customer: {
        id: number
        first_name: string
        last_name: string
        is_admin: boolean
    }
}
