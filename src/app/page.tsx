
"use client"

import { useLanguage } from "@/context/LanguageContext"
import { useRouter } from "next/navigation"
import { Shield, Lock, Activity, ArrowRight, Zap, Globe, ShieldAlert } from "lucide-react"
import { useState } from "react"
import { IntroAnimation } from "@/components/IntroAnimation"
import { AnimatePresence } from "framer-motion"

export default function LandingPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [showIntro, setShowIntro] = useState(true)

  if (showIntro) return <IntroAnimation onComplete={() => setShowIntro(false)} />

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col pt-16 font-sans relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-full h-[1000px] bg-gradient-to-b from-sky-900/10 to-transparent -z-10" />
      <div className="fixed -top-40 -right-40 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="fixed inset-0 bg-grid opacity-20 -z-20" />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto w-full py-20">

        <div className="flex items-center gap-2 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase font-bold px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5">{t("protection_grid_active")}</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_50px_rgba(56,189,248,0.4)]">
            {t("advanced_scam_detection")}
          </span>
        </h1>

        <p className="text-2xl text-slate-400 max-w-2xl mb-12 leading-relaxed font-medium">
          {t("hero_desc")}
        </p>

        <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto mb-24">
          <button
            onClick={() => router.push("/signup")}
            className="px-10 py-5 bg-sky-400 hover:bg-sky-300 text-slate-950 font-black rounded-2xl text-xl transition-all shadow-[0_20px_50px_rgba(56,189,248,0.4)] flex items-center justify-center gap-3 transform hover:-translate-y-2 border-b-8 border-sky-600 pb-btn-premium"
          >
            {t("start_trial")} <ArrowRight className="w-6 h-6" />
          </button>
          <button
            onClick={() => router.push("/analyze")}
            className="px-10 py-5 bg-slate-900 border-2 border-slate-800 hover:border-sky-500/50 text-white font-black rounded-2xl text-xl transition-all flex items-center justify-center gap-3 transform hover:-translate-y-2 group shadow-2xl pb-btn-premium"
          >
            <Activity className="w-6 h-6 text-sky-400 group-hover:animate-bounce" /> {t("watch_live")}
          </button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left mb-24">
          <FeatureCard
            icon={<Lock className="w-8 h-8 text-sky-400" />}
            title={t("tech_title")}
            desc={t("tech_desc")}
          />
          <FeatureCard
            icon={<ShieldAlert className="w-8 h-8 text-rose-500" />}
            title={t("ethical_title")}
            desc={t("ethical_desc")}
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8 text-indigo-400" />}
            title={t("comm_title")}
            desc={t("comm_desc")}
          />
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-16 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-12 text-slate-500 text-sm font-bold">
          <div className="flex items-center gap-3 grayscale brightness-200 hover:grayscale-0 transition-all cursor-crosshair">
            <Shield className="w-8 h-8 text-sky-500" /> <span className="text-xl tracking-tighter text-white">AI HONEYPOT</span>
          </div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-sky-400 transition-colors uppercase tracking-widest">Privacy</a>
            <a href="#" className="hover:text-sky-400 transition-colors uppercase tracking-widest">Terms</a>
            <a href="#" className="hover:text-sky-400 transition-colors uppercase tracking-widest">Audit</a>
          </div>
          <div className="font-mono">© 2026 Secured Global Defense.</div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="group p-10 rounded-[40px] bg-slate-900/40 border border-white/5 hover:border-sky-500/40 transition-all hover:bg-slate-900/60 shadow-2xl backdrop-blur-md">
      <div className="mb-8 p-5 bg-slate-950 rounded-3xl w-fit group-hover:scale-110 transition-transform duration-500 shadow-2xl border border-white/10">{icon}</div>
      <h3 className="text-2xl font-black mb-4 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed font-medium">{desc}</p>
    </div>
  )
}
