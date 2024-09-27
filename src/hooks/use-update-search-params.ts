import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

const useUpdateSearchParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateSearchParams = useCallback(
    (paramsToUpdate: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(paramsToUpdate).forEach(([name, value]) => {
        if (!value) params.delete(name); // delete search param if its value is equal to ""
        else params.set(name, value);
      });
      
      const newUrl = `${pathname}?${params.toString()}`
      router.push(newUrl, {scroll: false})
    },
    [router, pathname, searchParams]
  )

  const deleteSearchParam = (name: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    params.delete(name)

    const newUrl = `${pathname}?${params.toString()}`
    console.log(newUrl, "test")
    router.push(newUrl, {scroll: false})
  }

  return {updateSearchParams, deleteSearchParam}
}

export default useUpdateSearchParams
