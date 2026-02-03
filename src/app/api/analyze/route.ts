
import { NextResponse } from "next/server"

// Mock keywords for detection in multiple languages
const SCAM_KEYWORDS = {
    en: ["won", "prize", "congratulations", "gift", "card", "bank", "account", "urgent", "login", "password", "verify", "bit.ly", "link"],
    ta: ["வெற்றி", "பரிசு", "வாழ்த்துக்கள்", "வங்கி", "கணக்கு", "அவசரம்", "கடவுச்சொல்", "சரிபார்", "இணைப்பு", "பணம்", "லோன்"],
    hi: ["जीता", "इनाम", "बधाई", "बैंक", "खाता", "जरूरी", "पासवर्ड", "सत्यापित", "लिंक", "पैसा", "लोन"]
}

export async function POST(req: Request) {
    try {
        const { message } = await req.json()
        const lowerMessage = message.toLowerCase()

        // Detect if message is a scam based on multilingual keywords
        const isScam = Object.values(SCAM_KEYWORDS).flat().some(keyword => lowerMessage.includes(keyword))

        const riskScore = isScam ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 20)

        // Language detection (simplistic for prototype)
        let detectedLang = "en"
        if (SCAM_KEYWORDS.ta.some(k => lowerMessage.includes(k))) detectedLang = "ta"
        else if (SCAM_KEYWORDS.hi.some(k => lowerMessage.includes(k))) detectedLang = "hi"

        // Mock Conversation based on detected language
        const conversations = {
            en: [
                { role: "scammer", content: message },
                { role: "honeypot", content: "Hello, I received this message. Is it still available?" },
                { role: "scammer", content: "Yes! You just need to pay a small processing fee of $10 to claim the $1,000 prize." },
                { role: "honeypot", content: "I see. Can I pay via bank transfer?" },
                { role: "scammer", content: "Only via this link: http://bit.ly/secure-pay-rewards. Be quick!" }
            ],
            ta: [
                { role: "scammer", content: message },
                { role: "honeypot", content: "வணக்கம், இந்த செய்தி எனக்கு வந்தது. இது இன்னும் உண்மையானதா?" },
                { role: "scammer", content: "ஆம்! நீங்கள் 10,000 ரூபாய் பரிசு பெற 100 ரூபாய் கட்டணம் செலுத்த வேண்டும்." },
                { role: "honeypot", content: "சரி, எப்படி செலுத்துவது?" },
                { role: "scammer", content: "இந்த இணைப்பை கிளிக் செய்யவும்: http://scam-link.ta/pay" }
            ],
            hi: [
                { role: "scammer", content: message },
                { role: "honeypot", content: "नमस्ते, मुझे यह मैसेज मिला। क्या यह अभी भी उपलब्ध है?" },
                { role: "scammer", content: "हाँ! आपको 5,000 रुपये का इनाम पाने के लिए बस 50 रुपये प्रोसेसिंग फीस चुकानी होगी।" },
                { role: "honeypot", content: "ठीक है, पेमेंट कैसे करूँ?" },
                { role: "scammer", content: "इस लिंक पर जाएँ: http://secure-pay.hi/claim" }
            ]
        }

        const reasons = {
            en: ["Request for upfront payment", "Redirects to external short-links", "Urgent tone used", "Unverified sender"],
            ta: ["முன்பணம் கேட்கப்படுகிறது", "குறுகிய இணைப்புகளுக்கு திருப்பி விடப்படுகிறது", "அவசரப்படுத்துகிறது", "சரிபார்க்கப்படாத அனுப்புநர்"],
            hi: ["अग्रिम भुगतान का अनुरोध", "बाहरी शॉर्ट-लिंक्स पर रीडायरेक्ट", "तत्काल लहजा", "असत्यापित प्रेषक"]
        }

        return NextResponse.json({
            riskScore,
            scamType: isScam ? (detectedLang === "ta" ? "பரிசு மோசடி" : detectedLang === "hi" ? "इनाम घोटाला" : "Financial Phishing") : "Safe",
            reasons: isScam ? (reasons[detectedLang as keyof typeof reasons] || reasons.en) : ["No suspicious patterns found"],
            conversation: conversations[detectedLang as keyof typeof conversations] || conversations.en
        })
    } catch (error) {
        return NextResponse.json({ error: "Failed to analyze message" }, { status: 500 })
    }
}
