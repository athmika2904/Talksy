import express from "express"
import { generateReplies,analyzeScreenshot } from "../services/aiService.js"
import upload from "../middleware/upload.js"
const router = express.Router()

router.post(
    "/reply",
    upload.single("screenshot"),
    async (req, res) => {

        try {

            console.log("BODY:", req.body)

            console.log(
                "FILE:",
                req.file
                    ? {
                        name: req.file.originalname,
                        type: req.file.mimetype,
                        size: req.file.size,
                    }
                    : null
            )
             if (req.body.mode === "screenshot") {

                if (!req.file) {

                    return res.status(400).json({
                        success: false,
                        message: "Screenshot is required.",
                    })

                }


                const conversation =
                    await analyzeScreenshot(
                        req.file.buffer,
                        req.file.mimetype
                    )


                console.log(
                    "AI UNDERSTOOD:",
                    conversation
                )
                const concerns =
                    JSON.parse(req.body.concerns || "[]")

                const replies =
                    await generateReplies(
                        conversation,
                        req.body.context,
                        req.body.tone,
                        concerns,
                        req.body.intent,
                        "conversation"
                    )


                return res.json({
                    success: true,
                    replies,
                })
            }

            const concerns =
                JSON.parse(req.body.concerns || "[]")

            const replies =
                await generateReplies(
                    req.body.message,
                    req.body.context,
                    req.body.tone,
                    concerns,
                    req.body.intent,
                    req.body.mode
                )


            return res.json({
                success: true,
                replies,
            })


        } catch (error) {

            console.error(error)

            res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }
)

export default router