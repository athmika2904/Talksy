import express from "express"

import { protect } from "../middleware/authMiddleware.js"

import User from "../models/User.js"

import {
    signupUser,
    loginUser,
} from "../services/authServices.js"


const authRouter =
    express.Router()


function formatUser(user) {
    return {
        id: user._id,
        name: user.name,
        email: user.email,

        xp: user.xp,
        streak: user.streak,
        completedChallenges:
            user.completedChallenges,

        conversations:
            user.conversations,

        confidenceScore:
            user.confidenceScore,

        confidenceSamples:
            user.confidenceSamples,
    }
}


/*
    SIGNUP
*/

authRouter.post(
    "/signup",
    async (req, res) => {
        try {
            const {
                name,
                email,
                password,
            } = req.body


            if (
                !name ||
                !email ||
                !password
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "All fields are required.",
                })
            }


            if (password.length < 6) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Password must be at least 6 characters.",
                })
            }


            const result =
                await signupUser(
                    name,
                    email,
                    password
                )


            res.status(201).json({
                success: true,
                ...result,
            })

        } catch (error) {
            console.error(
                "Signup error:",
                error
            )

            res.status(400).json({
                success: false,
                message: error.message,
            })
        }
    }
)




authRouter.post(
    "/login",
    async (req, res) => {
        try {
            const {
                email,
                password,
            } = req.body


            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Email and password are required.",
                })
            }


            const result =
                await loginUser(
                    email,
                    password
                )


            res.json({
                success: true,
                ...result,
            })

        } catch (error) {
            console.error(
                "Login error:",
                error
            )

            res.status(401).json({
                success: false,
                message: error.message,
            })
        }
    }
)



authRouter.get(
    "/me",
    protect,
    async (req, res) => {
        try {
            const user =
                await User.findById(
                    req.userId
                ).select("-password")


            if (!user) {
                return res.status(404).json({
                    success: false,
                    message:
                        "User not found.",
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
                message:
                    "Could not get user.",
            })
        }
    }
)



authRouter.post(
    "/activity",
    protect,
    async (req, res) => {
        try {
            const {
                type,
                score,
            } = req.body


            if (
                type !== "reply" &&
                type !== "practice"
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid activity type.",
                })
            }


            const user =
                await User.findById(
                    req.userId
                )


            if (!user) {
                return res.status(404).json({
                    success: false,
                    message:
                        "User not found.",
                })
            }



            user.conversations += 1



            if (type === "practice") {

                const numericScore =
                    Number(score)


                if (
                    !Number.isFinite(
                        numericScore
                    ) ||
                    numericScore < 1 ||
                    numericScore > 10
                ) {
                    return res.status(400).json({
                        success: false,
                        message:
                            "Practice score must be between 1 and 10.",
                    })
                }



                const newScore =
                    numericScore * 10



                if (
                    user.confidenceSamples === 0
                ) {
                    user.confidenceScore =
                        newScore

                } else {

                    const total =
                        user.confidenceScore *
                        user.confidenceSamples

                    user.confidenceScore =
                        Math.round(
                            (
                                total +
                                newScore
                            ) /
                            (
                                user.confidenceSamples +
                                1
                            )
                        )
                }


                user.confidenceSamples += 1
            }


            await user.save()


            res.json({
                success: true,
                user: formatUser(user),
            })

        } catch (error) {
            console.error(
                "Activity update error:",
                error
            )

            res.status(500).json({
                success: false,
                message:
                    "Could not update progress.",
            })
        }
    }
)


export default authRouter