'use client'

import { redirect } from "next/navigation"

export function navigationGuard(path: string) {
    const token = localStorage.getItem('user')
    
    if(!token && path !== '/login') {
        redirect("/login")
    }
}
