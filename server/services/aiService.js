import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import { GoogleGenAI } from "@google/genai"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({
    path: path.resolve(__dirname, "../.env")
})
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
})

export async function generateReplies(
    message,
    context,
    tone,
    concerns,
    intent,
    mode
) {


    let parsedConcerns = concerns

    if (typeof concerns === "string") {
        try {
            parsedConcerns = JSON.parse(concerns)
        } catch {
            parsedConcerns = []
        }
    }

    if (!Array.isArray(parsedConcerns)) {
        parsedConcerns = []
    }



    const systemPrompt = `
You are a natural Gen-Z social communication coach.

Your job is to help young people write realistic replies
to everyday conversations.

Your replies should feel like something a real person would
actually send on WhatsApp, Instagram, Snapchat, or text.

IMPORTANT STYLE RULES:

- Keep replies short.
- Keep replies natural.
- Keep replies realistic.
- Use normal modern texting language.
- Do not sound like an AI assistant.
- Do not sound like a therapist.
- Do not over-explain.
- Do not use unnecessarily formal language.
- Do not use excessive slang.
- Do not use cringe Gen-Z slang.
- Do not use excessive emojis.
- Use emojis only when they naturally fit.
- Do not make the user sound dramatically different from
  how a normal young person would text.
- Never shame the user for being nervous.
- Help the user communicate confidently.
- Do not make decisions for the user.
- Do not give medical or mental-health diagnoses.

The requested tone is:

${tone}

Generate exactly 3 possible replies.

The 3 replies MUST be meaningfully different.

For example:

Reply 1:
Simple and natural.

Reply 2:
A little more playful or relaxed.

Reply 3:
Slightly more confident.

Do NOT repeat the same sentence structure.

Do NOT explain why the replies are good.

Do NOT provide advice outside the replies.

Do NOT write an introduction.

Do NOT say:
"Here are three replies"
"Here are some options"
"Possible responses:"
or anything similar.

Do NOT number the replies.

Do NOT put quotation marks around the replies.

VERY IMPORTANT:

Return ONLY valid JSON.

The response MUST follow this exact structure:

{
  "replies": [
    "reply 1",
    "reply 2",
    "reply 3"
  ]
}
The 3 replies MUST have different approaches.

Reply 1:
The safest and most natural option.

Reply 2:
A slightly more playful or relaxed option.

Reply 3:
A slightly more confident or direct option.

Do not simply change one or two words between replies.

Each reply should give the user a genuinely different
way to respond.
There must be exactly 3 strings inside the replies array.

Do not add anything before or after the JSON.
`



    const userPrompt = `

USER MESSAGE:

"${message || "No direct message was provided."}"


SOCIAL CONTEXT:

"${context || "No additional context provided."}"


REQUESTED TONE:

"${tone}"


USER CONCERNS:

${
    parsedConcerns.length > 0
        ? parsedConcerns.join(", ")
        : "No specific concern provided."
}


USER'S GOAL:

"${intent || "Continue the conversation"}"
id="intent-rules"
IMPORTANT INTENT RULE:

The user's selected goal is the MOST IMPORTANT instruction
when generating the replies.

The replies must clearly accomplish this goal.

If the goal is "Continue the conversation":
Keep the conversation naturally going.

If the goal is "Make plans":
Move the conversation toward making or confirming plans.

If the goal is "Show interest":
Show genuine interest and encourage the other person to continue.

If the goal is "Politely decline":
Clearly decline without sounding rude or unnecessarily apologetic.

If the goal is "Apologize":
Acknowledge what happened and give a natural apology.

If the goal is "Set a boundary":
Be respectful but clearly communicate the user's boundary.

If the goal is "Keep it short":
Keep each reply extremely concise, ideally one sentence.

Never ignore the user's selected goal.

MODE:

"${mode}"


IMPORTANT INSTRUCTIONS FOR THIS MODE:

${
    mode === "screenshot"
        ? `
This is SCREENSHOT MODE.

The social context above was extracted from a screenshot
of a real conversation.

Use that extracted conversation context carefully.

Your job is to help the USER reply to the OTHER PERSON.

Do NOT create a reply to something the user already said.

Pay special attention to:

- who sent each message
- which messages belong to the user
- which messages belong to the other person
- the latest message sent by the other person
- what the other person is expecting
- the flow of the conversation
- the emotional tone
- what would naturally make sense as the next message

If the screenshot analysis says that the latest message
was sent by the user, do NOT treat that message as the
message requiring a reply.

Instead, use the most recent message from the OTHER PERSON
that actually needs a response.

The goal is to generate what the USER could naturally
send next.
`
        : mode === "conversation"
        ? `
This is FULL CONVERSATION MODE.

Understand the entire conversation.

Determine:

- who said what
- how the conversation is flowing
- what the other person means
- what the other person is likely expecting
- the emotional tone
- what the natural next message would be

Do NOT respond to every message.

Generate only possible next messages that the USER
could send.
`
        : `
This is SINGLE MESSAGE MODE.

Focus on the message the user received.

Generate natural replies to that message.
`
}


Generate exactly 3 replies now.
`



    const response = await fetch(
        "https://router.huggingface.co/v1/chat/completions",
        {
            method: "POST",

            headers: {
                "Authorization": `Bearer ${process.env.HF_TOKEN}`,
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                model: "meta-llama/Llama-3.1-8B-Instruct",

                messages: [

                    {
                        role: "system",
                        content: systemPrompt
                    },

                    {
                        role: "user",
                        content: userPrompt
                    }

                ],

                max_tokens: 300,

                temperature: 0.8

            })
        }
    )



    const data = await response.json()



    if (!response.ok) {

        throw new Error(
            data.error?.message ||
            data.message ||
            "Hugging Face API error"
        )
    }


    const aiText =
        data.choices?.[0]?.message?.content?.trim()


    if (!aiText) {
        throw new Error("AI returned an empty response.")
    }


    console.log("AI RAW RESPONSE:")
    console.log(aiText)




    let parsedResponse

    try {

        parsedResponse = JSON.parse(aiText)

    } catch (error) {

        console.error(
            "AI returned invalid JSON:"
        )

        console.error(aiText)

        throw new Error(
            "AI returned an invalid response format."
        )
    }


    if (
        !parsedResponse.replies ||
        !Array.isArray(parsedResponse.replies)
    ) {

        throw new Error(
            "AI response does not contain a replies array."
        )
    }


    if (parsedResponse.replies.length !== 3) {

        throw new Error(
            `AI returned ${parsedResponse.replies.length} replies instead of exactly 3.`
        )
    }



    const replies = parsedResponse.replies
        .map(reply => String(reply).trim())
        .filter(reply => reply.length > 0)


    if (replies.length !== 3) {

        throw new Error(
            "AI did not return 3 valid replies."
        )
    }


    console.log("FINAL REPLIES:")
    console.log(replies)


    return replies
}


export async function analyzeScreenshot(
    imageBuffer,
    mimeType
) {

    try {

        const base64Image =
            imageBuffer.toString("base64")


        const prompt = `

You are a conversation-analysis AI for a social
communication assistant.

The user uploaded a screenshot of a conversation.

Your ONLY job is to understand the conversation.

DO NOT generate replies.

DO NOT give advice.

DO NOT judge anyone.

DO NOT mention unnecessary private information.

Carefully inspect the screenshot and determine:

1. WHO IS SPEAKING

Identify the different people in the conversation.

Determine which messages belong to the USER and which
messages belong to the OTHER PERSON.

Use the conversation layout, message alignment, names,
avatars, colors, and other visual clues when available.

Do not assume that the last visible message belongs to
the other person.


2. WHAT THE OTHER PERSON SAID

Summarize the important messages sent by the OTHER PERSON.

Focus on messages relevant to continuing the conversation.


3. WHAT THE CONVERSATION IS ABOUT

Briefly explain the topic of the conversation.


4. LATEST MESSAGE REQUIRING A REPLY

This is VERY IMPORTANT.

Identify the latest message that was sent by the
OTHER PERSON and that requires a response from the USER.

DO NOT choose a message sent by the USER.

If the latest visible message belongs to the USER,
look for the most recent message from the OTHER PERSON
that naturally requires a response.

Clearly state:

Latest message requiring reply:
"[message]"

Sender:
"Other person"


5. SOCIAL AND EMOTIONAL CONTEXT

Describe only useful context such as:

- casual
- friendly
- playful
- serious
- awkward
- excited
- confused
- tense
- supportive

Do not diagnose anyone.

Do not assume emotions that are not supported by
the conversation.


IMPORTANT:

You are analyzing the screenshot for another AI.

Your output should be a short, clear summary.

Use this format:

Who is speaking:
...

What the other person said:
...

What the conversation is about:
...

Latest message requiring reply:
...

Social/emotional context:
...

DO NOT generate any replies.
`

        const response =
            await ai.models.generateContent({

                model: "gemini-3.5-flash-lite",

                contents: [

                    {
                        inlineData: {
                            data: base64Image,
                            mimeType: mimeType,
                        },
                    },

                    {
                        text: prompt,
                    },

                ],

            })



        const result = response.text


        console.log(
            "AI UNDERSTOOD:",
            result
        )


        return result


    } catch (error) {

        console.error(
            "Screenshot analysis error:",
            error
        )

        throw error
    }
}

