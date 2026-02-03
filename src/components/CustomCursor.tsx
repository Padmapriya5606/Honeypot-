"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export function CustomCursor() {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 700 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }
        window.addEventListener("mousemove", moveCursor)
        return () => window.removeEventListener("mousemove", moveCursor)
    }, [cursorX, cursorY])

    return (
        <>
            {/* Main Dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-sky-400 rounded-full z-[9999] pointer-events-none mix-blend-screen shadow-[0_0_20px_rgba(56,189,248,1),0_0_40px_rgba(56,189,248,0.5)]"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    transform: "translate(-50%, -50%)"
                }}
            />
            {/* The Ring */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 border-2 border-sky-400 rounded-full z-[9998] pointer-events-none"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    transform: "translate(-50%, -50%)"
                }}
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 0.8, 0.4],
                    borderWidth: ["2px", "1px", "2px"]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            {/* Outer Cyber Ring */}
            <motion.div
                className="fixed top-0 left-0 w-20 h-20 border border-indigo-500/30 rounded-full z-[9997] pointer-events-none border-dashed"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    transform: "translate(-50%, -50%)"
                }}
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            {/* Scanner Line */}
            <motion.div
                className="fixed top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent z-[9996] pointer-events-none"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    left: "-48px", // Offset to center
                    transform: "translate(-50%, -50%)"
                }}
            />
        </>
    )
}
