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


function createFallbackChallenge(date) {
    const challenges = [
        {
            title: "Ask an Open Question",
            description:
                "Start a short conversation by asking someone a question that cannot be answered with just yes or no.",
            instruction:
                "Ask someone an open-ended question and stay in the conversation for at least two exchanges.",
            difficulty: "Easy",
            reward: 10,
        },

        {
            title: "Give a Genuine Compliment",
            description:
                "Say something genuinely positive to someone you interact with today.",
            instruction:
                "Give someone a specific, genuine compliment and notice how they respond.",
            difficulty: "Easy",
            reward: 10,
        },

        {
            title: "Introduce Yourself",
            description:
                "Take the initiative and introduce yourself to someone you do not usually talk to.",
            instruction:
                "Introduce yourself to someone new and ask them one simple question about themselves.",
            difficulty: "Medium",
            reward: 20,
        },

        {
            title: "Join the Conversation",
            description:
                "Practice entering an existing conversation instead of staying on the sidelines.",
            instruction:
                "Join a group conversation naturally and contribute at least one sentence.",
            difficulty: "Medium",
            reward: 20,
        },

        {
            title: "Speak Up",
            description:
                "Practice making your voice heard in a group setting.",
            instruction:
                "Share one thought, opinion, question, or idea in a group conversation today.",
            difficulty: "Hard",
            reward: 30,
        },
    ]

    const index =
        Math.abs(
            date
                .split("")
                .reduce(
                    (sum, char) =>
                        sum + char.charCodeAt(0),
                    0
                )
        ) % challenges.length

    const selected = challenges[index]

    return {
        id: `${date}-social-challenge`,
        ...selected,
    }
}


export async function generateDailyChallenge(
    date,
    recentHistory = []
) {
    const recentChallenges = recentHistory
        .slice(0, 10)
        .map(
            (item) =>
                `- ${item.title}: ${item.instruction}`
        )
        .join("\n")

    const prompt = `
You are the daily challenge designer for TALKSY,
an AI-powered social confidence app.

Create ONE realistic real-world social confidence
challenge for today.

Date:
${date}

Previous challenges completed by this user:
${recentChallenges || "- None"}

IMPORTANT:
The new challenge MUST be meaningfully different
from the previous challenges.

Do NOT simply change the wording of an old challenge.

For example, if the user previously:
- started a conversation
- talked to someone new

do NOT generate another challenge that simply says:
- talk to someone new
- start a conversation

Instead vary the actual social skill.

Possible skills include:
- asking open-ended questions
- giving a genuine compliment
- introducing yourself
- joining an existing group
- sharing an opinion
- asking for help
- asking a follow-up question
- speaking up in a group
- maintaining eye contact naturally
- remembering someone's name
- thanking someone sincerely
- continuing a conversation
- initiating a short interaction
- expressing a preference
- disagreeing politely
- starting a conversation with a familiar person
- talking to a classmate
- talking to a colleague

Requirements:
- real-world action
- achievable in one day
- no money required
- no dangerous situations
- no inappropriate situations
- no roleplay
- no dating pressure
- no forced interaction with strangers in unsafe places
- realistic for a college student or young adult
- concise
- encouraging
- slightly harder for harder difficulty

Choose exactly one difficulty.

Return ONLY valid JSON.

Format:

{
  "id": "unique-kebab-case-id",
  "title": "short challenge title",
  "description": "one short explanation",
  "difficulty": "Easy",
  "instruction": "clear real-world action",
  "reward": 10
}

Difficulty:
Easy = 10 XP
Medium = 20 XP
Hard = 30 XP
`

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt,
        })

        const cleaned = cleanJson(response.text)

        const challenge = JSON.parse(cleaned)

        return {
            id: `${date}-${challenge.id || "challenge"}`,
            title: challenge.title,
            description: challenge.description,
            difficulty: challenge.difficulty,
            instruction: challenge.instruction,
            reward:
                challenge.difficulty === "Hard"
                    ? 30
                    : challenge.difficulty === "Medium"
                        ? 20
                        : 10,
        }
    } catch (error) {
        console.error(
            "AI challenge generation failed:",
            error.message
        )

        return createFallbackChallenge(date)
    }
}


export async function evaluateChallenge(
    challenge,
    reflection
) {
    const prompt = `
You are an encouraging social confidence coach.

Evaluate the user's reflection after attempting
a real-world social challenge.

Do NOT pretend you can verify whether the user
actually completed the challenge.

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
- whether the reflection suggests they attempted it
- what they did well
- what they can improve
- one practical next step
- confidence score from 1 to 10

Keep the feedback encouraging and realistic.

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
- keep text concise
- never shame the user
- never claim that you verified the event
`

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
    })

    const cleaned = cleanJson(response.text)

    return JSON.parse(cleaned)
}