import express from "express"
import { generateReplies } from "../services/aiService.js"

const router = express.Router()

router.post("/reply", async (req, res) => {

    try {

        const { message, tone } = req.body

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message is required",
            })
        }

        if (!tone) {
            return res.status(400).json({
                success: false,
                message: "Tone is required",
            })
        }

        const result = await generateReplies(
            message,
            tone
        )

        res.json({
            success: true,
            data: result,
        })

    } catch (error) {
        console.error("========== AI ERROR ==========")
    console.error("Message:", error.message)
    console.error("Status:", error.status)
    console.error("Response:", error.response)
    console.error("Cause:", error.cause)
    console.error("==============================")

    res.status(500).json({
        success: false,
        message: error.message,
        status: error.status || null
    })
        
    }
})

export default router