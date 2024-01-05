'use client'
import auth from "@/services/auth";

export function login(email: string, password: string, output: Output<void>): void {
    auth.login(email, password, {
        onSuccess: function (token: string): void {
            localStorage.setItem("user", token);
            output.onSuccess()
        },
        onError: function (err: any): void {
            output.onError(err)
        }
    })
}

export function isLoggedIn() {
    return localStorage.getItem("user")
}

export function getToken() {
    const userData = localStorage.getItem("user")
    const data = JSON.parse(userData||"{}")
    
    return data.access_token||""
}

export function logout(output: Output<void>) {
    localStorage.removeItem("user")
    output.onSuccess()
}