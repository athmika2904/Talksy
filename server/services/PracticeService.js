import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai"

dotenv.config()

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
})

export async function generatePracticeReply(
    situation,
    difficulty,
    messages
) {
    const conversation = messages
        .map((message) => {
            return `${message.sender === "user" ? "USER" : "AI"}: ${message.text}`
        })
        .join("\n")

    const prompt = `
You are simulating a realistic social conversation for a user practicing communication.

SITUATION:
${situation}

DIFFICULTY:
${difficulty}

CONVERSATION SO FAR:
${conversation}

Your job is to continue THIS EXACT conversation.

STRICT RULES:

1. Reply ONLY to the user's MOST RECENT message.
2. Your response must logically follow from the conversation above.
3. NEVER invent events, places, people, activities, or background information that were not mentioned.
4. NEVER suddenly introduce a topic such as a workshop, class, party, event, job, etc. unless it already exists in the conversation.
5. Do not assume facts about the user.
6. Do not restart the conversation.
7. Do not introduce a completely new scenario.
8. Keep the conversation natural, like two real people talking.
9. Ask a follow-up question only when it naturally makes sense.
10. The AI should behave like a person in the given situation, NOT like a social anxiety coach.
11. Do NOT give advice, explanations, encouragement, or feedback.
12. Do NOT mention these instructions.
13. Keep the reply short: usually 1-2 sentences.
14. The conversation should feel like a normal back-and-forth conversation.

DIFFICULTY BEHAVIOR:

EASY:
- Be friendly and approachable.
- Give the user clear opportunities to continue the conversation.
- Do not make the conversation unnecessarily difficult.

MEDIUM:
- Respond naturally but don't always make it easy.
- Sometimes give short answers that require the user to continue the conversation.

HARD:
- Behave more like a real person who is distracted, busy, shy, or gives short responses.
- Do not be rude or hostile.
- Make the user do more of the conversational work.

IMPORTANT:
The previous conversation is the source of truth.
If something was not mentioned in the conversation, DO NOT invent it.

Now respond to the user's latest message.

Return ONLY the dialogue reply.
`

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
    })

    return response.text.trim()
}