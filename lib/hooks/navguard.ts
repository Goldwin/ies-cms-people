'use client'

import { isLoggedIn } from "@/commands/auth/login"
import { redirect } from "next/navigation"

export function navigationGuard(path: string) {
    const loggedInStatus = isLoggedIn()

    if(!loggedInStatus && path !== '/login') {
        redirect("/login")
    } else if(loggedInStatus && path === '/login') {
        redirect("/")
    }
}
