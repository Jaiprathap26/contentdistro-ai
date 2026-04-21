"use client"
import { useState } from "react"
import Link from "next/link"

export default function ContentDistroLanding() {
  const [text, setText] = useState("")
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-sm">📡</div>
          <span className="font-bold text-xl">ContentDistro.ai</span>
        </div>
        <Link href="/dashboard" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Try Free Now →
        </Link>
      </nav>

      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-900/30 border border-emerald-800 rounded-full px-4 py-2 text-sm text-emerald-300 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          Write once · Publish on 10 platforms · 30 seconds
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          One Post →<br /><span className="text-emerald-400">10 Platforms</span><br />in 30 Seconds
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          ContentDistro.ai takes your content and rewrites it natively for Twitter/X, LinkedIn, Instagram,
          TikTok, Reddit, WhatsApp, Facebook, Threads, YouTube description, and newsletter — all in one click.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/dashboard" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
            Start Distributing Free →
          </Link>
          <a href="#demo" className="border border-gray-700 hover:border-gray-500 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
            See Demo
          </a>
        </div>
        <p className="text-sm text-gray-500">5 free distributions/day · No signup required · Works in 30 seconds</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12" id="demo">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">What ContentDistro.ai creates from one input</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { platform: "Twitter/X", icon: "🐦", example: "This changed how I think about productivity. Thread 🧵👇", chars: "180 chars", color: "border-blue-800" },
              { platform: "LinkedIn", icon: "💼", example: "I spent 6 months testing this framework. Here's what actually works (and why most people get it wrong):", chars: "Professional", color: "border-blue-700" },
              { platform: "Instagram", icon: "📸", example: "Save this post if you struggle with productivity 💡 Swipe for the full breakdown →", chars: "+ hashtags", color: "border-pink-800" },
              { platform: "TikTok", icon: "🎵", example: "POV: You finally figure out why you're always busy but never productive. This one thing changed everything 👇", chars: "Hook first", color: "border-red-800" },
              { platform: "WhatsApp", icon: "💬", example: "Hey! Found this super useful productivity tip I had to share with you personally...", chars: "Personal tone", color: "border-green-800" },
            ].map((p, i) => (
              <div key={i} className={`bg-gray-800 border ${p.color} rounded-xl p-4`}>
                <div className="flex items-center gap-2 mb-3">
                  <span>{p.icon}</span>
                  <span className="font-semibold text-sm">{p.platform}</span>
                </div>
                <p className="text-gray-300 text-xs leading-relaxed mb-2">{p.example}</p>
                <p className="text-gray-500 text-xs">{p.chars}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">All generated from a single input in under 30 seconds</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { name: "Free", price: "$0", features: ["5 distributions/day", "6 platforms", "No account needed"], cta: "Start Free", popular: false },
            { name: "Creator", price: "$19", india: "₹1,599", features: ["Unlimited distributions", "10 platforms", "Brand voice saving", "Bulk mode (10 posts)"], cta: "Go Creator", popular: true },
            { name: "Agency", price: "$59", india: "₹4,999", features: ["20 brand voices", "Unlimited posts", "Team access", "API + Zapier", "White-label"], cta: "Go Agency", popular: false },
          ].map((p, i) => (
            <div key={i} className={`rounded-2xl p-8 ${p.popular ? "bg-emerald-600 border-2 border-emerald-400" : "bg-gray-900 border border-gray-800"}`}>
              {p.popular && <div className="text-xs font-bold uppercase text-emerald-200 mb-4">Most Popular</div>}
              <h3 className="text-xl font-bold mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-1"><span className="text-4xl font-black">{p.price}</span>{p.price !== "$0" && <span className="text-sm text-gray-400">/mo</span>}</div>
              {(p as {india?: string}).india && <p className="text-sm text-gray-400 mb-6">{(p as {india?: string}).india}/mo in India</p>}
              <ul className="space-y-3 mb-8 mt-4">{p.features.map((f, j) => <li key={j} className="text-sm flex items-center gap-2 text-gray-300"><span className="text-green-400">✓</span>{f}</li>)}</ul>
              <Link href="/dashboard" className={`block w-full py-3 rounded-lg font-semibold text-sm text-center ${p.popular ? "bg-white text-emerald-600" : "bg-emerald-600 text-white"}`}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-800 px-6 py-8 text-center text-gray-500 text-sm">
        © 2026 ContentDistro.ai — Write Once, Distribute Everywhere · Built by Amelia Sovereign AI
      </footer>
    </div>
  )
}