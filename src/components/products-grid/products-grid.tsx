"use client"

import { useState } from "react"

import ProductCard  from "@/components/card/product-card"
import { SelectProductVariantModal } from "../responsive-modal/select-product-variant"

import { cn } from "@/lib/utils"
import { useCurrencyStore } from "@/store/currency-store"

import { Product } from "@/types/models/product.model"
import { useFavouriteStore } from "@/store/favourite-store"

export type ProductsGridType = {
  className: string,
  items: Product[] | undefined,
  gridType: "galary" | "galary2" | "list"
}

export const ProductsGrid = (props: ProductsGridType) => {
  const { className, items, gridType } = props
  
  // const carts = useCartStore(state => state.carts)
  const currency = useCurrencyStore(state => state.currency)
  const favourites = useFavouriteStore(state => state.favourite)

  const [modal, setModal] = useState<{state: boolean, product: Product}>({state: false, product: {} as Product})


  return (
    <div className={cn(className)} >
      {
        items?.map((item, id) => (
          <ProductCard
            key={id}
            href={`/products/view/${item.id}`}
            variant={gridType}
            item={item}
            // isCart={carts.find(cart => cart.id === item.id) ? true : false}
            currency={currency}
            isFavorite={favourites.find(favourites => favourites.id === item.id) ? true : false}
            isCompare={false}
            inCartQty={0}
            openModal={setModal}
          />
        ))
      }
      <SelectProductVariantModal open={modal} setOpen={setModal} />
    </div>
  )
}