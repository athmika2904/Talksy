import mongoose from "mongoose"

const challengeHistorySchema = new mongoose.Schema(
    {
        challengeId: {
            type: String,
            required: true,
        },
        title: {
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
        date: {
            type: String,
            required: true,
        },
    },
    { _id: false }
)

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        xp: {
            type: Number,
            default: 0,
        },

        streak: {
            type: Number,
            default: 0,
        },

        completedChallenges: {
            type: Number,
            default: 0,
        },

        lastChallengeDate: {
            type: String,
            default: null,
        },

        challengeHistory: {
            type: [challengeHistorySchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", userSchema)

export default User