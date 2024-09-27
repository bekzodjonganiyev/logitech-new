"use client"

import { memo, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import { Input, Slider } from "@/components/ui"
import { DeleteSvg } from "../icons"

import useUpdateSearchParams from "@/hooks/use-update-search-params"
import { useCurrencyStore } from "@/store/currency-store"
import { priceFormatter } from "@/lib/price-formatter"

type FilterByPriceType = {
  title: string,
  minPrice: number
  maxPrice: number
}

const FilterByPrice = (props: FilterByPriceType) => {
  const { maxPrice, minPrice, title } = props

  const searchParams = useSearchParams()
  const a = searchParams.get("min_price")
  const b = searchParams.get("max_price")

  const currency = useCurrencyStore(state => state.currency)
  const { updateSearchParams } = useUpdateSearchParams()

  const [price, setPrice] = useState<{ min: number, max: number }>({ min: minPrice, max: maxPrice })
  const [isChanged, setIsChanged] = useState<{ changed: boolean, touchEnd: boolean }>({ changed: false, touchEnd: false })

  useEffect(() => {
    const debouncedChangePrice = setTimeout(() => {
      if (isChanged.changed) {
        const newParams = {
          min_price: price.min?.toString(),
          max_price: price.max?.toString(),
        };

        updateSearchParams(newParams);
      }
    }, 800);

    return () => clearTimeout(debouncedChangePrice)
  }, [price, isChanged])

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <h2 className="text-darkgray text-2xl font-bold">{title}</h2>
        {
          ((a || b) && (a !== minPrice.toString() || b !== maxPrice.toString())) && <button className="text-[#FF2947]" onClick={() => {
            setPrice({ min: minPrice, max: maxPrice })
          }}>
            <span className="flex items-end text-sm"><DeleteSvg width="22" height="22" /> Tozalash</span>
          </button>
        }
      </div>

      <div className="flex justify-between gap-2 mb-4">
        <Input className="focus-visible:ring-primary text-sm" type="text" readOnly defaultValue={minPrice} value={`${priceFormatter(price.min * currency.rate, currency.name === "UZS")} ${currency.name}`}/>
        <span className="text-3xl text-gray">-</span> 
        <Input className="focus-visible:ring-primary text-sm" type="text" readOnly defaultValue={maxPrice} value={`${priceFormatter(price.max * currency.rate, currency.name === "UZS")} ${currency.name}`}/>
      </div>

      <Slider
        className="focus-visible:ring-transparent"
        defaultValue={[minPrice, maxPrice]}
        value={[price.min, price.max]}
        min={minPrice}
        max={maxPrice}
        step={1}
        onValueChange={(prices) => {
          setPrice({ min: prices[0], max: prices[1] })
          setIsChanged({ changed: true, touchEnd: true })
        }}
      />
    </div>
  )
}

export default memo(FilterByPrice)