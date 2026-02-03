
"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
    id: string
    name: string
    email: string
}

interface AuthContextType {
    user: User | null
    login: (email: string) => void
    signup: (name: string, email: string) => void
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false) // Simple check for now
    const router = useRouter()

    useEffect(() => {
        // Load from localStorage on mount
        const storedUser = localStorage.getItem("honeypot_user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
            setIsAuthenticated(true)
        }
    }, [])

    const login = (email: string) => {
        // Mock login - in real world would verify with backend
        // For prototype, we just find the user in "DB" (localStorage) or simulate success
        // Simplified: Just set the user if they match a "stored" user or mock it.
        // For this prototype, we'll assume successful Mock login if email is valid format.
        const mockUser = { id: "1", name: "User", email } // Replace with real lookup later

        // Simulate lookup
        const allUsers = JSON.parse(localStorage.getItem("honeypot_users_db") || "[]")
        const foundUser = allUsers.find((u: User) => u.email === email)

        if (foundUser) {
            setUser(foundUser)
            localStorage.setItem("honeypot_user", JSON.stringify(foundUser))
            setIsAuthenticated(true)
            router.push("/dashboard")
        } else {
            alert("User not found. Please sign up.")
        }
    }

    const signup = (name: string, email: string) => {
        const newUser = { id: crypto.randomUUID(), name, email }

        // Save to "DB"
        const allUsers = JSON.parse(localStorage.getItem("honeypot_users_db") || "[]")
        allUsers.push(newUser)
        localStorage.setItem("honeypot_users_db", JSON.stringify(allUsers))

        // Set session
        setUser(newUser)
        localStorage.setItem("honeypot_user", JSON.stringify(newUser))
        setIsAuthenticated(true)
        router.push("/dashboard")
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem("honeypot_user")
        router.push("/login")
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
