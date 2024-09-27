import { GeistSans } from "geist/font/sans"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from 'sonner';

import { GenericModal } from "@/components/responsive-modal/generic-modal";
import ReactQueryProviders from "@/lib/provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <head>
                <title>Logitech Official Store</title>
            </head>
            <body className={`${GeistSans.className} flex flex-col min-h-screen min-w-[400px]`}>
                <ReactQueryProviders>{children}</ReactQueryProviders>
                <Toaster />
                <SonnerToaster richColors />
                <GenericModal />
            </body>
        </html>
    )
}

export default Layout