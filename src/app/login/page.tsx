
"use client"

import { AuthForm } from "@/components/AuthForm"
import { ShieldAlert } from "lucide-react" // Assuming lucide-react is installed, if not I will just use text or SVG

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-background">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 -z-10" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-20 -left-20 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl" />

            <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10 glass">
                <div className="flex flex-col items-center mb-8">
                    <div className="p-3 bg-sky-500/10 rounded-full mb-4 ring-1 ring-sky-500/50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
                    <p className="text-slate-400 mt-2 text-center">Enter your credentials to access the secure honeypot system.</p>
                </div>

                <AuthForm type="login" />

                <div className="mt-6 text-center">
                    <p className="text-slate-500 text-sm">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-sky-400 hover:text-sky-300 font-semibold hover:underline transition-all">Sign up securely</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
