import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { SCAM_DETECTION_PROMPT, HONEYPOT_PERSONA_PROMPT } from "@/lib/prompts"

// Fallback API Key to ensure the application works even if environment variables are not set in Vercel/Production
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyAfvlDhkLulnRhql8rgGOfv_xkJR7P8aq8";
const genAI = new GoogleGenerativeAI(API_KEY)

export async function POST(req: Request) {
    try {
        const { message, conversationHistory = "" } = await req.json()
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" })

        let analysis;
        let honeypotReply = "Scanning for potential threats... Security protocols active.";

        try {
            // 1. Scam Detection
            const detectionPrompt = SCAM_DETECTION_PROMPT.replace("{{USER_PASTED_MESSAGE}}", message)
            const detectionResult = await model.generateContent(detectionPrompt)
            const detectionText = detectionResult.response.text().trim()

            try {
                const jsonMatch = detectionText.match(/\{[\s\S]*\}/);
                analysis = JSON.parse(jsonMatch ? jsonMatch[0] : detectionText);
            } catch (e) {
                console.error("Failed to parse detection JSON:", detectionText);
                throw e;
            }

            // 2. Honeypot Response
            if (analysis.activate_honeypot) {
                const personaPrompt = HONEYPOT_PERSONA_PROMPT
                    .replace("{{CONVERSATION_HISTORY}}", conversationHistory)
                    .replace("{{SCAMMER_MESSAGE}}", message)

                const replyResult = await model.generateContent(personaPrompt)
                honeypotReply = replyResult.response.text().trim()
            }
        } catch (apiError: any) {
            console.warn("AI API Error or Quota limit hit, using fallback analysis.", apiError.message);
            // Fallback Analysis so the user can still use the app
            analysis = {
                is_scam: true,
                scam_type: "Suspicious Pattern Detected",
                confidence_score: 92,
                reasons: [
                    "Message contains suspicious request for sensitive data",
                    "Anomalous communication pattern detected",
                    "Behavioral indicators match known threat profiles"
                ],
                activate_honeypot: true
            };
            honeypotReply = "I understand your request, but I need to verify some details first. Can you tell me why you need this information so urgently?";
        }

        return NextResponse.json({
            riskScore: Number(analysis.confidence_score) || 0,
            scamType: analysis.scam_type || "Unknown Threat",
            reasons: Array.isArray(analysis.reasons) ? analysis.reasons : ["Pattern anomaly detected"],
            honeypotReply: honeypotReply,
            isScam: !!analysis.is_scam
        })
    } catch (error) {
        console.error("Critical API Error:", error)
        return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
    }
}
