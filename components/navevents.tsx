'use client'
 
import { useEffect } from 'react'
import { redirect, usePathname, useSearchParams} from 'next/navigation'
import { useRouter } from 'next/router'
import { navigationGuard } from '@/lib/hooks/navguard'
 
export function NavigationEvents() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
 
    useEffect(() => {
        navigationGuard(pathname)
    }, [pathname, searchParams])
 
  return null
}