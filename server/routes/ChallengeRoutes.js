import express from "express"
import User from "../models/User.js"
import { protect } from "../middleware/authMiddleware.js"
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
challengeRouter.post("/complete", protect, async (req, res) => {
    try {
        const {
            challengeId,
            title,
            difficulty,
            reward,
            date,
        } = req.body

        if (
            !challengeId ||
            !title ||
            !difficulty ||
            !reward ||
            !date
        ) {
            return res.status(400).json({
                success: false,
                message: "Challenge details are required.",
            })
        }

        const user = await User.findById(req.userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            })
        }

        // Prevent completing the same challenge twice
        const alreadyCompleted =
            user.challengeHistory.some(
                (item) =>
                    item.challengeId === challengeId &&
                    item.date === date
            )

        if (alreadyCompleted) {
            return res.status(400).json({
                success: false,
                message: "Challenge already completed.",
            })
        }

        // Calculate streak
        let newStreak = 1

        if (user.lastChallengeDate) {
            const previousDate = new Date(
                user.lastChallengeDate
            )

            const currentDate = new Date(date)

            const difference =
                (currentDate - previousDate) /
                (1000 * 60 * 60 * 24)

            if (difference === 1) {
                newStreak = user.streak + 1
            }
        }

        user.xp += reward
        user.streak = newStreak
        user.completedChallenges += 1
        user.lastChallengeDate = date

        user.challengeHistory.unshift({
            challengeId,
            title,
            difficulty,
            reward,
            date,
        })

        await user.save()

        res.json({
            success: true,
            user: {
                xp: user.xp,
                streak: user.streak,
                completedChallenges:
                    user.completedChallenges,
                challengeHistory:
                    user.challengeHistory,
            },
        })
    } catch (error) {
        console.error(
            "Challenge completion error:",
            error
        )

        res.status(500).json({
            success: false,
            message: "Could not save challenge progress.",
        })
    }
})
export default challengeRouter