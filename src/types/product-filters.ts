export type FilterByCategoryType = {
    title: string,
    categories: {name: string; href: string}[],
}

export type FilterByColorType = {
    title: string,
    colors: {name: string, value: string}[]
}

export type FilterByPriceType = {
    title: string,
    minPrice: number,
    maxPrice: number,
}

export type FilterByTagType = {
    title: string,
    tags: {name: string, tag: string}[]
}