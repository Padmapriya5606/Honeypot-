
import { SCAM_DETECTION_PROMPT, HONEYPOT_PERSONA_PROMPT, INTELLIGENCE_EXTRACTION_PROMPT, USER_EXPLANATION_PROMPT } from "@/lib/prompts"

export interface AnalysisResult {
    riskScore: number // 0-100
    scamType: string
    reasons: string[]
    conversation: { role: "honeypot" | "scammer"; content: string }[]
    explanation?: string
}

// In a real app, this would be an OpenAI/LLM call
// For this prototype, we mock the responses but KEEP the structure of the 4 prompts
async function mockLLMCall(promptType: string, inputs: any): Promise<any> {
    await new Promise(r => setTimeout(r, 800)) // Mimic API latency

    // 1. Scam Detection Simulation
    if (promptType === "SCAM_DETECTION") {
        const msg = inputs.message.toLowerCase()
        if (msg.includes("won") || msg.includes("prize")) {
            return {
                is_scam: true,
                scam_type: "Fake Prize Scam",
                confidence_score: 95,
                reasons: ["Unsolicited prize claim", "Generic greeting", "High-value reward promise"],
                activate_honeypot: true
            }
        }
        return { is_scam: false, confidence_score: 10, reasons: ["Normal conversation detected"], activate_honeypot: false }
    }

    // 2. Honeypot Simulation (returns a single reply string)
    if (promptType === "HONEYPOT_PERSONA") {
        // Simple heuristic response logic
        const lastMsg = inputs.lastMessage.toLowerCase()
        if (lastMsg.includes("pay") || lastMsg.includes("transfer")) return "Okay, I can pay. But how do I trust this?"
        if (lastMsg.includes("link") || lastMsg.includes("click")) return "The link isn't opening for me. Can you send it again?"
        return "I'm confused. What do I need to do exactly?"
    }

    // 3. Extraction Simulation
    if (promptType === "INTELLIGENCE_EXTRACTION") {
        return {
            bank_accounts: [],
            upi_ids: ["fraud@upi"],
            phishing_links: ["http://fake-prize.com"],
            scam_tactics: ["Urgency", "too-good-to-be-true"],
            final_risk_score: 95
        }
    }

    // 4. Explanation Simulation
    if (promptType === "USER_EXPLANATION") {
        return "This is a confirmed scam. The sender is using a 'Fake Prize' tactic to trick you into paying a fee. We detected a suspicious UPI ID and a phishing link. We strongly recommend blocking this number."
    }
}

export async function runFullAnalysisFlow(userMessage: string): Promise<AnalysisResult> {

    // Step 1: Detect Scam
    // In real app: const detection = await callLLM(SCAM_DETECTION_PROMPT.replace("{{USER_PASTED_MESSAGE}}", userMessage))
    const detectionRaw = await mockLLMCall("SCAM_DETECTION", { message: userMessage })

    let conversation: { role: "honeypot" | "scammer"; content: string }[] = []

    // Step 2: Honeypot (If active)
    if (detectionRaw.activate_honeypot) {
        // Simulate a 3-turn conversation
        // Turn 1
        const reply1 = "Wow really? Is this legit?" // Mock first honeypot msg
        conversation.push({ role: "honeypot", content: reply1 })

        const scammerReply1 = "Yes strictly limited time only. Pay 500 processing fee." // Mock scammer
        conversation.push({ role: "scammer", content: scammerReply1 })

        // Turn 2 (Using "API 2")
        // In real app: const aiReply = await callLLM(HONEYPOT_PERSONA_PROMPT...)
        const reply2 = await mockLLMCall("HONEYPOT_PERSONA", { lastMessage: scammerReply1 })
        conversation.push({ role: "honeypot", content: reply2 })

        const scammerReply2 = "Trust me sir. Send to fraud@upi."
        conversation.push({ role: "scammer", content: scammerReply2 })
    }

    // Step 3: Extract Intelligence
    // In real app: const extraction = await callLLM(INTELLIGENCE_EXTRACTION_PROMPT...)
    const extraction = await mockLLMCall("INTELLIGENCE_EXTRACTION", { conversation })

    // Step 4: User Explanation
    // In real app: const explanation = await callLLM(USER_EXPLANATION_PROMPT...)
    const explanation = await mockLLMCall("USER_EXPLANATION", { analysis: extraction })

    return {
        riskScore: detectionRaw.confidence_score,
        scamType: detectionRaw.scam_type || "None",
        reasons: detectionRaw.reasons,
        conversation: conversation,
        explanation: explanation
    }
}
