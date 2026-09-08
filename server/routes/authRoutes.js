import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import User from "../models/User.js"
import {
    signupUser,
    loginUser,
} from "../services/authServices.js"

const authRouter = express.Router()


authRouter.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters.",
            })
        }

        const result = await signupUser(
            name,
            email,
            password
        )

        res.status(201).json({
            success: true,
            ...result,
        })
    } catch (error) {
        console.error("Signup error:", error)

        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
})


authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            })
        }

        const result = await loginUser(
            email,
            password
        )

        res.json({
            success: true,
            ...result,
        })
    } catch (error) {
        console.error("Login error:", error)

        res.status(401).json({
            success: false,
            message: error.message,
        })
    }
})
authRouter.get("/me", protect, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
            .select("-password")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            })
        }

        res.json({
            success: true,
            user,
        })
    } catch (error) {
        console.error(
            "Get user error:",
            error
        )

        res.status(500).json({
            success: false,
            message: "Could not get user.",
        })
    }
})

export default authRouter