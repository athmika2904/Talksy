import express from "express"
import { generateReplies } from "../services/aiService.js"

const router = express.Router()

router.post("/reply", async (req, res) => {

    try {

        const { message, context ,tone,concerns,intent } = req.body

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
            context,
            tone,
            concerns,
            intent
        )

        res.json({
            success: true,
            replies: result
        })

    } catch (error) {
        console.error("AI Error:", error.message);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

export default router