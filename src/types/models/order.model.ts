export type OrderProduct = {
    id: number
    quantity: number
    price: string
    product: number
    color: number
    promo: any
}

export type OrderCustomer = {
    id: number
    first_name: string
    last_name: string
    is_admin: boolean
}

export type Order = {
    id: number
    customer: OrderCustomer
    products: OrderProduct[]
    created_at: string
    updated_at: string
    status: string
    delivery_type: boolean
    address: string
    point: string
    payment_type: string
    qr_code: any
    total: number
    amount: number
}

export type Orders = Order[]