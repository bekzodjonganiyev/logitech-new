export type District = {
    id: number
    translations: {
        uz: {
            name: string
        }
        en: {
            name: string
        }
        ru: {
            name: string
        }
    }
}

export type Region = {
    id: number
    translations: {
        uz: {
            name: string
        }
        en: {
            name: string
        }
        ru: {
            name: string
        }
    }
    districts: District[]
}

export type Regions = Region[]