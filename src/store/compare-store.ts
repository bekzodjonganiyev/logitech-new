import { Product } from '@/types/models/product.model'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface CompareState {
    compare: Product[]
    addToCompare: (item: Product) => void
    deleteFromCompare: (id: number) => void
}

export const useCompareStore = create(
    persist<CompareState>(
        (set) => ({
            compare: [],

            addToCompare: (item) => set((state) => {
                const findedItem = state.compare.find(compare => compare.id === item.id)

                if (!findedItem) {

                    return { compare: [...state.compare, item] }
                } else {
                    const filterdArr = state.compare.filter(compare => compare.id !== item.id)

                    return { compare: filterdArr }
                }
            }),

            deleteFromCompare: (id) => set((state) => {
                const filterdArr = state.compare.filter(compare => compare.id !== id)

                return { compare: filterdArr }
            })
        }),
        { name: 'compareStore', storage: createJSONStorage(() => localStorage) }
    )
)