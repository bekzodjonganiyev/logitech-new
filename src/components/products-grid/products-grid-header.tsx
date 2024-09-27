"use client"

import { useEffect, useState } from "react"
import { SelectIcon } from "@radix-ui/react-select"
import { TriangleDownIcon } from "@radix-ui/react-icons"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { ProductFilters } from "../product-filters"
import { UICardIcon, UIListIcon } from "../icons"

import { cn } from "@/lib/utils"
import useUpdateSearchParams from "@/hooks/use-update-search-params"

export type ProductsGridHeaderType = {
  url: string,
  title: string,
  productCount: number,
  className?: string,
  isMobile: boolean, // TODO - this will change 
  changeGridType: (gridtype: "galary" | "galary2" | "list") => void
}

export const ProductsGridHeader = (props: ProductsGridHeaderType) => {
  const { url, title, productCount, className, changeGridType, isMobile } = props
  const {updateSearchParams, deleteSearchParam} = useUpdateSearchParams()

  const [selectedGridType, setSelectedGridType] = useState<"list" | "galary">("galary")
  const [orderType, setOrderType] = useState("price")
  const isGalary = selectedGridType === "galary",
    isList = selectedGridType === "list"

  useEffect(() => {
    updateSearchParams({ordering: orderType})
  }, [orderType])

  return (
    <div className={cn("mb-5", className)}>
      {/* Hidden on mobile */}
      <h1 className="text-3xl font-bold mb-1 max-custom-1:hidden capitalize">{title}</h1>

      <div className="flex items-center gap-7">
        {/* Hidden on mobile */}
        <p className="w-32 max-custom-1:hidden">{productCount} ta maxsulot</p>

        {/* View on mobile */}
        <ProductFilters url={url} className="custom-1:hidden" />

        {/* Hidden on mobile. Used for long white space */}
        <div className="flex-1 max-custom-1:hidden"></div>

        {/* View on mobile */}
        <h1 className="flex-1 min-[410px]:text-2xl text-xl text-center font-bold mb-1 custom-1:hidden">{title}</h1>

        {/* Hidden on mobile */}
        <div className="flex items-center gap-1 border-[2px] px-2 rounded-md max-custom-1:hidden">
          <span>Saralash:</span>
          <Select value={orderType} onValueChange={(e) => setOrderType(e)}>
            <SelectTrigger className="w-fit border-none focus:ring-0 shadow-none pl-2">
              <SelectValue placeholder="Tanlang"/>
              <SelectIcon>
                <TriangleDownIcon />
              </SelectIcon>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-price">
                <span className="flex gap-2 items-center">Eng qimmat</span>
              </SelectItem>
              <SelectItem value="price">
                <span className="flex gap-2 items-center">Eng arzon</span>
              </SelectItem>
              {/* <SelectItem value="hit">
                <span className="flex gap-2 items-center">Mashxur</span>
              </SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        {
          isMobile
            ? <>sort</>
            : <div className="flex gap-1 border-[2px] rounded-card p-1">
              <button
                className={cn("rounded-card p-[3px]", isGalary && "bg-primary")}
                style={{
                  transition: 'background-color 0.3s ease',
                }}
                onClick={() => {
                  changeGridType("galary")
                  setSelectedGridType("galary")
                }}
              >
                <UICardIcon stroke={isGalary ? "white" : "black"} />
              </button>
              <button
                className={cn("rounded-card p-[3px]", isList && "bg-primary")}
                style={{
                  transition: 'background-color 0.3s ease',
                }}
                onClick={() => {
                  changeGridType("list")
                  setSelectedGridType("list")
                }}
              >
                <UIListIcon stroke={isList ? "white" : "black"} />
              </button>
            </div>
        }
      </div>
    </div>
  )
}
