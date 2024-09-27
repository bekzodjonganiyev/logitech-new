import * as React from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Rating } from "@smastrom/react-rating"
import { z } from "zod"

import '@smastrom/react-rating/style.css'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet"

import { useMediaQuery } from "@/hooks/use-media-query"
import { useCartStore } from "@/store/cart-store"
import { useCurrencyStore } from "@/store/currency-store"
import { priceFormatter } from "@/lib/price-formatter"
import { getDictionaryObject } from "@/lib/dictionary"
import { useLanguageStore } from "@/store/lang-store"

import { Product } from "@/types/models/product.model"

const addToCart = (a: any) => useCartStore.getState().addToCart(a)

export function SelectProductVariantModal({ open, setOpen }: { open: { state: boolean, product: any }, setOpen: React.Dispatch<React.SetStateAction<{ state: boolean, product: any }>> }) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const { lang } = useLanguageStore()
    const { productCard } = getDictionaryObject(lang)

    if (isDesktop) {
        return (
            <Dialog open={open.state} onOpenChange={(state) => setOpen({ state: state, product: open.product })}>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>{productCard.cartModal.title}</DialogTitle>
                        <DialogDescription>
                            {productCard.cartModal.description}
                        </DialogDescription>
                    </DialogHeader>
                    <RadioGroupForm product={open.product} />
                </DialogContent>
            </Dialog>
        )
    }



    return (
        <Sheet open={open.state} onOpenChange={(state) => setOpen({ state: state, product: open.product })}>
            <SheetContent className="" side={"bottom"}>
                <SheetHeader className="text-left">
                    <SheetTitle className="text-center">{productCard.cartModal.title}</SheetTitle>
                    <SheetDescription className="text-center">
                        {productCard.cartModal.description}
                    </SheetDescription>
                </SheetHeader>
                <div className="py-10 px-5">
                    <RadioGroupForm product={open.product} />
                </div>
            </SheetContent>
        </Sheet>
    )
}


function RadioGroupForm({ product }: { product: Product }) {
    const { lang } = useLanguageStore()
    const { productCard } = getDictionaryObject(lang)

    const totalQty = product.colors?.reduce((acc: any, color: any) => acc + color.quantity, 0)

    const currency = useCurrencyStore(state => state.currency)

    const [selectedColor, setSelectedColor] = React.useState({ id: 0, name: "", value: "", qty: totalQty })
    const [photoSrc, setPhotoSrc] = React.useState({ selectedPhotoId: 0, url: product.photos[0].source })

    const FormSchema = z.object({
        productColor: z.number({
            required_error: `${productCard.cartModal.colorValidateError}`
        })
    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const photoSrc = product?.photos.find(photo => photo.color === selectedColor.name)?.source

        const shouldAddItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: photoSrc,
            color: selectedColor,
            qty: 1,
            skuId: `${product.id}-${selectedColor.id}`,
            rating: product.rating
        }

        addToCart(shouldAddItem)
    }

    const radioInput = (isMob: boolean) => <>
        <p className="">{productCard.cartModal.color}</p>

        <FormField
            control={form.control}
            name="productColor"
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormControl >
                            <div className="flex flex-wrap gap-2">
                                {product.colors?.map(
                                    (item: Product["colors"][0]) => (
                                        <React.Fragment key={item.id}>
                                            <input
                                                type="radio"
                                                name="color"
                                                id={`color-${item.value}-${isMob ? "mob" : "desk"}`}
                                                onChange={() => {
                                                    const photoSrc = product.photos.find(photo => photo.color === item.name)

                                                    setPhotoSrc({ selectedPhotoId: item.id, url: photoSrc?.source as string })


                                                    field.onChange(item.id)
                                                    setSelectedColor({ id: item.id, name: item.name, qty: item.quantity, value: item.value })

                                                }}
                                                value={field.value}
                                                className="hidden"
                                            />
                                            <label htmlFor={`color-${item.value}-${isMob ? "mob" : "desk"}`} className="rounded-md p-[2px] border-[1.5px] border-dashed border-darkgray flex items-center justify-center">
                                                <i className="max-[400px]:w-6 w-8 max-[400px]:h-6 h-8 rounded-md block" style={{ background: item.value }} />
                                            </label>
                                        </React.Fragment>
                                    )
                                )}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />

        <p className="min-w-fit text-xs text-stockcolor my-3">{productCard.cartModal.inStockCount.replace("{{count}}", `${selectedColor.qty}`)}</p>
    </>

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex items-start max-md:gap-3 gap-5">
                    <Image
                        src={photoSrc.url}
                        alt={product.name}
                        width={300}
                        height={400}
                        className="rounded-lg max-[400px]:w-16 max-md:w-32 w-44 max-[400px]:h-20 max-md:h-44 h-64 object-fit"
                    />

                    <div>
                        <h2 className="max-[400px]:text-sm text-lg font-semibold leading-4">{product.name}</h2>

                        <Rating
                            style={{ maxWidth: 90 }}
                            value={product.rating}
                            readOnly
                            orientation='horizontal'
                            className="max-[400px]:mt-1 mt-5"
                        />

                        <p className="font-semibold max-[400px]:text-sm text-lg max-[400px]:my-1 my-3">{currency.name} {priceFormatter(product.price * currency.rate, currency.name === "UZS")}</p>

                        <div className="max-md:hidden">
                            {radioInput(true)}
                        </div>

                    </div>
                </div>

                <div className="md:hidden">
                    {radioInput(false)}
                </div>

                <button className='bg-primary max-md:w-full  block mx-auto px-4 py-2 rounded-lg text-white' type="submit">{productCard.addToCart}</button>
            </form>
        </Form>
    )
}