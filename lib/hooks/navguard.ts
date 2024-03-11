'use client'

import { isLoggedIn } from "@/lib/commands/login"
import { redirect } from "next/navigation"

export function navigationGuard(path: string) {
    const loggedInStatus = isLoggedIn()
    if(!loggedInStatus && (path !== '/login' && path !== '/reset')) {
        redirect("/login")
    } else if(loggedInStatus && path === '/login') {
        redirect("/")
    } 
    // else if(loggedInStatus && !userProfile && path !== '/profile') {
    //     redirect("/profile")
    // }
}
