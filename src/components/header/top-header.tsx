"use client"

import { useEffect, useState } from "react"
import { SelectIcon } from "@radix-ui/react-select"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import Link from "next/link"

import { Separator, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { LocationSvg, LogitechSvg, RuFlag, UzFlag } from "../icons"

import { cn } from "@/lib/utils"
import { publicFetch } from "@/lib/requests"
import { priceFormatter } from "@/lib/price-formatter"
import { useCurrencyStore } from "@/store/currency-store"
import { useLanguageStore } from "@/store/lang-store"
import { getDictionaryObject } from "@/lib/dictionary"

import { Currency } from "@/types/models/currency.model";

type CurrencyStateType = { loading: boolean, error: unknown, data: Currency }

const fetchCurrency = publicFetch<CurrencyStateType>(false)


export const TopHeader = () => {
    const { lang } = useLanguageStore()
    const { header } = getDictionaryObject(lang)

    const [currencyValue, setCurrencyValue] = useState<CurrencyStateType>({ loading: true, error: false, data: {} as Currency })

    useEffect(() => {
        fetchCurrency("/other/currency/latest/", setCurrencyValue, { cache: "no-store" })
    }, [])

    return (
        <header className='custom-1:bg-lightgray max-custom-1:py-5'>
            <div className="container py-1 flex justify-between items-center gap-2 max-custom-1:hidden">
                <div className="w-fit text-left flex items-center gap-2">
                    <LanguageChanger />

                    <Separator orientation="vertical" className="bg-darkgray h-7 " />

                    <div className="flex gap-1 items-center">
                        <span><LocationSvg /></span>Toshkent
                    </div>
                </div>

                <div className="flex-1 text-center text-gray">
                    { header.topHeader.garantyTitle }
                </div>

                <div className="w-fit flex items-center justify-end gap-2">
                    <CurrencyChanger currencyRate={currencyValue.data?.rate} />

                    <Separator orientation="vertical" className="bg-darkgray h-7" />

                    <div>
                        <p>{header.topHeader.currency}: {currencyValue.loading ? <i className="animate-pulse px-12 ml-1 rounded-md bg-gray"></i> : <span className="text-primary font-bold">{priceFormatter(currencyValue.data.rate, false)} so’m</span>}</p>
                    </div>
                </div>
            </div>

            <div className="container flex items-center justify-between custom-1:hidden">
                {/* LANG CHANGER */}
                <LanguageChanger />

                {/* MAIN LOGO */}
                <Link href="/" className="w-[102px]">
                    <span><LogitechSvg /></span>
                </Link>

                {/* CURRENCY CHANGER */}
                <CurrencyChanger currencyRate={currencyValue.data?.rate} />
            </div>
        </header>
    )

}

const CurrencyChanger = ({ currencyRate }: { currencyRate: number }) => {
    const { currency, setCurrency } = useCurrencyStore()

    const isUsz = currency.name === "UZS", isUsd = currency.name === "USD"

    // TODO - On load the page, set the currency to setted in the store
    useEffect(() => {
        if (currencyRate) {
            setCurrency({ name: "UZS", rate: currencyRate })
        }
    }, [currencyRate])

    return (
        <>
            {/* For Desktom Devices */}
            <Select defaultValue={currency.name} onValueChange={(e) => {
                if (e === "USD") {
                    setCurrency({ name: "USD", rate: 1 })
                } else {
                    setCurrency({ name: "UZS", rate: currencyRate })
                }
            }}>
                <SelectTrigger className="w-[45px] border-none focus:ring-0 shadow-none p-0 max-custom-1:hidden">
                    <SelectValue />
                    <SelectIcon>
                        <ChevronDownIcon />
                    </SelectIcon>
                </SelectTrigger>
                <SelectContent className="border">
                    <SelectItem value="USD">
                        <span className="flex gap-2 items-center">USD</span>
                    </SelectItem>
                    <SelectItem value="UZS">
                        <span className="flex gap-2 items-center">UZS</span>
                    </SelectItem>
                </SelectContent>
            </Select>

            {/* For Mobile Devices */}
            <div className="bg-lightgray flex gap-1 p-1 rounded-card custom-1:hidden">
                <button
                    className={cn("rounded-card p-[3px]", isUsz && "bg-primary")}
                    style={{
                        transition: 'background-color 0.3s ease',
                    }}
                    onClick={() => {
                        setCurrency({ name: "UZS", rate: currencyRate })
                    }}
                >
                    <span className={cn("font-bold text-white text-sm", !isUsz && "text-gray")}>USZ</span>
                </button>
                <button
                    className={cn("rounded-card p-[3px]", isUsd && "bg-primary")}
                    style={{
                        transition: 'background-color 0.3s ease',
                    }}
                    onClick={() => {
                        setCurrency({ name: "USD", rate: 1 })
                    }}
                >
                    <span className={cn("font-bold text-white text-sm", !isUsd && "text-gray")}>USD</span>
                </button>
            </div>
        </>
    )
}

export const LanguageChanger = () => {
    const { lang, setLang } = useLanguageStore()

    return (
        <>
            {/* DESKTOP LANG CHANGER */}
            <Select defaultValue={lang} value={lang} onValueChange={(e: "uz" | "ru") => {
                setLang(e)
            }}>
                <SelectTrigger className="w-[100px] border-none focus:ring-0 shadow-none p-0 max-custom-1:hidden">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ru">
                        <span className="flex gap-2 items-center"><RuFlag />Русский</span>
                    </SelectItem>
                    <SelectItem value="uz">
                        <span className="flex gap-2 items-center"><UzFlag />O&apos;zbekcha</span>
                    </SelectItem>
                </SelectContent>
            </Select>

            {/* MOBILE LANG CHANGER */}
            <Select defaultValue={lang} value={lang} onValueChange={(e: "uz" | "ru") => setLang(e)}>
                <SelectTrigger className="w-[70px] border-none focus:ring-0 shadow-none px-2 bg-lightgray custom-1:hidden">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ru">
                        <span className="flex gap-2 items-center"><RuFlag />RUS</span>
                    </SelectItem>
                    <SelectItem value="uz">
                        <span className="flex gap-2 items-center"><UzFlag />UZB</span>
                    </SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}