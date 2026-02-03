
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/context/LanguageContext";


import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Honeypot | Scam Verification System",
  description: "Advanced AI-powered honeypot system to detect and block scams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background text-foreground cursor-none`}>
        <LanguageProvider>
          <AuthProvider>
            <CustomCursor />
            <Navbar />
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
