import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

//define curreny interface for rate and name properties
interface Currency {
    rate: number
    name: "USD" | "UZS" | (string & {})
}

interface CurrencyState {
  currency: Currency
  setCurrency: (currency: Currency) => void
}

export const useCurrencyStore = create(
  persist<CurrencyState>(
    (set) => ({
    currency: {name: "UZS", rate: 12000 /*default currency, after fetched from server*/},
      setCurrency: (currency) => set({ currency })
    }),
    {
      name: "currencyStore",
      storage: createJSONStorage(() => localStorage)
    }
  )
)

