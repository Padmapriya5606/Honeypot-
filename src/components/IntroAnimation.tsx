"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    const target = "HONEYPOT".split("")
    const [activeIndex, setActiveIndex] = useState(-1)
    const [foundChars, setFoundChars] = useState<string[]>([])
    const [phase, setPhase] = useState<"scanning" | "revealed">("scanning")

    useEffect(() => {
        let currentTargetIdx = 0
        const interval = setInterval(() => {
            if (currentTargetIdx < target.length) {
                const char = target[currentTargetIdx]
                const alphabetIdx = alphabet.indexOf(char)
                setActiveIndex(alphabetIdx)
                setFoundChars(prev => [...prev, char])
                currentTargetIdx++
            } else {
                clearInterval(interval)
                setTimeout(() => setPhase("revealed"), 500)
                setTimeout(() => onComplete(), 2000)
            }
        }, 150) // Medium speed blinks

        return () => clearInterval(interval)
    }, [])

    return (
        <motion.div
            className="fixed inset-0 z-[10000] bg-slate-950 flex flex-col items-center justify-center p-10 overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
        >
            {/* The Grid Of Circles */}
            <div className="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-13 gap-4 mb-20 opacity-40">
                {alphabet.map((char, i) => (
                    <div
                        key={char}
                        className={`w-12 h-12 rounded-full border border-white/30 flex items-center justify-center font-mono text-lg transition-all duration-300 ${activeIndex === i ? "bg-white border-white scale-150 shadow-[0_0_30px_rgba(255,255,255,1)] text-slate-950 font-black" : "text-white/60"}`}
                    >
                        {char}
                    </div>
                ))}
            </div>

            {/* The revealed word - ONLY SHOW WHEN PHASE IS REVEALED */}
            <AnimatePresence>
                {phase === "revealed" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex gap-4 md:gap-8"
                    >
                        {target.map((char, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="text-7xl md:text-9xl font-black italic tracking-tighter"
                            >
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-sky-400 to-indigo-600 drop-shadow-[0_0_50px_rgba(56,189,248,0.8)]">
                                    {char}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scanline effect during intro */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-500/5 to-transparent pointer-events-none"
                animate={{ translateY: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
        </motion.div>
    )
}
