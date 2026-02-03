
"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

interface AuthFormProps {
    type: "login" | "signup"
}

export function AuthForm({ type }: AuthFormProps) {
    const { login, signup } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("") // Not processed in mock but good for UI
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (type === "signup") {
            signup(name, email)
        } else {
            login(email)
        }

        setIsLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
            {type === "signup" && (
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">Full Name</label>
                    <input
                        type="text"
                        required
                        placeholder="John Doe"
                        name="name"
                        autoComplete="name"
                        className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            )}

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">Email Address</label>
                <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    name="email"
                    autoComplete="email"
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">Password</label>
                <input
                    type="password"
                    required
                    placeholder="••••••••"
                    name="password"
                    autoComplete={type === "signup" ? "new-password" : "current-password"}
                    className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {type === "signup" && <p className="text-xs text-slate-400">Must be at least 8 characters</p>}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className={cn(
                    "w-full p-3 rounded-lg font-bold text-slate-900 transition-all transform active:scale-95",
                    isLoading ? "bg-slate-500 cursor-not-allowed" : "bg-sky-400 hover:bg-sky-300 hover:shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                )}
            >
                {isLoading ? "Processing..." : type === "signup" ? "Create Account" : "Secure Login"}
            </button>
        </form>
    )
}
