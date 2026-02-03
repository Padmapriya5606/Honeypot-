
"use client"

import { Shield, Target, Zap, Users, ShieldCheck, Globe, Lock } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"

export default function AboutPage() {
    const { t } = useLanguage()

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 pt-28 px-4 md:px-8 pb-20 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] -z-10" />
            <div className="absolute inset-0 bg-grid opacity-10 -z-20" />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-4 bg-sky-500/10 rounded-2xl border border-sky-500/20 mb-6">
                        <Shield className="w-12 h-12 text-sky-400" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">{t("mission_title_main")}</h1>
                    <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                        {t("mission_desc_main")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <AboutCard
                        icon={<Target className="w-6 h-6 text-sky-400" />}
                        title={t("our_mission")}
                        desc={t("mission_desc_card")}
                    />
                    <AboutCard
                        icon={<Zap className="w-6 h-6 text-indigo-400" />}
                        title={t("tech_title")}
                        desc={t("tech_desc")}
                    />
                    <AboutCard
                        icon={<Users className="w-6 h-6 text-emerald-400" />}
                        title={t("comm_title")}
                        desc={t("comm_desc")}
                    />
                    <AboutCard
                        icon={<ShieldCheck className="w-6 h-6 text-rose-500" />}
                        title={t("ethical_title")}
                        desc={t("ethical_desc")}
                    />
                </div>

                <div className="bg-slate-900/50 border border-white/5 rounded-[40px] p-10 md:p-16 relative overflow-hidden text-center">
                    <div className="absolute inset-0 bg-grid opacity-20 -z-10" />
                    <h2 className="text-3xl font-bold mb-8">{t("protection_grid_active")}</h2>
                    <div className="flex flex-wrap justify-center gap-12 mt-12">
                        <Stat icon={<Globe className="w-5 h-5 text-sky-400" />} label="Regions Covered" value="Global" />
                        <Stat icon={<Lock className="w-5 h-5 text-indigo-400" />} label="Security Protocol" value="AES-256" />
                        <Stat icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />} label="Status" value="Nominal" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function AboutCard({ icon, title, desc }: any) {
    return (
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-sky-500/30 transition-all group backdrop-blur-xl">
            <div className="mb-6 p-4 bg-slate-950 rounded-2xl w-fit group-hover:scale-110 transition-transform shadow-inner border border-white/5">{icon}</div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
        </div>
    )
}

function Stat({ icon, label, value }: any) {
    return (
        <div className="flex flex-col items-center">
            <div className="mb-3 text-slate-500">{icon}</div>
            <div className="text-2xl font-black text-white">{value}</div>
            <div className="text-[10px] uppercase font-bold text-slate-600 tracking-widest">{label}</div>
        </div>
    )
}
