import express from "express"

import {
    generateDailyChallenge,
    evaluateChallenge,
} from "../services/ChallengeService.js"

const challengeRouter = express.Router()

challengeRouter.get("/today", async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0]

        const challenge = await generateDailyChallenge(today)

        res.json({
            success: true,
            challenge,
        })
    } catch (error) {
        console.error("Daily challenge error:", error)

        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

challengeRouter.post("/evaluate", async (req, res) => {
    try {
        const {
            challenge,
            reflection,
        } = req.body

        if (!challenge) {
            return res.status(400).json({
                success: false,
                message: "Challenge is required",
            })
        }

        if (!reflection || !reflection.trim()) {
            return res.status(400).json({
                success: false,
                message: "Reflection is required",
            })
        }

        const evaluation = await evaluateChallenge(
            challenge,
            reflection
        )

        res.json({
            success: true,
            evaluation,
        })
    } catch (error) {
        console.error("Challenge evaluation error:", error)

        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})

export default challengeRouter