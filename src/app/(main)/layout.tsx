"use client"

import type { Viewport } from 'next'
import { useEffect, useState } from 'react';

import { MainHeader, SubHeader, TopHeader } from '@/components/header'
import { Footer, BottomNav } from "@/components/footer"

import "@/styles/globals.css";

import { publicFetch } from '@/lib/requests';
import { Category } from '@/types/models/category.model';

type CategoriesStateType = { loading: boolean, error: unknown, data: Category[] }

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const fetchCategories = publicFetch<CategoriesStateType>(false)

    const [categories, setCategories] = useState<CategoriesStateType>({ loading: false, error: false, data: [] })

    useEffect(() => {
        fetchCategories("/product/categories/", setCategories)
    }, [])
    
    return (
        <>
            <TopHeader />
            <MainHeader categories={categories.data} />
            <SubHeader />
            <main className='flex-1 mb-10 mt-5'>{children}</main>
            <Footer />
            <BottomNav />
        </>
    )
}

export default RootLayout
