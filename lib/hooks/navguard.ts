'use client'

import { isLoggedIn, getProfile} from "@/lib/commands/login"
import { redirect } from "next/navigation"

export function navigationGuard(path: string) {
    const loggedInStatus = isLoggedIn()
    const userProfile = getProfile()
    if(!loggedInStatus && path !== '/login') {
        redirect("/login")
    } else if(loggedInStatus && path === '/login') {
        redirect("/")
    } else if(loggedInStatus && !userProfile) {
        console.log("Redirect to update profile page")
    }
}
