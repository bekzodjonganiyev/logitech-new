"use client"

import { useEffect, useState } from "react"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FilterByCategory } from "./filter-by-category"
import { FilterByColor } from "./filter-by-color"
import FilterByPrice from "./filter-by-price"
import { FilterByTag } from "./filter-by-tag"
import { FilterSvg } from "../icons"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { publicFetch } from "@/lib/requests"
import { useLanguageStore } from "@/store/lang-store"
import { getDictionaryObject } from "@/lib/dictionary"

import { CategoryData } from "@/types/models/category-data.mode"

type ProductFiltersProps = {
    className?: string,
    url: string
}

type CategoryDataStateType = {
    loading?: boolean,
    error?: any,
    data?: CategoryData
}

const fetchCategoryData = publicFetch<CategoryDataStateType>(false)

// TODO - optimize this component, fetch datas in the body of the component
export const ProductFilters = ({ className, url }: ProductFiltersProps) => {
    const isMobile = useMediaQuery("(max-width: 919px)")
    const { lang } = useLanguageStore()
    const { categoryPage } = getDictionaryObject(lang)

    const [categoryData, setCategoryData] = useState<CategoryDataStateType>({ loading: true, error: null, data: {} as CategoryData })

    useEffect(() => {
        fetchCategoryData(url, setCategoryData, { cache: "force-cache", next: { revalidate: 60 } })
    }, [])

    const content = !isMobile ? (
        <div className={cn(className)}>

            <FilterByCategory
                title={categoryPage.filterBy.catalag}
                categories={categoryData?.data?.partner}
                lang={lang}
            />

            {/* TODO - optimize this component */}
            <FilterByColor
                title={categoryPage.filterBy.color}
                colors={categoryData?.data?.colors}
            />
            <FilterByPrice
                title={categoryPage.filterBy.color}
                minPrice={categoryData?.data?.min_price as number}
                maxPrice={categoryData?.data?.max_price as number}
            />
            <FilterByTag
                title={categoryPage.filterBy.color}
                tags={categoryData?.data?.tags}
            />
        </div>
    ) : (
        <Sheet>
            <SheetTrigger className={cn("flex items-center text-primary", className)}><FilterSvg /> Filter</SheetTrigger>
            <SheetContent side={"left"} className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Filtrlar</SheetTitle>
                    {/* <div className="flex flex-col gap-10"> */}
                    <FilterByCategory
                        title={categoryPage.filterBy.color}
                        categories={categoryData?.data?.partner}
                        lang={lang}
                    />
                    <FilterByColor
                        title={categoryPage.filterBy.color}
                        colors={categoryData?.data?.colors}
                    />
                    <FilterByPrice
                        title={categoryPage.filterBy.color}
                        minPrice={categoryData?.data?.min_price as number}
                        maxPrice={categoryData?.data?.max_price as number}
                    />
                    <FilterByTag
                        title={categoryPage.filterBy.color}
                        tags={categoryData?.data?.tags}
                    />
                    {/* </div> */}
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )

    // if (!isMobile) {
    //     return (
    //         <div className={cn(className)}>

    //             <FilterByCategory
    //                 title="Kategoriyalar"
    //                 categories={categoryData?.data?.partner}
    //             />

    //             {/* TODO - optimize this component */}
    //             <FilterByColor
    //                 title="Ranglar"
    //                 colors={categoryData?.data?.colors}
    //             />
    //             <FilterByPrice
    //                 title="Narx, baho"
    //                 minPrice={categoryData?.data?.min_price as number}
    //                 maxPrice={categoryData?.data?.max_price as number}
    //             />
    //             <FilterByTag
    //                 title="Teglar"
    //                 tags={categoryData?.data?.tags}
    //             />
    //         </div>
    //     )

    // } else {
    //     return (
    //         <Sheet>
    //             <SheetTrigger className={cn("flex items-center text-primary", className)}><FilterSvg /> Filter</SheetTrigger>
    //             <SheetContent side={"left"}>
    //                 <SheetHeader>
    //                     <SheetTitle>Filtrlar</SheetTitle>
    //                     {/* <div className="flex flex-col gap-10"> */}
    //                     <FilterByCategory
    //                         title="Kategoriyalar"
    //                         categories={categoryData?.data?.partner}
    //                     />
    //                     <FilterByColor
    //                         title="Ranglar"
    //                         colors={categoryData?.data?.colors}
    //                     />
    //                     <FilterByPrice
    //                         title="Narx, baho"
    //                         minPrice={categoryData?.data?.min_price as number}
    //                         maxPrice={categoryData?.data?.max_price as number}
    //                     />
    //                     <FilterByTag
    //                         title="Teglar"
    //                         tags={categoryData?.data?.tags}
    //                     />
    //                     {/* </div> */}
    //                 </SheetHeader>
    //             </SheetContent>
    //         </Sheet>
    //     )
    // }

    if (categoryData.loading) {
        return <div>Loading...</div>
    }

    if (!categoryData.data) return <div>Error: <pre>{JSON.stringify(categoryData.error, null, 2)}</pre></div>

    return content

}