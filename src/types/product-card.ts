import { Product } from "./models/product.model"

export type ProductCardType = {
    variant?: "vertical" | "gorizontal",
    href: string, 
    item: Product,
    // isCart: boolean,
    isFavorite: boolean,  
    isCompare: boolean,
    inCartQty: number | undefined
    openModal: React.Dispatch<React.SetStateAction<{state: boolean, product: any}>>,
  }