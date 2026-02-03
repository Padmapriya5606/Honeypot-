
"use client"

import { Globe, Shield, Zap, Activity, Database, Server, Cpu, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { cn } from "@/lib/utils"

export default function NetworkStatusPage() {
    const { t } = useLanguage()

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 pt-32 px-4 md:px-8 pb-20 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] -z-10" />
            <div className="absolute inset-0 bg-grid opacity-10 -z-20" />

            <div className="max-w-7xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 flex items-center justify-center gap-4">
                        <Globe className="w-10 h-10 text-sky-400 animate-spin-slow" />
                        {t("grid_status")}
                    </h1>
                    <p className="text-slate-500 font-mono text-sm uppercase tracking-[0.3em]">{t("uptime")}</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Status Panel */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl">
                            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                                <Activity className="w-5 h-5 text-emerald-400" />
                                {t("nodes_operational")}
                            </h2>

                            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                                {[...Array(32)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.02 }}
                                        className={cn(
                                            "aspect-square rounded-lg flex items-center justify-center relative group backdrop-blur-md border",
                                            i % 7 === 0 ? "bg-rose-500/10 border-rose-500/30" : i % 4 === 0 ? "bg-amber-500/10 border-amber-500/30" : "bg-sky-500/10 border-sky-500/30"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            i % 7 === 0 ? "bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.8)]" :
                                                i % 4 === 0 ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]" :
                                                    "bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                                        )} />
                                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-950 border border-white/10 rounded text-[8px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                                            TRAP_ID_{i.toString().padStart(3, '0')} ({i % 7 === 0 ? "INTERCEPTING" : i % 4 === 0 ? "ANALYZING" : "DECEIVING"})
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900/30 border border-white/5 rounded-3xl p-8">
                            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                                <Server className="w-5 h-5 text-sky-400" />
                                {t("infra_title")}
                            </h2>
                            <div className="space-y-6">
                                <ResourceBar label="Neural compute" value={84} color="sky" />
                                <ResourceBar label="Behavioral analysis" value={62} color="indigo" />
                                <ResourceBar label="Proxy mitigation" value={41} color="purple" />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Stats */}
                    <div className="space-y-8">
                        <div className="bg-slate-950/50 border border-white/5 rounded-3xl p-8 shadow-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-3 bg-sky-500/10 rounded-2xl border border-sky-500/20">
                                    <Cpu className="w-6 h-6 text-sky-400" />
                                </div>
                                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">HEALTHY</span>
                            </div>
                            <div className="text-4xl font-black text-white mb-2">10ms</div>
                            <div className="text-xs font-bold text-slate-600 uppercase tracking-widest">System Latency</div>
                        </div>

                        <div className="bg-slate-950/50 border border-white/5 rounded-3xl p-8 shadow-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                                    <Lock className="w-6 h-6 text-rose-500" />
                                </div>
                                <span className="text-[10px] font-mono text-slate-500">ENCRYPTED</span>
                            </div>
                            <div className="text-4xl font-black text-white mb-2">3200+</div>
                            <div className="text-xs font-bold text-slate-600 uppercase tracking-widest">Active Defenses</div>
                        </div>

                        <div className="p-8 bg-sky-500 rounded-3xl text-slate-950 shadow-[0_20px_40px_rgba(14,165,233,0.3)]">
                            <Zap className="w-10 h-10 mb-6 fill-slate-950" />
                            <h3 className="text-2xl font-black mb-2">Scale the Grid</h3>
                            <p className="text-sm font-bold opacity-80 mb-6 group-hover:opacity-100 transition-opacity">Deploy extra nodes to increase monitoring capacity in your region.</p>
                            <button className="w-full bg-slate-950 text-white py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform">Get Started</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

function ResourceBar({ label, value, color }: any) {
    const colors = {
        sky: "bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.4)]",
        indigo: "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]",
        purple: "bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    }
    return (
        <div className="space-y-3">
            <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-500">
                <span>{label}</span>
                <span className="text-white">{value}%</span>
            </div>
            <div className="h-4 bg-slate-950 rounded-full overflow-hidden p-1 border border-white/5">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1 }}
                    className={cn("h-full rounded-full transition-all", colors[color as keyof typeof colors])}
                />
            </div>
        </div>
    )
}
