import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import InputMask from 'react-input-mask';
import { z } from "zod"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import Cookies from "js-cookie";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Input } from "../ui"
import { LoginSvg, PhoneNumberInputModalCloseIConSvg } from "../icons"
import { Label } from "../ui/label"

import { useMediaQuery } from "@/hooks/use-media-query"
import { sendCode, verifyCode, privateFetch } from "@/lib/actions";
import { cn } from "@/lib/utils"
import { useCartStore } from "@/store/cart-store";
import { privateFetch as clientSidePrivateFetch } from "@/lib/requests";
import { fetcher } from "@/lib/fetcher";
import { useLanguageStore } from "@/store/lang-store";
import { getDictionaryObject } from "@/lib/dictionary";

export function LoginModal() {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 640px)")
    const { lang } = useLanguageStore()
    const { header, loginModal } = getDictionaryObject(lang)

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="flex flex-col items-center gap-1 hover:text-primary text-[14px]">
                    <LoginSvg /> {header.mainHeader.login}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] sm:rounded-[25px] border-none shadow-none p-[30px] pb-[20px]" extraProp="bg-blur-safari" customCloseICon={<PhoneNumberInputModalCloseIConSvg className="absolute right-5 top-[32px]" />}>
                    <DialogHeader>
                        <DialogTitle className="text-[24px]">{loginModal.title}</DialogTitle>
                    </DialogHeader>
                    <PhoneNumberInputForm />
                </DialogContent>
            </Dialog>
        )
    }


    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger type="button" className="flex flex-col items-center gap-1 hover:text-primary text-[14px]">
                <LoginSvg /> {header.mainHeader.login}
            </SheetTrigger>
            <SheetContent className="" side={"top"}>
                <SheetHeader className="text-left">
                    <SheetTitle className="text-center text-[24px]">{loginModal.title}</SheetTitle>
                </SheetHeader>
                <div className="pb-10 px-5">
                    <PhoneNumberInputForm />
                </div>
            </SheetContent>
        </Sheet>
    )
}

type PhoneNumberInputFormProps = {
}



function PhoneNumberInputForm({ }: PhoneNumberInputFormProps) {
    const { carts, setAll } = useCartStore()
    const { lang } = useLanguageStore()
    const { loginModal } = getDictionaryObject(lang)

    const FormSchema = z.object({
        phone: z.string().length(19, {message: `${loginModal.phoneValidateError}`}),
    })
    const form = useForm<z.infer<typeof FormSchema>>({ resolver: zodResolver(FormSchema) })
    const { getValues } = form

    const [checked, setChecked] = React.useState(true)
    const [otp, setOtp] = React.useState({ value: "", show: false, error: false })
    const [__, setPostCarts] = React.useState<any>()

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        data.phone = data.phone.replaceAll(" ", "").replaceAll("-", "").replace("(", "").replace(")", "")

        setOtp({ ...otp, show: true })

        sendCode(data.phone)
    }

    const syncCartSeverSide = () => {
        const storedCartItem = carts.map(item => (
            {
                product: item.id,
                color: item.color.id,
                quantity: item.qty
            }
        ))

        storedCartItem.forEach(item => {
            const res = privateFetch("/market/cart/add/", { method: "POST", body: JSON.stringify(item) })
        })
    }
    const syncCartClientSide = () => {
        const postStoredCarts = clientSidePrivateFetch(false)

        const storedCartItem = carts.map(item => (
            {
                product: item.id,
                color: item.color.id,
                quantity: item.qty
            }
        ))

        storedCartItem.forEach(item => {
            postStoredCarts("/market/cart/add/", setPostCarts, { method: "POST", body: JSON.stringify(item) })
        })

    }

    const syncCartWithDb = async (setState: React.Dispatch<React.SetStateAction<any>>) => {
        const accessToken = Cookies.get("access")

        const res = await fetcher("/market/cart/", { headers: { "Authorization": `Bearer ${accessToken}`, } })

        if (res) {
            setState(res[0].products)
        }
    }

    React.useEffect(() => {
        async function virifyOtp() {
            if (otp.value.length === 6) {
                const formattedPhone = getValues("phone").replaceAll(" ", "").replaceAll("-", "").replace("(", "").replace(")", "")

                const res = await verifyCode(formattedPhone, otp.value)

                if (!res) {
                    setOtp({ ...otp, error: true })
                } else {
                    syncCartSeverSide()

                    setTimeout(() => {
                        syncCartWithDb(setAll)
                    }, 0);
                }
            }
        }

        virifyOtp()
    }, [otp.value, otp.error])

    return (
        <Form {...form} >
            <form
                onSubmit={form.handleSubmit(onSubmit)} className={cn("mt-5")}
                action={() => null}
            >
                <div className={cn(otp.show ? "hidden" : "block")}>
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormControl >
                                        <div className="flex flex-wrap gap-2">
                                            <Label className="text-[18px]">{loginModal.inputCode}</Label>
                                            <InputMask
                                                className={cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50", "bg-lightgray focus-visible:ring-primary")}
                                                mask="+\9\98 (99) 999-99-99"
                                                maskChar={null}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value)
                                                }}
                                                placeholder="+998(__) ___ __ __"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />

                    <div className="flex items-center gap-2 mb-6 mt-3">
                        <Label>
                            <Input
                                type="checkbox"
                                name="color"
                                id="phone"
                                onChange={() => setChecked(!checked)}
                                className="w-6 h-6 text-primary hidden"
                            />
                            <span className={cn("w-6 h-6 bg-lightgray border border-primary rounded-md flex items-center justify-center", checked && "bg-primary")}>
                                {
                                    checked && <svg xmlns="http://www.w3.org/2000/svg" width="19" height="13" viewBox="0 0 19 17" fill="none">
                                        <path d="M1.25 11.5L6.25 15.25L17.5 1.5" stroke="white" strokeWidth="2" />
                                    </svg>
                                }
                            </span>
                        </Label>
                        <p className="text-[15px]"><Link href="/pravicy-policy" className="text-primary">{loginModal.privacyTerms[0]}</Link> {loginModal.privacyTerms[1]}</p>
                    </div>

                    <button className={cn('w-full bg-primary block mx-auto px-4 py-2 rounded-lg text-white font-medium text-[18px]', !checked && "bg-gray")} disabled={!checked} type="submit">{loginModal.getCode}</button>

                </div>

                <div className={cn(otp.show ? "block" : "hidden")}>
                    <div className="mb-5">
                        <p className="text-center">{loginModal.codeSendedToGivenPhone}</p>
                        <div className="flex gap-2 justify-center"><b className="text-lg">{getValues("phone")}</b> <button type="button" className="text-primary text-sm" onClick={() => setOtp({ ...otp, show: false })}>{loginModal.changeNumber}</button></div>
                    </div>

                    <div>
                        <span className="mb-3 block max-md:text-center">{loginModal.phone}</span>
                        <div className="w-full flex items-center md:justify-between justify-center max-md:gap-3 mb-4">
                            <p className="text-[40px] leading-none -mb-2">L</p>
                            <span className="text-3xl -mb-2">-</span>
                            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} className="w-full" onChange={(e) => {
                                setOtp({ ...otp, value: e })
                            }}>
                                <InputOTPGroup className=" justify-between gap-3">
                                    <InputOTPSlot index={0} className={cn("bg-lightgray py-3 border-[0px] rounded-md h-10 w-10 shadow-none", otp.error && "border border-red-500")} />
                                    <InputOTPSlot index={1} className={cn("bg-lightgray py-3 border-[0px] rounded-md h-10 w-10 shadow-none", otp.error && "border border-red-500")} />
                                    <InputOTPSlot index={2} className={cn("bg-lightgray py-3 border-[0px] rounded-md h-10 w-10 shadow-none", otp.error && "border border-red-500")} />
                                    <InputOTPSlot index={3} className={cn("bg-lightgray py-3 border-[0px] rounded-md h-10 w-10 shadow-none", otp.error && "border border-red-500")} />
                                    <InputOTPSlot index={4} className={cn("bg-lightgray py-3 border-[0px] rounded-md h-10 w-10 shadow-none", otp.error && "border border-red-500")} />
                                    <InputOTPSlot index={5} className={cn("bg-lightgray py-3 border-[0px] rounded-md h-10 w-10 shadow-none", otp.error && "border border-red-500")} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                    </div>
                </div>

            </form>
        </Form>
    )
}