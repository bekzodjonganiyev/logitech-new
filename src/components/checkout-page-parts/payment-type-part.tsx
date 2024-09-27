import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { ClickSvg, PaymeSvg, SuccessIcon } from '../icons'
import { OnlinePaymentTypeModal } from '../responsive-modal/online-payment-type'

import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'
import { cn } from '@/lib/utils'

export const PaymentTypePart = () => {
    const { lang } = useLanguageStore()
    const { checkoutPage } = getDictionaryObject(lang)
    const form = useFormContext()

    const { watch } = form

    const paymentType = watch("payment_type")

    return (
        <>
            <div className='flex items-center gap-2 mb-5'>
                <p className='custom-1:text-xl text-lg flex items-center'><span className='bg-primary w-6 h-6 mr-2 flex items-center justify-center font-semibold text-white'>3</span>{checkoutPage.form.paymentType.title}</p>
                <span className='border border-dashed flex-1'></span>
            </div>

            <FormField
                control={form.control}
                name="payment_type"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <RadioGroup
                                onValueChange={(e) => {
                                    field.onChange(e)
                                }}
                                defaultValue={field.value}
                                className="flex gap-5"
                            >
                                <FormItem className={cn('space-y-0 w-44 h-16 flex items-center justify-center rounded-btn border-2 cursor-pointer', (paymentType === "P" || paymentType === "C") && "border-primary")}>
                                    <FormControl>
                                        <RadioGroupItem value="P" className='hidden' />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer">
                                        {checkoutPage.form.paymentType.payOnline}
                                    </FormLabel>
                                </FormItem>

                                <FormItem className={cn('space-y-0 w-44 h-16 flex items-center justify-center rounded-btn border-2 cursor-pointer', paymentType === "N" && "border-primary")} >
                                    <FormControl>
                                        <RadioGroupItem value="N" className='hidden' />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer">
                                        {checkoutPage.form.paymentType.payOffline}
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <>
                {
                    paymentType === "N"
                        ? <div className='flex items-center gap-3 bg-lightgray p-2 rounded-lg my-5'>
                            <span><SuccessIcon /></span>
                            <span className='max-lg:leading-4'>{checkoutPage.form.paymentType.cash}</span>
                        </div>
                        : <div className='flex items-center justify-between gap-2 bg-lightgray p-2 rounded-lg my-5'>
                            {
                                paymentType === "C"
                                    ? <span className='flex items-center gap-2'><ClickSvg className='min-w-[70px]' /><span className='-mb-[2px] max-lg:leading-4'>{checkoutPage.form.paymentType.click}</span></span>
                                    : <span className='flex items-center gap-2'><PaymeSvg /><span className='-mb-[2px] max-lg:leading-4'>{checkoutPage.form.paymentType.payme}</span></span>
                            }

                            <OnlinePaymentTypeModal />
                        </div>
                }
            </>
        </>
    )
}

<>
    <div className='flex items-center gap-3 bg-lightgray p-2 rounded-lg my-5'>
        <span><SuccessIcon /></span>
        <span className='max-lg:leading-4'>Naqd pul yoki karta orqali olingandan keyin to&apos;lash mumkin</span>
    </div>

    <div className='flex items-center justify-between gap-2 bg-lightgray p-2 rounded-lg my-5'>
        <span className='flex items-center gap-2'><ClickSvg className='min-w-[70px]' /><span className='-mb-[2px] max-lg:leading-4'>Biz Click orqali to&apos;lov hisobini yuboramiz</span></span>
    </div>

    <div className='flex items-center justify-between gap-2 bg-lightgray p-2 rounded-lg my-5'>
        <span className='flex items-center gap-2'><PaymeSvg /><span className='-mb-[2px] max-lg:leading-4'>Biz Payme orqali to&apos;lov hisobini yuboramiz</span></span>
    </div>
</>