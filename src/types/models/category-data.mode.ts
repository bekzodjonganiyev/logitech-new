export type CategoryData = {
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
    partner: Array<{
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
      slug: string
    }>
    tags: Array<{
      id: number
      name: string
    }>
    colors: Array<{
      id: number
      name: string
      value: string
      quantity: number
    }>
    max_price: number
    min_price: number
  }
  