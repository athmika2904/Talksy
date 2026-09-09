import mongoose from "mongoose"

const dailyChallengeSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
            unique: true,
        },

        challengeId: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },

        reward: {
            type: Number,
            required: true,
        },

        skill: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
)

const DailyChallenge =
    mongoose.model(
        "DailyChallenge",
        dailyChallengeSchema
    )

export default DailyChallenge