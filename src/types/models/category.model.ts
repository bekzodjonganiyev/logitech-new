export type Category = {
    id: number
    translations: {
        uz: {
            name: string
        }
        ru: {
            name: string
        }
        en: {
            name: string
        }
    }
    icon: string
    slug: string
    child: Array<any>
}