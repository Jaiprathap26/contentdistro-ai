import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { content, platforms, tone, niche } = await req.json()
    if (!content || !platforms?.length) return NextResponse.json({ error: "Content and platforms required" }, { status: 400 })

    const platformGuides: Record<string, string> = {
      "Twitter/X": "Max 280 chars. Hook-first. Conversational. Can be a thread opener (end with 🧵). No hashtag spam.",
      "LinkedIn": "Professional tone. Start with a bold statement. 150-300 words. Break into short paragraphs. 3-5 hashtags at end.",
      "Instagram Caption": "Engaging opener before the fold. Mix emojis naturally. 5-10 relevant hashtags. CTA at end.",
      "TikTok Script": "Hook in first 3 seconds. Conversational speech. 60-90 seconds when spoken aloud. Pattern interrupt style.",
      "YouTube Description": "First 2 lines visible in search. Include target keywords naturally. Timestamps if applicable. Links section.",
      "Reddit Post": "No marketing speak. Genuine value-first. Match subreddit tone. Question or insight format works best.",
      "Facebook": "Conversational. Can be longer. Story format. Ask a question to boost comments.",
      "WhatsApp Status": "Short, personal, direct. As if texting a friend. Max 3 lines.",
      "Threads": "Casual Twitter vibes. Keep under 500 chars. Authentic voice.",
      "Email Newsletter": "Subject line + preview text + body. Personal greeting. 300-500 words. One clear CTA.",
    }

    const platformInstructions = platforms.map((p: string) => `### ${p}
${platformGuides[p] || "Platform-appropriate format"}`).join("

")

    const response = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 4000,
      system: `You are ContentDistro.ai — an expert content strategist who rewrites content natively for each social media platform. You understand each platform's culture, algorithm, and audience deeply. Tone: ${tone}. Niche: ${niche}.`,
      messages: [{
        role: "user",
        content: `Rewrite this content for each platform listed below. Each version must be platform-native — not just shortened, but truly adapted to how that platform's users speak and engage.

ORIGINAL CONTENT:
${content}

PLATFORM REQUIREMENTS:
${platformInstructions}

For each platform, output EXACTLY:
### [Platform Name]
[The platform-native content]
---`
      }]
    })

    const rawText = response.content[0].type === "text" ? response.content[0].text : ""
    const results = platforms.map((platform: string) => {
      const regex = new RegExp(`### ${platform.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\n([\s\S]*?)(?=###|$)`)
      const match = rawText.match(regex)
      return { platform, content: match ? match[1].replace(/^---\s*/, "").trim() : `Content for ${platform} — regenerate to get platform-specific version.` }
    })

    return NextResponse.json({ results })
  } catch (error) {
    return NextResponse.json({ error: "Distribution failed" }, { status: 500 })
  }
}