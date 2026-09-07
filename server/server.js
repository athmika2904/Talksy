import express from "express"
import cors from "cors"

import aiRoutes from "./routes/aiRoutes.js"
import Practicerouter from "./routes/practiceRoutes.js"
import challengeRouter from "./routes/ChallengeRoutes.js"
const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "Social Anxiety Assistant API is running"
    })
})

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        project: "Social Anxiety Assistant"
    })
})

app.use("/api/ai", aiRoutes)
app.use("/api/practice", Practicerouter)
app.use("/api/challenges",challengeRouter)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})