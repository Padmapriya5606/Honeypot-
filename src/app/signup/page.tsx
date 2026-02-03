
"use client"

import { AuthForm } from "@/components/AuthForm"

export default function SignupPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-background">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute top-10 right-10 w-40 h-40 bg-sky-500/10 rounded-full blur-xl" />

            <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10 glass">
                <div className="flex flex-col items-center mb-8">
                    <div className="p-3 bg-red-500/10 rounded-full mb-4 ring-1 ring-red-500/30">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Create Account</h1>
                    <p className="text-slate-400 mt-2 text-center">Join the network to protect against scams with AI.</p>
                </div>

                <AuthForm type="signup" />

                <div className="mt-6 text-center">
                    <p className="text-slate-500 text-sm">
                        Already have an account?{" "}
                        <a href="/login" className="text-sky-400 hover:text-sky-300 font-semibold hover:underline transition-all">Log in</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
