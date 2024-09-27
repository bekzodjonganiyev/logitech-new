"use client"

import { useSearchParams } from "next/navigation"

import { DeleteSvg } from "../icons"

import { CategoryData } from "@/types/models/category-data.mode"
import useUpdateSearchParams from "@/hooks/use-update-search-params"

export type FilterByTagType = {
  title: string,
  tags: CategoryData["tags"] | undefined,
}

export const FilterByTag = (props: FilterByTagType) => {
  const { tags, title } = props

  const searchParams = useSearchParams()
  const a = searchParams.get("tag")

  const {updateSearchParams, deleteSearchParam} = useUpdateSearchParams()

  return (
    <div>
      <div className="flex items-stretch gap-2 mb-5">
        <h2 className="text-darkgray text-2xl font-bold">{title}</h2>
        {
          a && <button className="text-[#FF2947]" onClick={() => deleteSearchParam("tag")}>
            <span className="flex items-end text-sm"><DeleteSvg width="22" height="22" /> Tozalash</span>
          </button>
        }
      </div>

      <div className="flex flex-wrap gap-3">
        {
          tags?.map(item => (
            <button key={item.id} className="bg-lightgray p-3 rounded-card" onClick={() => {
              updateSearchParams({tag: item.name})
            }}>{item.name}</button>
          ))
        }
      </div>
    </div>
  )
}