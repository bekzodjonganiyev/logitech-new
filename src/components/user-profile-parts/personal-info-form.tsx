"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ReactInputMask from "react-input-mask"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui"

import { cn } from "@/lib/utils"
import { useLanguageStore } from "@/store/lang-store"
import { getDictionaryObject } from "@/lib/dictionary"

const FormSchema = z.object({
    first_name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    last_name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    phone: z.string().length(19, {
        message: "Telefon raqam majburiy"
    }),
    date: z.string().optional(),
    gender: z.string().optional()
})

type UserData = {
    defaults: {
        first_name: string
        last_name: string
        email: string
        phone: string
        date?: string
        gender?: string
    }
}

const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, '+998 ($2) $3-$4-$5');
  };

export const PersonalInfoForm = ({ defaults }: UserData) => {
    const { lang } = useLanguageStore()
    const { profilePage } = getDictionaryObject(lang)

    const [ editMode, setEditMode ] = useState(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            ...defaults,
            phone: formatPhoneNumber(defaults.phone)
        },
        shouldFocusError: true
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        data.phone = data.phone.replaceAll(" ", "").replaceAll("-", "").replace("(", "").replace(")", "")

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="w-full flex gap-6">
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel className="relative">{profilePage.personalInfo.name} <span className="absolute top-0 left-full text-red-600 text-lg leading-none">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder={profilePage.personalInfo.name} className={cn("py-6 focus-visible:ring-primary rounded-lg border-none", "bg-lightgray")} {...field} />
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
                                <FormLabel className="relative">{profilePage.personalInfo.surname}<span className="absolute top-0 left-full text-red-600 text-lg leading-none">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder={profilePage.personalInfo.surname} className={cn("py-6 focus-visible:ring-primary rounded-lg border-none", "bg-lightgray")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="w-full flex gap-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel className="relative">{profilePage.personalInfo.email}<span className="absolute top-0 left-full text-red-600 text-lg leading-none">*</span></FormLabel>
                                <FormControl>
                                    <Input placeholder={profilePage.personalInfo.email} className={cn("py-6 focus-visible:ring-primary rounded-lg border-none", "bg-lightgray")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => {
                            console.log(field)
                            return (
                                <FormItem className="w-1/2">
                                    <FormLabel className="relative">{profilePage.personalInfo.phone}<span className="absolute top-0 left-full text-red-600 text-lg leading-none">*</span></FormLabel>
                                    <FormControl>
                                        <ReactInputMask
                                            className={cn("flex h-10 w-full rounded-md bg-background px-3 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50", "bg-lightgray focus-visible:ring-primary",
                                                "bg-lightgray"
                                            )}
                                            mask={""}
                                            maskChar={null}
                                            onChange={(e) => {
                                                field.onChange(e.target.value)
                                            }}
                                            defaultValue={field.value}
                                            placeholder="+998(__) ___ __ __"
                                            disabled

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />
                </div>

                <div className="w-full flex gap-6">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel>{profilePage.personalInfo.dob}</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder={profilePage.personalInfo.dob} className={cn("py-6 focus-visible:ring-primary rounded-lg border-none", "bg-lightgray")} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel>{profilePage.personalInfo.gender}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className={cn("py-6 focus:ring-primary border-none", "bg-lightgray")}>
                                            <SelectValue placeholder={profilePage.personalInfo.gender} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="erkak">Erkak</SelectItem>
                                        <SelectItem value="ayol">Ayol</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <button type="submit" className="px-4 py-2 rounded-md text-white font-medium bg-primary">{profilePage.personalInfo.edit}</button>
            </form>
        </Form>
    )
}
