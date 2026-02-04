
"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { useLanguage } from "@/context/LanguageContext"
import { Send, Shield, AlertTriangle, CheckCircle, Smartphone, Lock, XCircle, ChevronLeft, Zap, Info, ShieldAlert, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

type Phase = "input" | "analyzing" | "result"

interface ChatMessage {
    role: "honeypot" | "scammer"
    content: string
}

interface ResultData {
    riskScore: number
    scamType: string
    reasons: string[]
    conversation: ChatMessage[]
}

export default function AnalyzePage() {
    const { user, isAuthenticated } = useAuth()
    const { t } = useLanguage()
    const router = useRouter()

    const [phase, setPhase] = useState<Phase>("input")
    const [inputMessage, setInputMessage] = useState("")
    const [result, setResult] = useState<ResultData | null>(null)
    const [error, setError] = useState<string | null>(null)

    const [visibleChat, setVisibleChat] = useState<ChatMessage[]>([])
    const chatEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, router])

    const handleAnalyze = async () => {
        if (!inputMessage.trim()) return
        setPhase("analyzing")
        setError(null)

        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: inputMessage })
            })

            const data = await res.json()

            if (!res.ok || data.error) {
                throw new Error(data.error || "Analysis failed")
            }

            // Construct a conversation for simulation
            const conversation: ChatMessage[] = [
                { role: "scammer", content: inputMessage }
            ];

            if (data.honeypotReply) {
                conversation.push({ role: "honeypot", content: data.honeypotReply });
            }

            setResult({
                ...data,
                conversation: conversation
            })

            if (conversation.length > 0) {
                simulateChat(conversation)
            } else {
                setPhase("result")
            }
        } catch (e: any) {
            console.error("Analysis failed", e)
            setError(e.message || "Something went wrong during analysis")
            setPhase("input")
        }
    }

    const simulateChat = async (fullConversation: ChatMessage[]) => {
        let currentMessages: ChatMessage[] = []
        for (const msg of fullConversation) {
            await new Promise(r => setTimeout(r, 1200))
            currentMessages = [...currentMessages, msg]
            setVisibleChat(currentMessages)
            chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        await new Promise(r => setTimeout(r, 800))
        setPhase("result")
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col relative overflow-hidden pt-20">
            <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-sky-900/10 to-transparent pointer-events-none" />
            <div className="fixed inset-0 bg-grid opacity-10 -z-10" />

            <header className="p-6 flex items-center justify-between z-10 sticky top-16 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.push("/dashboard")} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5">
                        <ChevronLeft className="w-6 h-6 text-slate-400 hover:text-white" />
                    </button>
                    <div>
                        <h1 className="font-bold text-xl text-white tracking-tight">{t("detection_protocol")}</h1>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Session: Active Monitoring</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-xl border border-emerald-400/20 shadow-[0_0_20px_rgba(52,211,153,0.15)]">
                    <Zap className="w-3.5 h-3.5 fill-emerald-400 animate-pulse" /> Live Status: Verified
                </div>
            </header>

            <main className="flex-1 max-w-6xl mx-auto w-full p-6 flex flex-col items-center justify-center">

                {phase === "input" && (
                    <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[32px] bg-sky-500/10 mb-8 border-2 border-sky-500/30 shadow-[0_0_50px_rgba(56,189,248,0.1)]">
                                <Smartphone className="w-12 h-12 text-sky-400" />
                            </div>
                            <h2 className="text-5xl font-black text-white mb-4 tracking-tight">{t("input_payload_title")}</h2>
                            <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">{t("input_payload_desc")}</p>
                        </div>

                        <div className="relative group p-1.5 bg-slate-900 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] rounded-[40px] border border-white/5 focus-within:ring-4 focus-within:ring-sky-500/20 transition-all">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
                            <textarea
                                className="w-full h-64 bg-transparent p-10 text-2xl focus:outline-none resize-none text-slate-100 placeholder:text-slate-800 font-medium leading-relaxed"
                                placeholder={t("analyze_placeholder")}
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                            />
                            <div className="flex items-center justify-between p-6 bg-slate-950/50 rounded-b-[38px] border-t border-white/5">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3 text-[11px] font-bold text-slate-600 uppercase tracking-[0.2em]">
                                        <Info className="w-4 h-4 text-sky-500/50" /> Secure Sandbox Protocol
                                    </div>
                                    {error && (
                                        <div className="text-rose-500 text-xs font-bold bg-rose-500/10 p-3 rounded-xl border border-rose-500/20 animate-pulse">
                                            ⚠️ {error}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={handleAnalyze}
                                    disabled={!inputMessage.trim()}
                                    className="bg-sky-400 hover:bg-sky-300 disabled:opacity-20 disabled:grayscale text-slate-950 px-10 py-5 rounded-2xl font-black transition-all shadow-[0_0_40px_rgba(56,189,248,0.6)] flex items-center gap-3 transform active:scale-95 border-b-8 border-sky-600 active:border-b-0 active:translate-y-2 pointer-events-auto"
                                    id="main-neutralize-btn"
                                >
                                    {t("neutralize_btn")} <Send className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {phase === "analyzing" && (
                    <div className="w-full max-w-4xl mx-auto flex flex-col h-[75vh] animate-in fade-in duration-500">
                        <div className="flex items-center justify-between mb-10">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-sky-500/10 rounded-[28px] border-2 border-sky-500/20 animate-pulse">
                                    <Activity className="w-8 h-8 text-sky-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white leading-tight">{t("engaging_actor")}</h3>
                                    <div className="text-[11px] font-mono text-sky-400 font-black uppercase tracking-[0.2em] flex items-center gap-2 mt-1">
                                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                                        Behavioral Intelligence Scan Active
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 bg-slate-900/40 border border-white/5 rounded-[40px] p-10 overflow-y-auto space-y-8 shadow-2xl relative backdrop-blur-3xl border-white/10">
                            {visibleChat.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={cn("flex", msg.role === "honeypot" ? "justify-end" : "justify-start")}
                                >
                                    <div className={cn(
                                        "max-w-[80%] p-6 rounded-[32px] text-lg shadow-2xl relative",
                                        msg.role === "honeypot"
                                            ? "bg-sky-600 text-white rounded-tr-none shadow-sky-900/30"
                                            : "bg-slate-800 text-slate-100 rounded-tl-none border border-white/10"
                                    )}>
                                        <div className={cn(
                                            "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-3 opacity-50",
                                            msg.role === "honeypot" ? "justify-end" : "justify-start"
                                        )}>
                                            {msg.role === "honeypot" ? "Honeypot-Agent" : "Suspect-Actor"}
                                        </div>
                                        <p className="leading-relaxed font-semibold">{msg.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>
                    </div>
                )}

                {phase === "result" && result && (
                    <div className="w-full max-w-4xl mx-auto animate-in zoom-in-95 duration-500">
                        <div className={cn(
                            "rounded-[50px] p-12 md:p-16 border shadow-2xl relative overflow-hidden backdrop-blur-3xl",
                            result.riskScore > 70
                                ? "bg-rose-950/30 border-rose-500/30 shadow-rose-900/30"
                                : "bg-emerald-950/30 border-emerald-500/30 shadow-emerald-900/30"
                        )}>
                            <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/5 rounded-full blur-3xl -z-10" />

                            <div className="flex flex-col md:flex-row items-center md:items-start transition-all gap-10 mb-16">
                                <div className={cn(
                                    "p-10 rounded-[40px] shadow-2xl border-4",
                                    result.riskScore > 70 ? "bg-rose-500/10 border-rose-500/30" : "bg-emerald-500/10 border-emerald-500/30"
                                )}>
                                    {result.riskScore > 70
                                        ? <ShieldAlert className="w-20 h-20 text-rose-500" />
                                        : <CheckCircle className="w-20 h-20 text-emerald-500" />
                                    }
                                </div>
                                <div className="text-center md:text-left flex-1">
                                    <h2 className="text-6xl font-black text-white mb-4 tracking-tighter">
                                        {result.riskScore > 70 ? t("scam_confirmed") : t("safe_pattern")}
                                    </h2>
                                    <p className="text-slate-500 font-mono text-xl uppercase tracking-widest">
                                        {t("threat_score")}: <span className={cn("font-black text-3xl ml-2", result.riskScore > 70 ? "text-rose-500" : "text-emerald-500")}>{result.riskScore}%</span>
                                    </p>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 border border-white/10 rounded-[40px] p-12 mb-12 shadow-inner">
                                <div className="flex items-center justify-between border-b border-white/5 pb-8 mb-8">
                                    <div>
                                        <div className="text-[11px] text-slate-600 uppercase font-black mb-2 tracking-[0.2em]">{t("threat_classification")}</div>
                                        <div className="text-4xl font-black text-white">{result.scamType}</div>
                                    </div>
                                    <div className="px-6 py-3 rounded-2xl bg-slate-950 border border-white/10 text-xs font-black text-sky-400 uppercase tracking-widest">Digital Fingerprint Verified</div>
                                </div>

                                <div className="space-y-6">
                                    <span className="text-[11px] text-slate-500 uppercase font-black block mb-6 tracking-[0.2em]">{t("evidence_extraction")}</span>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {result.reasons?.map((r, i) => (
                                            <div key={i} className="flex gap-4 text-slate-300 text-lg bg-slate-950/60 p-6 rounded-3xl border border-white/5 hover:border-sky-500/20 transition-all">
                                                <div className="mt-2 w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(55,189,248,0.5)] flex-shrink-0" />
                                                <span className="font-semibold">{r}</span>
                                            </div>
                                        ))}
                                        {(!result.reasons || result.reasons.length === 0) && (
                                            <div className="col-span-2 text-slate-500 italic text-center py-4">
                                                No specific reasons provided by behavioral analysis.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* New Interaction Log Section */}
                            <div className="bg-slate-900/30 border border-white/5 rounded-[40px] p-10 mb-12 backdrop-blur-md">
                                <div className="flex items-center gap-3 mb-8">
                                    <Activity className="w-5 h-5 text-sky-400" />
                                    <h3 className="text-xl font-black text-white uppercase tracking-wider">{t("engagement_log") || "Engagement Log"}</h3>
                                </div>
                                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
                                    {visibleChat.map((msg, i) => (
                                        <div key={i} className={cn("flex flex-col gap-2", msg.role === "honeypot" ? "items-end" : "items-start")}>
                                            <div className={cn(
                                                "text-[9px] font-black uppercase tracking-widest opacity-40 px-2",
                                                msg.role === "honeypot" ? "text-sky-400" : "text-slate-400"
                                            )}>
                                                {msg.role === "honeypot" ? "Honeypot Decoy" : "Suspect Actor"}
                                            </div>
                                            <div className={cn(
                                                "px-6 py-4 rounded-2xl max-w-[85%] text-sm font-medium",
                                                msg.role === "honeypot"
                                                    ? "bg-sky-500/10 border border-sky-500/20 text-sky-100 rounded-tr-none"
                                                    : "bg-slate-800/50 border border-white/5 text-slate-200 rounded-tl-none"
                                            )}>
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <button className="flex items-center justify-center gap-4 p-6 rounded-[30px] bg-rose-600 hover:bg-rose-500 font-black text-white text-lg transition-all shadow-[0_20px_40px_rgba(225,29,72,0.3)] active:scale-95 border-b-4 border-rose-800">
                                    <Lock className="w-6 h-6" /> {t("blacklist")}
                                </button>

                                <button
                                    onClick={() => alert("Reported to Authorities. ID: #CYB-" + Math.floor(Math.random() * 10000))}
                                    className="flex items-center justify-center gap-4 p-6 rounded-[30px] bg-slate-900 hover:bg-slate-800 border-2 border-rose-500/30 font-black text-slate-200 text-lg transition-all active:scale-95"
                                >
                                    <ShieldAlert className="w-6 h-6 text-rose-500" /> {t("report_police")}
                                </button>

                                <button
                                    onClick={() => {
                                        setPhase("input")
                                        setInputMessage("")
                                        setVisibleChat([])
                                    }}
                                    className="p-6 rounded-[30px] bg-slate-950 border-2 border-white/5 hover:border-sky-500/30 font-black text-slate-500 hover:text-sky-400 text-lg transition-all active:scale-95"
                                >
                                    {t("new_analysis")}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
