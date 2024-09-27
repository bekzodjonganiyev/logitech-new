import React from 'react'
import { useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui'

import { cn } from '@/lib/utils'
import { useLanguageStore } from '@/store/lang-store'
import { getDictionaryObject } from '@/lib/dictionary'

export const PersonalInfoPart = ({ phone }: { phone: string }) => {
    const form = useFormContext()
    const { lang } = useLanguageStore()
    const { checkoutPage, cartsPage } = getDictionaryObject(lang)  

    const formatPhoneNumber = (phone: string) => {
        return phone?.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, '+998 ($2) $3-$4-$5');
    };

    return (
        <>
            <div className='flex items-center gap-2 mb-5'>
                <p className='custom-1:text-xl text-lg flex items-center'><span className='bg-primary w-6 h-6 mr-2 flex items-center justify-center font-semibold text-white'>1</span>{checkoutPage.form.personalInfo}</p>
                <span className='border border-dashed flex-1'></span>
            </div>

            <div>
                <div className='flex gap-5 mb-5'>
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormControl>
                                    <Input placeholder="Ism" className={cn("py-6 focus-visible:ring-primary rounded-lg")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormControl>
                                    <Input placeholder="Familiya" className={cn("py-6 focus-visible:ring-primary rounded-lg")}  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <p className='w-full px-3 py-4 select-none cursor-not-allowed text-sm rounded-md bg-lightgray'>
                    {formatPhoneNumber(phone)}
                </p>
            </div>

            <br />
            <br />
        </>
    )
}
