"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Link from "next/link"
import Cookies from "js-cookie"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronLeftIcon } from "@radix-ui/react-icons"

import { Input } from "@/components/ui"
import { LoginModal } from "../responsive-modal/login-modal"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet"
import { BagSvg, BurgerSvg, CompareSvg, HeartSvg, LogitechSvg, PCUserSvg, SearchSvg } from "@/components/icons"

import { publicFetch } from "@/lib/requests"
import { decodeToken } from "@/lib/checkAuth"
import { fetcher } from "@/lib/fetcher"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/store/cart-store"
import { useLanguageStore } from "@/store/lang-store"
import { getDictionaryObject } from "@/lib/dictionary"
import { checkTokenIsExpires } from "@/lib/checkAuth"

import { Category } from "@/types/models/category.model"
import { Product } from "@/types/models/product.model"

type SearchedProductsStateType = { loading: boolean, data: Product[], error: unknown }
const searchProducts = publicFetch<SearchedProductsStateType>(true)

export const MainHeader = ({ categories }: { categories: Category[] }) => {
    const user = decodeToken()
    const { lang } = useLanguageStore()
    const { header, loginModal } = getDictionaryObject(lang)

    const [open, setOpen] = useState({ katalog: false, sheet: false })
    const [searchOpen, setSearchOpen] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
      setLoaded(true);
      const closeCatalog = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
            !target.classList.contains("catalog-menu") &&
            !target.parentElement?.classList.contains("catalog-menu") &&
            !target.parentElement?.parentElement?.classList.contains("catalog-menu")
        ) {
          setOpen({ ...open, katalog: false });
        }
      };
      document.addEventListener("mousedown", closeCatalog);
      return () => document.removeEventListener("mousedown", closeCatalog);
    }, []);    

    return (
        <nav className='sticky top-0 z-[50] bg-white border-b-2 border-lightgray py-5'>
            <div className="container relative flex items-center min-[1150px]:gap-10 gap-5">

                {/* LOGO */}
                <Link href="/" className="w-[102px] max-custom-1:hidden">
                    <span className="h-8"><LogitechSvg /></span>
                </Link>

                {/* KATALOG BTN AND SEARCH INPUT  */}
                <div className="flex-1 flex max-custom-1:gap-4 gap-[30px] relative"> {/* the `relative` class added for search input in mobile device views cool  */}
                    {/* OPEN KATALOG BTN */}
                    <button
                        className="min-w-1/12 rounded-header-elm bg-primary custom-1:block hidden"
                        onClick={() => setOpen({ ...open, katalog: !open.katalog })}
                    >
                        <span className="catalog-menu w-full h-full px-4 py-2 flex items-center justify-between gap-2 text-white font-bold box-border"><BurgerSvg stroke="white" /> <span className="catalog-menu max-custom-1:hidden">{header.mainHeader.catalog}</span></span>
                    </button>

                    {/* OPEN ADDITIONAL MENU BTN Temporary Hidden */}
                    {/* <button
                        className="min-w-1/12 rounded-header-elm bg-primary custom-1:hidden"
                        onClick={() => setOpen({ ...open, sheet: true })}
                    >
                        <span className="w-full h-full px-4 py-2 flex items-center justify-between gap-2 text-white font-bold box-border"><BurgerSvg stroke="white" /></span>
                    </button> */}

                    {/* SEARCH INPUT */}
                    <SearchInput searchOpen={searchOpen} setSearchOpen={setSearchOpen} />

                </div>

                {/* SEARCH INPUT OVERLAY */}
                <SearchOverlay open={searchOpen} setOpen={setSearchOpen} />

                {/* KATALOG MENU */}
                {categories && categories.length > 0 ? <CatalogMenu categories={categories} open={open}/> : null}
                {/* { categories && <CatalogMenu categories={categories} open={open}/> } */}
                {/* <CatalogMenu categories={categories} open={open}/> */}

                {/* ADDITIONAL SHEET MENU ON MOBILE */}
                <Sheet open={open.sheet} onOpenChange={(sheet) => setOpen({ ...open, sheet: sheet })}>
                    <SheetContent overlayClassName="backdrop-blur-sm bg-black/50" side={"left"} tabIndex={10}>
                        <SheetHeader>
                            <SheetTitle></SheetTitle>
                            <SheetDescription>

                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>

                {/* ACTIONS */}
                <ul className="flex items-center justify-end min-[1150px]:gap-[20px] gap-[15px] -mb-2 max-custom-1:hidden">
                    <li>
                        {
                            loaded /* && !userData.loading*/
                                ? <>
                                    {
                                        user && (user.exp as number) * 1000 > Date.now()
                                            ? <GoToProfileButton name={header.mainHeader.goToProfile} />
                                            : <LoginModal />
                                    }
                                </>
                                : <span className="block w-12 h-10 bg-gray rounded-full animate-pulse"></span>
                        }
                    </li>
                    <li>
                        <Link href="/favourite" className="flex flex-col items-center gap-1 hover:text-primary text-[14px]"><HeartSvg height="22" className="stroke-amber-50" />{header.mainHeader.liked}</Link>
                    </li>

                    {/* // Avoid from re-render on addToCard function works every product card */}
                    <CartsButton />

                    <li>
                        <Link href="/compare" className="flex flex-col items-center gap-1 hover:text-primary text-[14px]"><CompareSvg className="fill-black"/>{header.mainHeader.compare}</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )

}

const CartsButton = () => {
    const { carts, setAll } = useCartStore((state) => ({ carts: state.carts, setAll: state.setAll }))
    const { lang } = useLanguageStore()
    const { header } = getDictionaryObject(lang)

    const syncCartWithDb = async (setState: Dispatch<SetStateAction<any>>) => {
        const accessToken = Cookies.get("access")

        const res = await fetcher("/market/cart/", { headers: { "Authorization": `Bearer ${accessToken}`, } })

        if (res) {
            setState(res[0].products)
        }
    }

    useEffect(() => {
        if (checkTokenIsExpires()) syncCartWithDb(setAll)
    }, [checkTokenIsExpires()])
    return (
        <li className="relative">
            {
                carts.length > 0 && <span className="absolute right-0 bottom-full flex items-center justify-center bg-red-500 text-white text-xs font-medium w-5 h-5 rounded-full">{carts.length}</span>
            }
            <Link href="/cart" className="flex flex-col items-center gap-1 hover:text-primary text-[14px]"><BagSvg />{header.mainHeader.cart}</Link>
        </li>
    )
}

const GoToProfileButton = ({ name }: { name: string }) => {
    const { push } = useRouter()

    return (
        <button onClick={() => push("/profile/personal-info")} className="flex flex-col items-center gap-0 hover:text-primary text-[14px]">
            <PCUserSvg width="30" height="25" stroke="black" /> <span>{name}</span>
        </button>
    )
}

const SearchInput = ({ searchOpen, setSearchOpen }: { searchOpen: boolean, setSearchOpen: (state: boolean) => void }) => {
    const [search, setSearch] = useState("")
    const [searchedProducts, setSearchedProduct] = useState<SearchedProductsStateType>({ loading: false, data: [], error: null })
    const { lang } = useLanguageStore()
    const { header } = getDictionaryObject(lang)

    useEffect(() => {
        const debouncedSearch = setTimeout(() => {
            if (search) {
                searchProducts(`/product/products/?search=${search}`, setSearchedProduct, { cache: "no-cache" })
            }
        }, 1000)

        return () => clearTimeout(debouncedSearch)

    }, [search])

    // onFocus to search input, blocked scroll on body
    useEffect(() => {
        const bodyElm = document.querySelector("body")

        if (bodyElm) {
            if (searchOpen) {
                bodyElm.classList.add("overflow-hidden")
            } else {
                bodyElm.classList.remove("overflow-hidden")
            }
        }

    }, [searchOpen])

    return (
        <div className={cn("custom-1:relative w-full z-[51]", searchOpen && "absolute")}>
            {/* INPUT */}
            <div className="relative max-custom-1:flex items-center gap-2">
                {/* Close btn search overlay on mobile device */}
                <button className={cn("hidden", searchOpen && "max-custom-1:block bg-primary p-[3px] rounded-md")} onClick={() => setSearchOpen(false)}>
                    <ChevronLeftIcon width={40} height={40} color="white" />
                </button>
                <Input
                    className="w-full bg-lightgray rounded-header-elm border-[0.39px] border-primary focus-visible:ring-transparent py-[22px] px-5"
                    placeholder={header.mainHeader.searchPlaceholder}
                    onFocus={() => {
                        setSearchOpen(true)

                        // Scroll to top when search input focused, beacuse search input bad located on mobile device
                        window.scrollTo({ top: 100, behavior: "smooth" })
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <span
                    className="absolute right-0 top-0 w-12 h-full bg-primary rounded-r-header-elm flex items-center justify-center cursor-pointer"
                    onClick={() => { }}
                >
                    <SearchSvg />
                </span>
            </div>

            {/* RESULTS */}
            <ul className={cn("absolute top-full w-full custom-1:h-fit custom-1:max-h-96 h-[500px] overflow-auto custom-search-results-scrollbar z-[51] bg-white border border-primary p-5 mt-3 rounded-md hidden", (searchOpen && searchedProducts.data?.length > 0 && search) && "block")}>
                {
                    searchedProducts.data?.map(item => (
                        <li
                            key={item.id}
                            className="border-b last:border-none group hover:bg-lightgray"
                            onClick={() => {
                                setSearch("");
                                setSearchOpen(false)
                            }}
                        >
                            <Link
                                href={`/products/view/${item.id}`}
                                className="flex items-center gap-5 p-2"
                            >
                                <Image
                                    src={item.photos[0].source}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                    quality={100}
                                    placeholder="blur"
                                    blurDataURL="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2050%2050'%3E%3C/svg%3E"
                                    className="rounded-md object-cover"
                                />
                                <span className="group-hover:text-primary">{item.name}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

const SearchOverlay = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <div
            className={cn("fixed min-w-screen min-h-screen custom-1:bg-black/30 bg-white bg-blur-safari z-50 inset-0 transition-opacity duration-200 invisible opacity-0", open && "visible opacity-100")}
            onClick={() => setOpen(false)}
        />
    )
}

const CatalogMenu = ({ categories, open }: { categories: Category[], open: {katalog: boolean, sheet: boolean} }) => {
    const mouses = categories.find(item => item.slug === "sichqonchalar")
    const keyboards = categories.find(item => item.slug === "klaviaturalar")
    const headphones = categories.find(item => item.slug === "quloqchinlar")
    const combos = categories.find(item => item.slug === "kombolar")
    const presenters = categories.find(item => item.slug === "presenterlar")
    const cameras = categories.find(item => item.slug === "veb-kameralar")
    const accessories = categories.find(item => item.slug === "aksessuarlar")

    return (
        <div className={cn("container max-custom-1:hidden absolute top-full left-0 transition-all ease-in-out duration-150 invisible scale-90 opacity-90 w-full h-[536px] max-xl:h-[500px] pt-5 px-20 max-xl:px-5", open.katalog && "visible scale-100 opacity-100")}>
            <div className="flex gap-5 max-xl:gap-4 w-full h-full shadow-2xl rounded-xl backdrop-blur-lg bg-[#f4f4f4]/90 p-5 justify-center">
                <div className="flex flex-col gap-5 max-xl:gap-4 w-1/4 h-full">
                    <CategoryCard category={mouses} className="h-1/3 bg-gradient-to-b from-[#bfbfbf] to-white " imgClassName="h-5/6 p-4" key={keyboards?.id} />
                    <CategoryCard category={headphones} className="h-2/3 bg-gradient-to-b from-[#bbb] to-[#f8f8f8]" imgClassName="w-5/6 self-center h-full object-top -mt-7" key={headphones?.id} />
                </div>
                <div className="flex flex-col gap-5 max-xl:gap-4 w-[30%] h-full relative">
                    <CategoryCard category={combos} className="h-[58%] bg-gradient-to-b from-[#c3c3c3] to-[#f8f8f8]" imgClassName="h-4/5 pr-5 pb-5 object-right-bottom object-cover" key={mouses?.id} />
                    <CategoryCard category={keyboards} className="h-[42%] bg-gradient-to-b from-[#c0c0c0] to-white" imgClassName="h-2/3 pr-5 object-right-bottom object-cover" key={combos?.id} />
                </div>
                <div className="w-[21%] h-full">
                    <CategoryCard category={cameras} className="h-full bg-gradient-to-b from-[#cacaca] to-white" imgClassName="px-3 flex-1" key={cameras?.id} />
                </div>
                <div className="flex flex-col gap-5 max-xl:gap-4 w-[17%] h-full">
                    <CategoryCard category={accessories} className="h-1/3 bg-gradient-to-b from-black to-[#666] text-white hover:text-black hover:via-gray" imgClassName="h-5/6" key={accessories?.id} />
                    <CategoryCard category={presenters} className="h-2/3 bg-gradient-to-b from-[#ececec] via-[#cbcbcb] to-[#101010] text-white hover:text-black hover:from-gray" imgClassName="flex-1 px-4 max-xl:px-2" key={presenters?.id} />
                </div>
            </div>
        </div>
    )
}

const CategoryCard = ({ category, className, imgClassName }: { category: Category | any, className: string, imgClassName: string }) => {
    return (
        <div key={category.id} className={`${className} rounded-xl bg-white pb-4 shadow-2xl font-bold text-xl transition-transform duration-300 hover:scale-[1.04] hover:via-white overflow-hidden`}>
            <Link
                href={`/products/category/${category.slug}`}
                className="w-full h-full flex flex-col justify-end gap-1"
            >
                <Image
                    className={`${imgClassName} bg-center object-contain`}
                    src={category.icon}
                    alt={category.translations.uz.name}
                    width={400}
                    height={200}
                    quality={100}
                />
                <p className="h-fit text-center">{category.translations.uz.name}</p>
            </Link>
        </div>
    )
}