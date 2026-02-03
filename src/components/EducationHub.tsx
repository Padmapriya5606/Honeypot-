
"use client"

import { BookOpen, ShieldCheck, Zap } from "lucide-react"

const SCAM_TIPS = [
    {
        title: "The 'Wrong Number' Gambit",
        desc: "Actors attempt to verify active numbers through intentional 'mistakes' to start rapport.",
        severity: "Medium",
        category: "Reconnaissance"
    },
    {
        title: "UPI Sandbox Drain",
        desc: "Fraudulent requests asking for PINs to 'credit' rewards. Primary goal: P&L extraction.",
        severity: "Critical",
        category: "Fin. Cyber"
    },
    {
        title: "Social Task Farming",
        desc: "Job offers requiring initial small deposits for 'rating' tasks. Classic Ponzi variant.",
        severity: "Critical",
        category: "Investment"
    }
]

export function EducationHub() {
    return (
        <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 h-full shadow-2xl backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl -z-10 group-hover:bg-sky-500/10 transition-colors" />

            <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
                <div className="p-2 bg-sky-500/10 rounded-lg">
                    <BookOpen className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">Intel Ops</h3>
                    <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest mt-0.5">Tactical Awareness Feed</p>
                </div>
                <div className="ml-auto flex h-2 w-2 relative">
                    <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></div>
                    <div className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></div>
                </div>
            </div>

            <div className="space-y-6">
                {SCAM_TIPS.map((tip, i) => (
                    <div key={i} className="group p-5 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-sky-500/30 transition-all cursor-default relative">

                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{tip.category}</span>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter border ${tip.severity === "Critical" ? "border-rose-500/30 text-rose-500 bg-rose-500/10" : "border-amber-500/30 text-amber-500 bg-amber-500/10"
                                }`}>
                                {tip.severity}
                            </span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-100 mb-1.5 group-hover:text-sky-400 transition-colors">{tip.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{tip.desc}</p>
                    </div>
                ))}
            </div>

            <button className="w-full mt-10 py-5 bg-slate-950 border border-white/5 text-slate-400 hover:text-sky-400 hover:border-sky-500/30 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-inner active:scale-95">
                <ShieldCheck className="w-4 h-4" /> Comprehensive Database
            </button>
        </div>
    )
}
