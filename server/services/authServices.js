import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/User.js"


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


export async function signupUser(
    name,
    email,
    password
) {
    const normalizedEmail =
        email.toLowerCase().trim()


    const existingUser =
        await User.findOne({
            email: normalizedEmail,
        })


    if (existingUser) {
        throw new Error(
            "An account with this email already exists."
        )
    }


    const hashedPassword =
        await bcrypt.hash(password, 10)


    const user =
        await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        })


    const token =
        jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        )


    return {
        token,
        user: formatUser(user),
    }
}


export async function loginUser(
    email,
    password
) {
    const normalizedEmail =
        email.toLowerCase().trim()


    const user =
        await User.findOne({
            email: normalizedEmail,
        })


    if (!user) {
        throw new Error(
            "Invalid email or password."
        )
    }


    const passwordMatch =
        await bcrypt.compare(
            password,
            user.password
        )


    if (!passwordMatch) {
        throw new Error(
            "Invalid email or password."
        )
    }


    const token =
        jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        )


    return {
        token,
        user: formatUser(user),
    }
}