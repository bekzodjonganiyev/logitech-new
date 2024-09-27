import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from "sonner"

import { checkTokenIsExpires } from '@/lib/checkAuth'
import { privateFetch } from '@/lib/actions'

export interface Cart {
  id: number
  name: string
  price: number
  image: string
  color: { id: number, name: string, value: string, qty: number }
  qty: number
  skuId: string
  rating: number
}

interface CartState {
  carts: Cart[]
  addToCart: (item: Cart) => void
  deleteFromCart: (skuId: string) => void
  increase: (skuId: string) => void
  decrease: (skuId: string) => void
  setAll: (carts: Cart[]) => void
}

const increase = (state: CartState, skuId: string) => {
  // Find item by skuId from carts
  const findedItem = state.carts.find(cart => cart.skuId === skuId)

  // If item is in carts, increase its qty
  if (findedItem) {
    findedItem.qty += 1

    sync(findedItem)
  }

  return { carts: [...state.carts] }
}

const decrease = (state: CartState, skuId: string) => {
  // Find item by skuId from carts
  const findedItem = state.carts.find(cart => cart.skuId === skuId)

  // If item is in carts, increase its qty
  if (findedItem) {
    findedItem.qty -= 1

    sync(findedItem)
    
    // If finded item's qty equal to 1, this item pop from cart list
    if (findedItem.qty < 1) {
      const filterdArr = state.carts.filter(item => item.skuId !== skuId)
      
      return { carts: filterdArr }
    }
    
  }

  return { carts: [...state.carts] }
}

const addToCart = (state: CartState, item: Cart) => {
  const findedItem = state.carts.find(cart => cart.skuId === item.skuId)

  if (!findedItem) {
    // Alert for added this item to the cart
    toast.success(
      "Maxsulot savatga qo'shildi",
      {
        position: "top-center", richColors: true, dismissible: true, duration: 2000,
        action: { label: "Savatga", onClick: () => window.location.href = "/cart" },
        actionButtonStyle: { backgroundColor: "#2b9348", fontWeight: 'normal' }
      }
    )

    sync(item)

    return { carts: [...state.carts, item] }
  } else {
    // Alert for already have this item in cart
    toast.info(
      "Maxsulot savatga qo'shilgan",
      {
        position: "top-center", richColors: true, dismissible: true, duration: 1500,
      }
    )
    return { carts: state.carts }
  }

}

const deleteFromCart = (state: CartState, skuId: string) => {
  const findedItem = state.carts.find(cart => cart.skuId === skuId)
  const filterdArr = state.carts.filter(item => item.skuId !== skuId)

  if (findedItem)  sync(findedItem, true)
  
  // Alert for deleted this item from cart
  
  return { carts: filterdArr }
}

const setAll = (carts: Cart[]) => {
  return { carts: carts }
}

const sync = async (item: Cart, deleteThisItem?: boolean) => {
  const obj = {
    product: item.id,
    color: item.color.id,
    quantity: deleteThisItem ? 0 : item.qty
  }

  if (checkTokenIsExpires()) {
    await privateFetch("/market/cart/add/", { method: "POST", body: JSON.stringify(obj) })
  } else null
}

export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      carts: [],

      increase: (skuId) => set((state) => increase(state, skuId)),

      decrease: (skuId) => set((state) => decrease(state, skuId)),

      addToCart: (item) => set((state) => addToCart(state, item)),

      deleteFromCart: (skuId) => set((state) => deleteFromCart(state, skuId)),

      setAll: (carts) => set(() => setAll(carts))

    }),
    { name: 'cartStore', storage: createJSONStorage(() => localStorage) }
  )
)