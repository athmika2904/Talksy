import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai"

dotenv.config()

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
})

function cleanJson(text) {
    return text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim()
}

export async function generateDailyChallenge(date) {
    const prompt = `
You are the challenge designer for a social confidence app.

Create ONE realistic real-world social challenge for the user.

Date:
${date}

The challenge should:
- be something a person can realistically do today
- help improve social confidence
- require a real-world action
- NOT be a roleplay
- NOT require the user to spend money
- NOT involve dangerous or inappropriate situations
- be achievable in one day
- become slightly harder as difficulty increases

Possible situations:
- talking to someone new
- starting a conversation
- asking a question
- joining a group
- speaking up
- giving a genuine compliment
- continuing a conversation
- introducing yourself
- talking to a classmate
- talking to a colleague

Choose ONE situation.

Return ONLY valid JSON.

Format:
{
  "id": "unique-kebab-case-id",
  "title": "short challenge title",
  "description": "one short explanation",
  "difficulty": "Easy",
  "instruction": "clear action the user should actually do",
  "reward": 10
}

Difficulty must be exactly one of:
"Easy", "Medium", "Hard"

Reward must be:
Easy = 10
Medium = 20
Hard = 30
`

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
    })

    const cleaned = cleanJson(response.text)

    return JSON.parse(cleaned)
}

export async function evaluateChallenge(
    challenge,
    reflection
) {
    const prompt = `
You are an encouraging social confidence coach.

Evaluate the user's reflection after attempting a real-world social challenge.

Do NOT pretend you can verify whether the user actually completed the challenge.

Judge only what the user reported.

Challenge:
${challenge.title}

Challenge instruction:
${challenge.instruction}

Difficulty:
${challenge.difficulty}

User reflection:
${reflection}

Evaluate:
- whether their reflection suggests they attempted the challenge
- what they did well
- what they can improve
- one practical next step
- confidence score from 1 to 10

Keep feedback encouraging and realistic.

Return ONLY valid JSON.

Format:
{
  "completed": true,
  "score": 8,
  "feedback": "short encouraging feedback",
  "strength": "one thing they did well",
  "improvement": "one thing they can improve",
  "nextStep": "one practical next step"
}

Rules:
- completed must be true or false
- score must be an integer from 1 to 10
- keep every text field concise
- never shame the user
- never claim that you verified the real-world event
`

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
    })

    const cleaned = cleanJson(response.text)

    return JSON.parse(cleaned)
}