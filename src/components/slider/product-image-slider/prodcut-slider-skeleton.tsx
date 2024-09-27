import { cn } from "@/lib/utils"

export const ImagesSkeleton = ({ loaded = false }: { loaded: boolean }) => {
    return <span className={cn("absolute inset-0 z-10 w-full h-full bg-slate-100 flex items-center justify-center transition-all duration-500 opacity-100", loaded && "invisible opacity-0")}></span>
}

export const ThunbnailSkelen = ({ loaded = false }: { loaded: boolean }) => {
    return <span className={cn("absolute inset-0 z-10 w-full h-full bg-slate-100 flex flex-col items-center justify-evenly transition-all duration-500 opacity-100 rounded-md", loaded && "invisible opacity-0")}>
        <span className="text-sx bg-white w-full h-5"></span>
        <span className="text-sx bg-white w-full h-5"></span>
    </span>
}