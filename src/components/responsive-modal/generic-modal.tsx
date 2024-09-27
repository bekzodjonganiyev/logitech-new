"use client"

import React, { ReactNode } from 'react'

import { useGenericModal } from '@/store/modal-store'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'

export const GenericModal = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const { open, setOpen, children, setChildren } = useGenericModal()

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                {/* <DialogTrigger asChild>
                    <button>Edit Profile</button>
                </DialogTrigger> */}
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            {/* <DrawerTrigger asChild>
                <button>Edit Profile</button>
            </DrawerTrigger> */}
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit profile</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DrawerDescription>
                </DrawerHeader>
                {children}
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <button>Cancel</button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

// export default GenericModal