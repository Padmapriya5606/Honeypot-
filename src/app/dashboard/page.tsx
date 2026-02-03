
"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useLanguage } from "@/context/LanguageContext"
import { useRouter } from "next/navigation"
import { Shield, MessageSquare, AlertTriangle, Ban, ArrowRight, Activity, Globe, Zap, Database } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ThreatMap } from "@/components/ThreatMap"
import { EducationHub } from "@/components/EducationHub"

export default function DashboardPage() {
    const { user, isAuthenticated } = useAuth()
    const { t } = useLanguage()
    const router = useRouter()

    const [stats, setStats] = useState({
        analyzed: 12,
        detected: 8,
        blocked: 5
    })

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, router])

    if (!user) return null

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8 pt-40 relative overflow-hidden font-sans">

            {/* Background Ambience */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-sky-500/5 rounded-full blur-[140px] -z-10 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[140px] -z-10 animate-pulse delay-1000" />
            <div className="absolute inset-0 bg-grid opacity-10 -z-20" />

            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 max-w-7xl mx-auto relative z-40">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Shield className="w-6 h-6 text-sky-400" />
                        {t("deployment_hub")}
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-mono text-[10px]">
                        Security Token: <span className="text-sky-400">{user.id.slice(0, 12)}</span>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/5 text-[10px] uppercase font-mono text-slate-500">
                        <Database className="w-3 h-3" /> Integrity: Verified
                    </div>
                </div>
            </header>

            {/* Main Grid: SOC Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">

                {/* Left Col */}
                <div className="lg:col-span-8 flex flex-col gap-8">

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard
                            icon={<MessageSquare className="w-5 h-5 text-sky-400" />}
                            label={t("global_scans")}
                            value={stats.analyzed}
                            trend="+14% Active"
                            delay={0}
                        />
                        <StatCard
                            icon={<AlertTriangle className="w-5 h-5 text-orange-400" />}
                            label={t("scams_deflected")}
                            value={stats.detected}
                            trend="99.2% Succ."
                            color="orange"
                            delay={0.1}
                        />
                        <StatCard
                            icon={<Ban className="w-5 h-5 text-rose-500" />}
                            label={t("malicious_ips")}
                            value={stats.blocked}
                            trend="Firewall Up"
                            color="red"
                            delay={0.2}
                        />
                    </div>

                    {/* Map Section */}
                    <div className="relative group bg-slate-900/50 rounded-2xl border border-white/5 overflow-hidden shadow-2xl backdrop-blur-xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
                        <ThreatMap />
                    </div>

                    {/* Recent Analysis Feed */}
                    <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-sky-400" /> {t("active_logs")}
                        </h3>
                        <div className="space-y-4">
                            <ActivityItem
                                type="scam"
                                title="UPI Phishing Attempt"
                                detail="Source: API-Gateway #902"
                                risk="98%"
                                status="Neutralized"
                            />
                            <ActivityItem
                                type="safe"
                                title="Transactional SMS"
                                detail="Vendor: AWS-SES-Internal"
                                risk="0%"
                                status="Verified"
                            />
                            <ActivityItem
                                type="scam"
                                title="WhatsApp Job Scam"
                                detail="Source: P2P Tunneling"
                                risk="82%"
                                status="Isolated"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Col */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    {/* Main CTA */}
                    <div className="bg-gradient-to-br from-sky-600 to-indigo-800 rounded-[40px] p-10 text-center shadow-2xl shadow-sky-900/40 relative overflow-hidden group border border-white/10">
                        <div className="absolute inset-0 bg-grid opacity-20 -z-10"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

                        <div className="p-5 bg-white/10 rounded-3xl w-fit mx-auto mb-8 backdrop-blur-md border border-white/20 shadow-inner">
                            <Shield className="w-12 h-12 text-white" />
                        </div>

                        <h2 className="text-3xl font-black text-white mb-4 leading-tight">{t("scan_suspicious")}</h2>
                        <p className="text-sky-100/70 text-sm mb-10 leading-relaxed">{t("deploy_desc")}</p>
                        <button
                            onClick={() => router.push("/analyze")}
                            className="w-full bg-white text-sky-900 font-black py-5 rounded-2xl hover:bg-sky-50 transition-all shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center gap-3 transform group-hover:translate-y-[-6px] border-b-8 border-slate-200 active:translate-y-0 active:border-b-0 pb-btn-premium"
                        >
                            {t("deploy_agent")} <ArrowRight className="w-6 h-6" />
                        </button>
                    </div>

                    <EducationHub />
                </div>

            </div>

            {/* GIANT FLOATING SCAN BUTTON */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-xs px-4">
                <button
                    onClick={() => router.push("/analyze")}
                    className="w-full bg-sky-400 hover:bg-sky-300 text-slate-950 px-8 py-6 rounded-3xl font-black text-2xl transition-all shadow-[0_0_60px_rgba(56,189,248,0.6)] flex items-center justify-center gap-4 transform hover:scale-105 active:scale-95 border-b-8 border-sky-600 pb-btn-premium ring-4 ring-sky-500/30"
                >
                    <Zap className="w-8 h-8 fill-slate-950 animate-bounce" />
                    <span>{t("initiate_scan")}</span>
                </button>
            </div>
        </div>
    )
}

function StatCard({ icon, label, value, trend, color = "sky", delay }: any) {
    const colorStyles = {
        sky: "bg-slate-900/50 border-sky-500/10 hover:border-sky-500/30",
        orange: "bg-orange-500/5 border-orange-500/10 hover:border-orange-500/30",
        red: "bg-rose-500/5 border-rose-500/10 hover:border-rose-500/30",
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.4 }}
            className={cn("p-6 rounded-2xl border backdrop-blur-md transition-all cursor-default relative overflow-hidden group", colorStyles[color as keyof typeof colorStyles])}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-slate-950 rounded-xl group-hover:scale-110 transition-transform shadow-inner border border-white/5">{icon}</div>
                <span className="text-[10px] font-mono tracking-tighter opacity-40 bg-white/5 px-2 py-1 rounded text-white">{trend}</span>
            </div>
            <div className="text-4xl font-black mb-1 text-white">{value}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</div>
        </motion.div>
    )
}

function ActivityItem({ type, title, detail, risk, status }: any) {
    return (
        <div className="flex items-center justify-between p-4 bg-slate-950/40 border border-white/5 rounded-2xl hover:bg-slate-900/60 transition-all group">
            <div className="flex items-center gap-4">
                <div className={cn("w-3 h-3 rounded-full", type === "scam" ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" : "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]")} />
                <div>
                    <div className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors">{title}</div>
                    <div className="text-xs text-slate-500 font-mono">{detail}</div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-[10px] uppercase font-bold text-slate-600 tracking-widest hidden md:block">{status}</div>
                <div className={cn("text-xs font-mono font-bold px-3 py-1 rounded-lg border",
                    type === "scam" ? "text-rose-400 bg-rose-500/5 border-rose-500/10" : "text-emerald-400 bg-emerald-500/5 border-emerald-500/10"
                )}>
                    {risk}
                </div>
            </div>
        </div>
    )
}
