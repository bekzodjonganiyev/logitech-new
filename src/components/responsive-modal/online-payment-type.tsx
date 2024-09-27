import * as React from "react"
import { useFormContext } from "react-hook-form"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { ClickSvg, PaymeSvg } from "../icons"

import { useMediaQuery } from "@/hooks/use-media-query"
import { useLanguageStore } from "@/store/lang-store"
import { getDictionaryObject } from "@/lib/dictionary"


export function OnlinePaymentTypeModal() {
    const { lang } = useLanguageStore()
    const { checkoutPage } = getDictionaryObject(lang)

    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <button type='button' className='bg-white px-4 py-2 text-sm rounded-2xl '>{checkoutPage.form.paymentType.changeOnlinePaymentType}</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{checkoutPage.form.paymentType.onlinePatmentModalTitle}</DialogTitle>
                    </DialogHeader>
                    <RadioGroupForm />
                </DialogContent>
            </Dialog>
        )
    }



    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger type="button" className='bg-white px-4 py-2 text-sm rounded-2xl'>
                {checkoutPage.form.paymentType.changeOnlinePaymentType}
            </SheetTrigger>
            <SheetContent className="" side={"bottom"}>
                <SheetHeader className="text-left">
                    <SheetTitle className="text-center">{checkoutPage.form.paymentType.onlinePatmentModalTitle}</SheetTitle>
                </SheetHeader>
                <div className="pb-10 px-5">
                    <RadioGroupForm />
                </div>
            </SheetContent>
        </Sheet>
    )
}


function RadioGroupForm() {
    const { lang } = useLanguageStore()
    const { checkoutPage } = getDictionaryObject(lang)

    const form = useFormContext()

    return (
        <Form {...form}>
            <FormField
                control={form.control}
                name="payment_type"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <FormLabel></FormLabel>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-1"
                            >
                                <FormItem className="flex items-center gap-3">
                                    <FormControl>
                                        <RadioGroupItem value="P" />
                                    </FormControl>
                                    <FormLabel className="font-normal flex items-center gap-2 cursor-pointer">
                                        <span><PaymeSvg /></span> ― {checkoutPage.form.paymentType.paymeOnModal}
                                    </FormLabel>
                                </FormItem>

                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value="C" />
                                    </FormControl>
                                    <FormLabel className="font-normal text-sm flex items-center gap-2 cursor-pointer">
                                        <span><ClickSvg /></span> ― {checkoutPage.form.paymentType.clickOnModal}
                                    </FormLabel>
                                </FormItem>

                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </Form>
    )
}