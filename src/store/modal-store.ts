import { ReactNode } from 'react'
import { create } from 'zustand'

interface GenericModal {
    open: boolean
    setOpen: (open: boolean) => void

    extra: any
    setExtra: (param: any) => void

    children: ReactNode,
    setChildren: (children: ReactNode) => void
}

export const useGenericModal = create<GenericModal>()(
    (set) => ({
        open: false,
        setOpen: (open) => set((state) => ({ open: open })),

        extra: null,
        setExtra: (extra) => set((state) => ({ ...state, extra })),

        children: null,
        setChildren: (children) => set(state => ({ ...state, children }))
    })

)