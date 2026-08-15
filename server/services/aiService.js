import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.resolve(__dirname, "../.env")
})

export async function generateReplies(message,context, tone,concerns) {

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

                The goal is to help the user communicate confidently,
                not to make decisions for them.

                Never shame the user for being nervous or socially uncomfortable.

                Do not make the user sound dramatically different from how
                a normal young person would actually text.

                If the context suggests anxiety or uncertainty, keep the
                response supportive and low-pressure.

                Do not give medical or mental-health diagnoses.

                        Requested tone: ${tone}

                        Generate exactly 3 possible replies.
                        Each reply should be noticeably different in wording and approach.

                        For example:
                        - one can be simple and casual
                        - one can be playful
                        - one can be slightly more confident

                        Do not repeat the same sentence structure.

                        Write like a real young person texting.
                        Avoid cringe slang, excessive emojis, and robotic language.
                        `
                                            },

                                            {
                                            role: "user",
                                            content: `
                                            Message they received:
                                            "${message}"

                                            Social context:
                                            "${context || "No additional context provided."}"
                                            
                                            Tone:
                                            "${tone}"

                                            What the user is struggling with:
                                            ${
                                                concerns?.length
                                                    ? concerns.join(", ")
                                                    : "No specific concern provided."
                                            }

                            Generate exactly 3 possible replies.

                            Each reply should be noticeably different in wording
                            and approach.

                            The replies should directly address the user's situation
                            without explicitly mentioning their concerns.

                            Keep the replies natural and realistic for a young person`
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