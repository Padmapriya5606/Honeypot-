
"use client"

import { useAuth } from "@/hooks/useAuth"
import { useLanguage, Language } from "@/context/LanguageContext"
import { useRouter, usePathname } from "next/navigation"
import { Shield, Globe, Menu, X, User, LogOut, ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Navbar() {
    const { user, logout } = useAuth()
    const { lang, setLang, t } = useLanguage()
    const router = useRouter()
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [isLangOpen, setIsLangOpen] = useState(false)

    const isAuthPage = pathname === "/login" || pathname === "/signup"

    const languages = [
        { code: "en", label: "English" },
        { code: "ta", label: "தமிழ்" },
        { code: "hi", label: "हिन्दी" }
    ]

    return (
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => router.push("/")}
                    >
                        <Shield className="w-8 h-8 text-sky-500 group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-xl tracking-tight text-white">AI Honeypot</span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <NavLink href="/" label={t("home")} active={pathname === "/"} />
                        <NavLink href="/network-status" label={t("network")} active={pathname === "/network-status"} />
                        {user && <NavLink href="/dashboard" label={t("dashboard")} active={pathname === "/dashboard"} />}
                        <NavLink href="/about" label={t("about")} active={pathname === "/about"} />

                        {/* Language Selector */}
                        <div className="relative border-l border-white/10 pl-6 ml-2">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-bold text-sky-400 hover:border-sky-500/50 transition-all shadow-[0_0_10px_rgba(56,189,248,0.1)]"
                            >
                                <Globe className="w-3.5 h-3.5" />
                                {languages.find(l => l.code === lang)?.label}
                                <ChevronDown className={cn("w-3 h-3 transition-transform", isLangOpen && "rotate-180")} />
                            </button>

                            {isLangOpen && (
                                <div className="absolute top-12 right-0 w-32 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                                    {languages.map((l) => (
                                        <button
                                            key={l.code}
                                            onClick={() => {
                                                setLang(l.code as Language)
                                                setIsLangOpen(false)
                                            }}
                                            className={cn(
                                                "w-full px-4 py-2.5 text-left text-xs font-medium transition-colors hover:bg-sky-500/10",
                                                lang === l.code ? "text-sky-400 bg-sky-500/5" : "text-slate-400 hover:text-white"
                                            )}
                                        >
                                            {l.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {user ? (
                            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/5 shadow-inner">
                                        <User className="w-4 h-4 text-sky-400" />
                                    </div>
                                    <span className="font-medium truncate max-w-[80px]">{user.name}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="p-2 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg text-rose-400 hover:text-rose-300 transition-all border border-rose-500/20 hover:border-rose-500/40"
                                    title={t("logout")}
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            !isAuthPage && (
                                <div className="flex items-center gap-4 ml-4">
                                    <button onClick={() => router.push("/login")} className="text-slate-400 hover:text-white font-medium transition-colors">{t("login")}</button>
                                    <button onClick={() => router.push("/signup")} className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-5 py-2 rounded-lg font-bold transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]">{t("signup")}</button>
                                </div>
                            )
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        <button
                            onClick={() => setLang(lang === "en" ? "ta" : lang === "ta" ? "hi" : "en")}
                            className="p-2 rounded-lg bg-slate-900 border border-white/10 text-sky-400"
                        >
                            <Globe className="w-5 h-5" />
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 hover:text-white p-2">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-slate-900 border-b border-slate-800 animate-in slide-in-from-top-2 shadow-2xl">
                    <div className="px-4 pt-2 pb-3 space-y-1">
                        <MobileNavLink onClick={() => { router.push("/"); setIsOpen(false) }} label={t("home")} />
                        <MobileNavLink onClick={() => { router.push("/network-status"); setIsOpen(false) }} label={t("network")} />
                        {user && <MobileNavLink onClick={() => { router.push("/dashboard"); setIsOpen(false) }} label={t("dashboard")} />}
                        <MobileNavLink onClick={() => { router.push("/about"); setIsOpen(false) }} label={t("about")} />
                        <div className="py-2 grid grid-cols-3 gap-2">
                            {languages.map(l => (
                                <button
                                    key={l.code}
                                    onClick={() => { setLang(l.code as Language); setIsOpen(false) }}
                                    className={cn("text-[10px] py-2 rounded-lg border", lang === l.code ? "bg-sky-500/20 border-sky-500 text-sky-400" : "bg-slate-950 border-white/5 text-slate-500")}
                                >
                                    {l.label}
                                </button>
                            ))}
                        </div>
                        {!user && (
                            <>
                                <MobileNavLink onClick={() => { router.push("/login"); setIsOpen(false) }} label={t("login")} />
                                <MobileNavLink onClick={() => { router.push("/signup"); setIsOpen(false) }} label={t("signup")} />
                            </>
                        )}
                        {user && (
                            <button onClick={logout} className="block w-full text-left px-3 py-2 text-base font-medium text-red-400 hover:bg-red-500/5 rounded-md">
                                {t("logout")}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

function NavLink({ href, label, active }: { href: string, label: string, active: boolean }) {
    const router = useRouter()
    return (
        <button
            onClick={() => router.push(href)}
            className={cn(
                "text-sm font-medium transition-all hover:text-sky-400 relative py-1",
                active ? "text-sky-400" : "text-slate-400"
            )}
        >
            {label}
            {active && (
                <span className="absolute -bottom-5 left-0 w-full h-0.5 bg-sky-500 shadow-[0_0_15px_rgba(56,189,248,0.8)]" />
            )}
        </button>
    )
}

function MobileNavLink({ onClick, label }: { onClick: () => void, label: string }) {
    return (
        <button
            onClick={onClick}
            className="block w-full text-left px-3 py-2 text-base font-medium text-slate-300 hover:text-sky-400 hover:bg-slate-800 rounded-md"
        >
            {label}
        </button>
    )
}
