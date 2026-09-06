import express from "express"

import {
    generatePracticeReply,
    generatePracticeFeedback
} from "../services/PracticeService.js"

const Practicerouter = express.Router()


// Practice conversation
Practicerouter.post("/session", async (req, res) => {

    try {

        const {
            situation,
            difficulty,
            messages,
        } = req.body

        if (!situation) {
            return res.status(400).json({
                success: false,
                message: "Situation is required",
            })
        }

        if (!Array.isArray(messages)) {
            return res.status(400).json({
                success: false,
                message: "Messages are required",
            })
        }

        const reply = await generatePracticeReply(
            situation,
            difficulty,
            messages
        )

        res.json({
            success: true,
            reply,
        })

    } catch (error) {

        console.error("Practice AI error:", error)

        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})


// Practice feedback
Practicerouter.post("/feedback", async (req, res) => {

    try {

        const {
            situation,
            difficulty,
            messages,
        } = req.body

        if (!situation) {
            return res.status(400).json({
                success: false,
                message: "Situation is required",
            })
        }

        if (!Array.isArray(messages)) {
            return res.status(400).json({
                success: false,
                message: "Messages are required",
            })
        }

        const feedback = await generatePracticeFeedback(
            situation,
            difficulty,
            messages
        )

        res.json({
            success: true,
            feedback,
        })

    } catch (error) {

        console.error("Practice feedback error:", error)

        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
})


export default Practicerouter