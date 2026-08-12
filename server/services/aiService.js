import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.resolve(__dirname, "../.env")
})

export async function generateReplies(message, tone) {

    const response = await fetch(
        "https://router.huggingface.co/v1/chat/completions",
        {
            method: "POST",

            headers: {
                "Authorization": `Bearer ${process.env.HF_TOKEN}`,
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                model: "Qwen/Qwen2.5-7B-Instruct",

                messages: [
                    {
                        role: "system",
                        content: `
You are a natural Gen-Z social communication coach.

Help users write replies to everyday messages.

Keep replies:
- natural
- casual
- short
- realistic
- not overly slangy
- not cringe
- appropriate for teenagers and young adults

Requested tone: ${tone}

Generate exactly 3 possible replies.
`
                    },

                    {
                        role: "user",
                        content: message
                    }
                ],

                max_tokens: 300,
                temperature: 0.8
            })
        }
    )

    const data = await response.json()

    console.log("HF STATUS:", response.status)
    console.log("HF RESPONSE:", data)

    if (!response.ok) {
        console.error("========== HUGGING FACE ERROR ==========")
    console.error("HTTP STATUS:", response.status)
    console.error("RESPONSE:", JSON.stringify(data, null, 2))
    console.error("========================================")

    throw new Error(
        JSON.stringify(data)
    )
    }

    return data.choices[0].message.content
}