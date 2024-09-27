"use client"

import { useState } from "react"

import { ProductImageSlider } from "@/components/slider"
import { ParametrsAndActions } from '@/components/product-view/parametrs-and-actions';
import { TitleAndColors } from '@/components/product-view/title-and-colors';
import { CommentsTab, DetailInfoTab } from '@/components/product-view/tabs';

import { useCurrencyStore } from "@/store/currency-store";
import { ProductColorContext } from "@/store/product-color-store";
import { useLanguageStore } from "@/store/lang-store"
import { getDictionaryObject } from "@/lib/dictionary"

import { ProductDetail } from "@/types/models/product.model";

const ClientPage = ({ pageParams, data }: { pageParams: any, data: ProductDetail | null }) => {
    const totalQty = data?.colors?.reduce((acc: any, color: any) => acc + color.quantity, 0)
    const currency = useCurrencyStore(state => state.currency)
    const { lang } = useLanguageStore()
    const { productPage } = getDictionaryObject(lang)
    
    const [tab, setTab] = useState(1)
    const [selectedColor, setSelectedColor] = useState({ id: 0, name: "", value: "", qty: totalQty })

    return (
        <ProductColorContext.Provider value={{selectedColor, setSelectedColor}}>
            <div className='container py-10'>
                <div className='flex max-md:flex-col items-start gap-[30px] mb-10'>
                    {/* Image */}
                    <ProductImageSlider productSliderImages={data?.photos ?? []} />

                    {/* Main info */}
                    <TitleAndColors currency={currency} data={data as ProductDetail} className='max-md:w-full' />

                    {/* Description */}
                    <ParametrsAndActions currency={currency} data={data as ProductDetail} className="custom-1:block hidden"/>
                </div>

                <div className='flex items-center justify-center gap-5 border-t border-b sm:py-5 py-2'>
                    <button onClick={() => setTab(1)}>{productPage.tabs.moreInfo}</button>
                    <button onClick={() => setTab(2)}>{productPage.tabs.comments}</button>
                </div>

                <>
                    {
                        tab === 1
                            ? <DetailInfoTab data={data?.fields} desc={data?.translations[lang].description} />
                            : <CommentsTab />
                    }
                </>

            </div>
        </ProductColorContext.Provider>
    )
}

export default ClientPage
