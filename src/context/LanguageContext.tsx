
"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "ta" | "hi"

interface Translations {
    [key: string]: {
        [K in Language]: string
    }
}

export const translations: Translations = {
    // Navbar
    home: { en: "Home", ta: "முகப்பு", hi: "होम" },
    network: { en: "Network", ta: "பிணையம்", hi: "नेटवर्क" },
    dashboard: { en: "Dashboard", ta: "டாஷ்போர்டு", hi: "डैशबोर्ड" },
    about: { en: "About", ta: "பற்றி", hi: "के बारे में" },
    login: { en: "Log In", ta: "உள்நுழைய", hi: "लॉग इन" },
    signup: { en: "Sign Up", ta: "பதிவு செய்க", hi: "साइन अप" },
    logout: { en: "Logout", ta: "வெளியேறு", hi: "लॉगआउट" },

    // Landing Page
    advanced_scam_detection: { en: "Advanced Scam Detection", ta: "மேம்பட்ட மோசடி கண்டறிதல்", hi: "उन्नत घोटाला पहचान" },
    hero_desc: {
        en: "Eliminate digital threats before they reach your inbox. Our honeypot technology interacts with scammers so you don't have to.",
        ta: "டிஜிட்டல் அச்சுறுத்தல்கள் உங்கள் இன்பாக்ஸை அடையும் முன்பே அவற்றை நீக்குங்கள். எங்கள் தொழில்நுட்பம் மோசடிக்காரர்களுடன் தொடர்பு கொள்கிறது.",
        hi: "डिजिटल खतरों को आपके इनबॉक्स तक पहुँचने से पहले ही खत्म करें। हमारी तकनीक जालसाजों के साथ बातचीत करती है।"
    },
    start_trial: { en: "Start Free Trial", ta: "இலவச சோதனையைத் தொடங்கு", hi: "नि: शुल्क परीक्षण शुरू करें" },
    watch_live: { en: "Watch Live", ta: "நேரலையில் பார்க்க", hi: "लाइव देखें" },
    protection_grid_active: { en: "Protection Grid Active", ta: "பாதுகாப்பு கட்டம் செயலில் உள்ளது", hi: "सुरक्षा ग्रिड सक्रिय है" },
    protocol_overview: { en: "Protocol Overview", ta: "நெறிமுறை மேலோட்டம்", hi: "प्रोटोकॉल अवलोकन" },

    // Dashboard
    deployment_hub: { en: "Deployment Hub", ta: "வரிசைப்படுத்தல் மையம்", hi: "परिनियोजन हब" },
    initiate_scan: { en: "Initiate Scan", ta: "ஸ்கேன் தொடங்கவும்", hi: "स्कैन शुरू करें" },
    global_scans: { en: "Global Scans", ta: "உலகளாவிய ஸ்கேன்கள்", hi: "वैश्विक स्कैन" },
    scams_deflected: { en: "Scams Deflected", ta: "தடுக்கப்பட்ட மோசடிகள்", hi: "विचलित घोटाले" },
    malicious_ips: { en: "Malicious IPs", ta: "தீங்கிழைக்கும் IPகள்", hi: "दुर्भावनापूर्ण आईपी" },
    active_logs: { en: "Active Surveillance Log", ta: "செயலில் உள்ள கண்காணிப்பு பதிவு", hi: "सक्रिय निगरानी लॉग" },
    deploy_agent: { en: "Deploy Agent", ta: "முகவரை வரிசைப்படுத்து", hi: "एजेंट तैनात करें" },
    scan_suspicious: { en: "Scan suspicious payloads", ta: "சந்தேகத்திற்குரிய செய்திகளை ஸ்கேன் செய்யுங்கள்", hi: "संदिग्ध पेलोड स्कैन करें" },
    deploy_desc: { en: "Deploy our behavioral agents to expose hidden malicious intent safely.", ta: "மறைக்கப்பட்ட தீங்கிழைக்கும் நோக்கத்தை பாதுகாப்பாக வெளிப்படுத்த எங்கள் முகவர்களை பயன்படுத்தவும்.", hi: "छिपे हुए दुर्भावनापूर्ण इरादे को सुरक्षित रूप से उजागर करने के लिए हमारे एजेंटों को तैनात करें।" },

    // Analyze Page
    detection_protocol: { en: "Detection Protocol", ta: "கண்டறிதல் நெறிமுறை", hi: "पहचान प्रोटोकॉल" },
    input_payload_title: { en: "Input suspicious payload", ta: "சந்தேகத்திற்குரிய செய்தியை உள்ளிடவும்", hi: "संदिग्ध पेलोड इनपुट करें" },
    input_payload_desc: { en: "Copy the message, link, or email body. Our agents will engage the actor and extract tactical signatures.", ta: "செய்தி அல்லது இணைப்பை நகலெடுக்கவும். எங்கள் முகவர்கள் மோசடிக்காரர்களைக் கண்டறிவார்கள்.", hi: "संदेश या लिंक कॉपी करें। हमारे एजेंट जालसाजों की पहचान करेंगे।" },
    analyze_placeholder: { en: "Paste the threat payload here...", ta: "அச்சுறுத்தல் செய்தியை இங்கே ஒட்டவும்...", hi: "खतरे के पेलोड को यहाँ पेस्ट करें..." },
    neutralize_btn: { en: "Initiate Neutralization", ta: "செயல்பாட்டைத் தொடங்கு", hi: "निष्क्रियीकरण शुरू करें" },
    engaging_actor: { en: "Engaging Actor...", ta: "தொடர்பு கொள்கிறது...", hi: "बातचीत चल रही है..." },
    scam_confirmed: { en: "Scam Confirmed", ta: "மோசடி உறுதிப்படுத்தப்பட்டது", hi: "घोटाले की पुष्टि हुई" },
    safe_pattern: { en: "Safe Pattern", ta: "பாதுகாப்பான முறை", hi: "सुरक्षित पैटर्न" },
    threat_score: { en: "Threat Score", ta: "அச்சுறுத்தல் மதிப்பெண்", hi: "खतरे का स्कोर" },
    report_police: { en: "Report to Police", ta: "காவல்துறையிடம் புகார் செய்", hi: "पुलिस को रिपोर्ट करें" },
    blacklist: { en: "Blacklist Identity", ta: "அடையாளத்தை முடக்கு", hi: "पहचान ब्लैकलिस्ट करें" },
    new_analysis: { en: "New Analysis", ta: "புதிய பகுப்பாய்வு", hi: "नया विश्लेषण" },
    threat_classification: { en: "Threat Classification", ta: "அச்சுறுத்தல் வகைப்பாடு", hi: "खतरा वर्गीकरण" },
    evidence_extraction: { en: "Evidence Extraction", ta: "ஆதாரங்களை பிரித்தெடுத்தல்", hi: "साक्ष्य निष्कर्षण" },

    // Network Status
    infra_title: { en: "System Infrastructure", ta: "அமைப்பின் உள்கட்டமைப்பு", hi: "सिस्टम इंफ्रास्ट्रक्चर" },
    grid_status: { en: "Global Defense Grid Status", ta: "பாதுகாப்பு நிலவரம்", hi: "रक्षा ग्रिड स्थिति" },
    nodes_operational: { en: "Global Nodes Operational", ta: "அனைத்து முனைகளும் செயல்படுகின்றன", hi: "सभी नोड्स चालू हैं" },
    uptime: { en: "99.9% Uptime", ta: "99.9% இயக்க நேரம்", hi: "99.9% अपटाइम" },

    // About Page
    mission_title_main: { en: "Securing the Digital Frontier", ta: "டிஜிட்டல் எல்லையைப் பாதுகாத்தல்", hi: "डिजिटल फ्रंटियर को सुरक्षित करना" },
    mission_desc_main: {
        en: "AI Honeypot is a proactive defense system designed to neutralize digital scammers through active engagement and behavioral intelligence.",
        ta: "AI ஹனிபாட் என்பது டிஜிட்டல் மோசடிக்காரர்களை முடக்க வடிவமைக்கப்பட்ட ஒரு மேம்பட்ட பாதுகாப்பு அமைப்பு.",
        hi: "एआई हनीपॉट एक उन्नत रक्षा प्रणाली है जिसे डिजिटल जालसाजों को निष्क्रिय करने के लिए डिज़ाइन किया गया है।"
    },
    our_mission: { en: "Our Mission", ta: "எங்கள் நோக்கம்", hi: "हमारा लक्ष्य" },
    mission_desc_card: { en: "To reverse the power dynamic between scammers and targets globally.", ta: "உலக அளவில் மோசடிக்காரர்களை முடக்குவதே எங்கள் நோக்கம்.", hi: "विश्व स्तर पर जालसाजों को रोकना हमारा लक्ष्य है।" },
    tech_title: { en: "Technology", ta: "தொழில்நுட்பம்", hi: "तकनीक" },
    tech_desc: { en: "High-fidelity behavioral agents draw out malicious intent in real-time.", ta: "நிகழ்நேரத்தில் தீங்கிழைக்கும் நோக்கத்தை கண்டறியும் முகவர்கள்.", hi: "वास्तविक समय में दुर्भावनापूर्ण इरादे का पता लगाने वाले एजेंट।" },
    comm_title: { en: "Community First", ta: "சமூகம் முக்கியம்", hi: "समुदाय पहले" },
    comm_desc: { en: "Protecting the entire network instantly when a new threat is found.", ta: "புதிய அச்சுறுத்தல் கண்டறியப்பட்டால் முழு பிணையத்தையும் பாதுகாத்தல்.", hi: "नया खतरा मिलने पर पूरे नेटवर्क की तुरंत रक्षा करना।" },
    ethical_title: { en: "Ethical Defense", ta: "அறநெறி பாதுகாப்பு", hi: "नैतिक रक्षा" },
    ethical_desc: { en: "Built with privacy-first principles. Sandboxed engagement ensures safety.", ta: "தனியுரிமைக்கு முக்கியத்துவம் அளித்து உருவாக்கப்பட்டது.", hi: "गोपनीयता के सिद्धांतों के साथ निर्मित।" }
}

interface LanguageContextType {
    lang: Language
    setLang: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Language>("en")

    useEffect(() => {
        const saved = localStorage.getItem("app_lang") as Language
        if (saved && ["en", "ta", "hi"].includes(saved)) {
            setLang(saved)
        }
    }, [])

    const handleSetLang = (newLang: Language) => {
        setLang(newLang)
        localStorage.setItem("app_lang", newLang)
    }

    const t = (key: string) => {
        if (!translations[key]) return key
        return translations[key][lang]
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
