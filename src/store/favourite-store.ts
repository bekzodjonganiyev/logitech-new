import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { Product } from '@/types/models/product.model'

interface FavouriteState {
    favourite: Product[]
    addToFavourite: (item: Product) => void
    deleteFromFavourite: (id: number) => void
}

export const useFavouriteStore = create(
    persist<FavouriteState>(
        (set) => ({
            favourite: [],

            addToFavourite: (item) => set((state) => {
                const findedItem = state.favourite.find(favourite => favourite.id === item.id)

                if (!findedItem) {

                    return { favourite: [...state.favourite, item] }
                } else {
                    const filterdArr = state.favourite.filter(favourite => favourite.id !== item.id)

                    return { favourite: filterdArr }
                }
            }),

            deleteFromFavourite: (id) => set((state) => {
                const filterdArr = state.favourite.filter(favourite => favourite.id !== id)

                return { favourite: filterdArr }
            })
        }),
        { name: 'favouriteStore', storage: createJSONStorage(() => localStorage) }
    )
)