import { useEffect, useState } from 'react'

import { ProductsGrid } from '.'
import { GridSkelton } from './grid-skelton'

import { publicFetch } from "@/lib/requests"
import { cn } from '@/lib/utils'
import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

import { Product } from '@/types/models/product.model'

type ActiveProductTabStateType = { loading: boolean, error: unknown, data: Product[] }

const fetchTabbedProducts = publicFetch<ActiveProductTabStateType>(true)

export const ProductGridTabs = () => {
    const { lang } = useLanguageStore()
    const { productTabs } = getDictionaryObject(lang)

    const [activeTab, setActiveTab] = useState<"bestseller/" | "popular/" | "best-price/">("bestseller/")
    const [activeProductTab, setActiveProductTab] = useState<ActiveProductTabStateType>({ loading: true, error: false, data: [] })

    useEffect(() => {
        fetchTabbedProducts(`/product/products/${activeTab}`, setActiveProductTab, { cache: "force-cache" })
    }, [activeTab])

    return (
        <div className="container mb-10">
            <div className="flex items-center justify-center sm:gap-10 gap-5 mb-7">
                <button
                    className={cn("sm:text-xl text-base font-medium", activeTab === "bestseller/" && "text-primary")}
                    onClick={() => setActiveTab("bestseller/")}
                >{productTabs.bestSeller}</button>
                <button
                    className={cn("sm:text-xl text-base font-medium", activeTab === "best-price/" && "text-primary")}
                    onClick={() => setActiveTab("best-price/")}
                >{productTabs.bestPrice}</button>
                <button
                    className={cn("sm:text-xl text-base font-medium", activeTab === "popular/" && "text-primary")}
                    onClick={() => setActiveTab("popular/")}
                >{productTabs.famous}</button>
            </div>
            {
                activeProductTab.loading
                    ? <GridSkelton />
                    : <ProductsGrid
                        gridType="galary"
                        items={activeProductTab.data.slice(0, 8)}
                        className="grid min-[1150px]:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-12 max-custom-1:gap-8 max-sm:gap-6"
                    />
            }
        </div>
    )
}
