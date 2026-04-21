import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "ContentDistro.ai — Repurpose One Piece of Content for 10 Platforms",
  description: "Write once, distribute everywhere. AI rewrites your content for Twitter, LinkedIn, Instagram, TikTok, Reddit, and more — natively for each platform.",
  keywords: "content repurposing AI, social media distribution, content automation, AI content tool",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className={inter.className}>{children}</body></html>)
}