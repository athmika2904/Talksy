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

    

    if (!response.ok) {
       throw new Error(data.error?.message || "Hugging Face API error");
    }
    const aiText = data.choices[0].message.content

    const replies = aiText
        .split("\n")
        .map(reply => reply.trim())
        .filter(reply => reply.length > 0)
        .map(reply => reply.replace(/^\d+[\).\-\s]+/, ""))
        .slice(0, 3)

    return replies
}