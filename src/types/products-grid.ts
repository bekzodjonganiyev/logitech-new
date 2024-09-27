export type ProductsGridType = {
    className: string,
    items: any[],
    gridType: "galary" | "list"
}

export type ProductsGridHeaderType = {
    title: string,
    productCount: number,
    className?: string,
    changeGridType: (gridtype: "galary" | "list") => void
}