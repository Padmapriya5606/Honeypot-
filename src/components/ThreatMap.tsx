
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Threat {
    id: number
    x: number
    y: number
    type: "phishing" | "malware" | "scam"
}

export function ThreatMap() {
    const [threats, setThreats] = useState<Threat[]>([])

    // Simulate incoming threats
    useEffect(() => {
        const interval = setInterval(() => {
            const newThreat: Threat = {
                id: Date.now(),
                x: Math.random() * 100, // % position
                y: Math.random() * 100,
                type: Math.random() > 0.6 ? "scam" : Math.random() > 0.3 ? "phishing" : "malware"
            }
            setThreats(prev => [...prev.slice(-15), newThreat])
        }, 1500)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative w-full h-[300px] bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-inner">
            <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center grayscale contrast-200 invert" />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-grid-slate-700/[0.1]" />

            <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <h3 className="text-xs font-mono text-red-400 font-bold tracking-widest uppercase">Live Threat Feed</h3>
                </div>
            </div>

            {threats.map(t => (
                <motion.div
                    key={t.id}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: [0, 1.5, 3], opacity: [1, 0.5, 0] }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    style={{ left: `${t.x}%`, top: `${t.y}%` }}
                    className={`absolute w-2 h-2 rounded-full ${t.type === "scam" ? "bg-orange-500" :
                            t.type === "phishing" ? "bg-red-500" : "bg-purple-500"
                        }`}
                />
            ))}

            {threats.map(t => (
                <motion.div
                    key={`dot-${t.id}`}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 3 }}
                    style={{ left: `${t.x}%`, top: `${t.y}%` }}
                    className={`absolute w-1 h-1 rounded-full ${t.type === "scam" ? "bg-orange-400" :
                            t.type === "phishing" ? "bg-red-400" : "bg-purple-400"
                        }`}
                />
            ))}
        </div>
    )
}
