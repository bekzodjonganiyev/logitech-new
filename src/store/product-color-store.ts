'use client'

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type ProductColor = {
    selectedColor: { id: number, name: string, value: string, qty: number },
    setSelectedColor: Dispatch<SetStateAction<{ id: number, name: string, value: string, qty: number }>>
}

export const ProductColorContext = createContext({} as ProductColor);

export const useProductColorContext = () => useContext(ProductColorContext)




