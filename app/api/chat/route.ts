import { NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { xai } from "@ai-sdk/xai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Prepare the conversation history
    const conversation = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }))

    // Add system message if not present
    if (!conversation.some((msg: any) => msg.role === "system")) {
      conversation.unshift({
        role: "system",
        content:
          "You are Fin, the FinX AI assistant. You specialize in personal finance, budgeting, investing, and financial planning. Provide helpful, accurate, and concise financial advice. Be friendly and supportive. If you don't know something, admit it rather than making up information. Always prioritize the user's financial well-being.",
      })
    }

    // Try to use Grok first, fall back to Groq if Grok fails
    try {
      if (process.env.XAI_API_KEY) {
        const { text } = await generateText({
          model: xai("grok-1"),
          messages: conversation,
        })

        return NextResponse.json({ content: text })
      }
    } catch (error) {
      console.error("Error with Grok:", error)
      // Fall back to Groq
    }

    // Use Groq as fallback
    if (process.env.GROQ_API_KEY) {
      const { text } = await generateText({
        model: groq("llama3-70b-8192"),
        messages: conversation,
      })

      return NextResponse.json({ content: text })
    }

    // If neither API key is available
    return NextResponse.json({
      content: "I'm sorry, I'm not able to respond right now. Please check the API configuration.",
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
