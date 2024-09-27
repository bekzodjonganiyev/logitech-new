"use client"

import { useSearchParams } from "next/navigation"
import { CheckIcon } from "@radix-ui/react-icons"

import { DeleteSvg } from "../icons"

import useUpdateSearchParams from "@/hooks/use-update-search-params"
import { CategoryData } from "@/types/models/category-data.mode"

type FilterByColorType = {
  title: string,
  colors: CategoryData["colors"] | undefined,
}


export const FilterByColor = (props: FilterByColorType) => {
  const { colors, title } = props

  const searchParams = useSearchParams()
  const a = searchParams.get("color")

  const {updateSearchParams, deleteSearchParam} = useUpdateSearchParams()

  return (
    <div>
      <div className="flex items-stretch gap-2 mb-5">
        <h2 className="text-darkgray text-2xl font-bold">{title}</h2>
        {
          a && <button className="text-[#FF2947]" onClick={() => deleteSearchParam("color")}>
            <span className="flex items-end text-sm"><DeleteSvg width="22" height="22" /> Tozalash</span>
          </button>
        }
      </div>

      <ul className="space-y-1">
        {
          colors?.map(item => (
            <li
              className={`p-2 pl-0 rounded cursor-pointer flex items-center gap-3 hover:bg-lightgray hover:pl-2 transition-all`}
              key={item.id}
              onClick={() => {
                updateSearchParams({color: item.name})
              }}
            >
              <i className="w-6 h-6 rounded border" style={{ background: item.value }}></i>
              <p>{item.name}</p>
              {a === item.name && <span className="ml-auto"><CheckIcon /></span>}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
