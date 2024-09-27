type Translations = {
    "uz-ru"?: {
        description: string
    }
    uz: {
        description: string
    }
    ru: {
        description: string
    }
    en: {
        description: string
    }
}

type Photo = {
    id: number
    name: string
    status: string
    source: string
    color: string
}

type Tag = {
    id: number
    name: string
}

type Color = {
    id: number
    name: string
    value: string
    quantity: number
}

type Category = {
    id: number
    translations: Translations
    slug: string
}

type Fields = {
    id: number
    translations: {
        ru: {
            label: string
            value: string
        }
        uz: {
            label: string
            value: string
        }
        en: {
            label: string
            value: string
        }
    }
}

type Comment = {
    id: number
    body: string
    created_at: string
    updated_at: string
    author: {
        id: number
        first_name: string
        last_name: string
        is_admin: boolean
    }
    parent: {
        id: number
        name: string
        slug: string
    }
    rate: number
}

export type Product = {
    id: number
    name: string
    translations: Translations
    photos: Photo[]
    price: number
    slug: string
    hits: number
    created_at: string
    updated_at: string
    tags: Tag[]
    fields?: Fields[]
    colors: Color[]
    is_combo: boolean
    is_top_rated: boolean
    is_popular: boolean
    is_best_seller: boolean
    is_best_price: boolean
    rating: number
    discount?: number
    cart_count: number
}

export type ProductDetail = Product & {
    category: Category
    fields: Fields[]
    comments: Comment[]
}