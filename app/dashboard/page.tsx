"use client"
import { useState } from "react"

const PLATFORMS = ["Twitter/X", "LinkedIn", "Instagram Caption", "TikTok Script", "YouTube Description", "Reddit Post", "Facebook", "WhatsApp Status", "Threads", "Email Newsletter"]

type PlatformResult = { platform: string; content: string }

export default function ContentDistroDashboard() {
  const [originalContent, setOriginalContent] = useState("")
  const [tone, setTone] = useState("Professional")
  const [niche, setNiche] = useState("Business")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Twitter/X", "LinkedIn", "Instagram Caption", "TikTok Script"])
  const [results, setResults] = useState<PlatformResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const togglePlatform = (p: string) => {
    setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  const handleDistribute = async () => {
    if (!originalContent.trim()) { setError("Please enter your content"); return }
    if (!selectedPlatforms.length) { setError("Select at least one platform"); return }
    setLoading(true); setError(""); setResults([])
    try {
      const res = await fetch("/api/distribute-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: originalContent, platforms: selectedPlatforms, tone, niche }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResults(data.results)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Distribution failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">📡</div>
        <span className="font-bold text-xl">ContentDistro.ai</span>
        <span className="text-gray-500 ml-2">/ Distribution Engine</span>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Content Distribution Engine</h1>
        <p className="text-gray-400 mb-10">Paste your content. Select platforms. Get platform-native versions in 30 seconds.</p>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <label className="block text-sm text-gray-400 mb-2">Your Original Content *</label>
              <textarea value={originalContent} onChange={(e) => setOriginalContent(e.target.value)}
                placeholder="Paste your blog post, article, idea, or any piece of content here..."
                rows={8} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 resize-none mb-4" />

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Tone</label>
                  <select value={tone} onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500">
                    {["Professional", "Casual", "Humorous", "Inspirational", "Educational"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Niche</label>
                  <select value={niche} onChange={(e) => setNiche(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500">
                    {["Business", "Tech", "Lifestyle", "Finance", "Health", "Marketing", "Education"].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map(p => (
                    <button key={p} onClick={() => togglePlatform(p)}
                      className={`text-xs px-3 py-1 rounded-full border transition-colors ${selectedPlatforms.includes(p) ? "bg-emerald-600 border-emerald-500 text-white" : "border-gray-700 text-gray-400 hover:border-gray-500"}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {error && <div className="bg-red-900/30 border border-red-800 rounded-lg px-4 py-3 mb-4"><p className="text-red-400 text-sm">{error}</p></div>}
              <button onClick={handleDistribute} disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-900 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Distributing...</> : `📡 Distribute to ${selectedPlatforms.length} Platforms`}
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((r, i) => (
                  <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-sm">{r.platform}</h3>
                      <button onClick={() => navigator.clipboard.writeText(r.content)}
                        className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-lg">Copy</button>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{r.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center h-full text-center">
                <div className="text-5xl mb-4">📡</div>
                <p className="text-gray-500">Your platform-native content will appear here.<br />Select platforms and click Distribute.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}