import express from "express"
import { generateReplies } from "../services/aiService.js"
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
            res.json({
                success: true,
                message: "Screenshot received successfully",
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