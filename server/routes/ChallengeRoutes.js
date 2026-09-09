import express from "express"

import User from "../models/User.js"
import DailyChallenge from "../models/DailyChallenge.js"

import { protect } from "../middleware/authMiddleware.js"

import {
    generateDailyChallenge,
    evaluateChallenge,
} from "../services/ChallengeService.js"


const challengeRouter = express.Router()


function isValidDate(date) {
    return /^\d{4}-\d{2}-\d{2}$/.test(date)
}


function dateToNumber(date) {
    const [year, month, day] =
        date.split("-").map(Number)

    return Date.UTC(
        year,
        month - 1,
        day
    )
}



function calculateStreak(history) {
    if (!history || history.length === 0) {
        return 0
    }


    const uniqueDates = [
        ...new Set(
            history.map(
                (item) => item.date
            )
        ),
    ]


    uniqueDates.sort(
        (a, b) =>
            dateToNumber(b) -
            dateToNumber(a)
    )


    let streak = 1


    for (
        let i = 1;
        i < uniqueDates.length;
        i++
    ) {
        const current =
            dateToNumber(
                uniqueDates[i - 1]
            )


        const previous =
            dateToNumber(
                uniqueDates[i]
            )


        const difference =
            (current - previous) /
            (1000 * 60 * 60 * 24)


        if (difference === 1) {
            streak += 1
        } else {
            break
        }
    }


    return streak
}



function getRewardByDifficulty(
    difficulty
) {
    const rewards = {
        Easy: 10,
        Medium: 20,
        Hard: 30,
    }

    return rewards[difficulty]
}




challengeRouter.get(
    "/today",
    protect,
    async (req, res) => {
        try {

            const { date } = req.query


            

            if (
                typeof date !== "string" ||
                !isValidDate(date)
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "A valid date is required.",
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


           

            const history =
                user.challengeHistory || []



            let dailyChallenge =
                await DailyChallenge.findOne({
                    date,
                })



            if (!dailyChallenge) {

                const generatedChallenge =
                    await generateDailyChallenge(
                        date,
                        history
                    )


                const reward =
                    getRewardByDifficulty(
                        generatedChallenge.difficulty
                    )


                

                dailyChallenge =
                    await DailyChallenge.create({

                        date,

                        challengeId:
                            generatedChallenge.id,

                        title:
                            generatedChallenge.title,

                        description:
                            generatedChallenge.description,

                        difficulty:
                            generatedChallenge.difficulty,

                        reward,

                        skill:
                            generatedChallenge.skill ||
                            "",
                    })
            }



            const completedToday =
                history.some(
                    (item) =>
                        item.date === date
                )


      

            const streak =
                calculateStreak(history)


            const uniqueCompletedDates = [
                ...new Set(
                    history.map(
                        (item) => item.date
                    )
                ),
            ]


            const completedChallenges =
                uniqueCompletedDates.length



            if (
                user.completedChallenges !==
                completedChallenges ||
                user.streak !== streak
            ) {

                user.completedChallenges =
                    completedChallenges

                user.streak =
                    streak

                await user.save()
            }


            res.json({

                success: true,

                challenge: {

                    id:
                        dailyChallenge.challengeId,

                    title:
                        dailyChallenge.title,

                    description:
                        dailyChallenge.description,

                    difficulty:
                        dailyChallenge.difficulty,

                    reward:
                        dailyChallenge.reward,

                    skill:
                        dailyChallenge.skill,
                },


                progress: {

                    xp:
                        user.xp,

                    streak,

                    completedChallenges,

                    history,

                    completedToday,
                },
            })


        } catch (error) {

            console.error(
                "Daily challenge error:",
                error
            )


            res.status(500).json({

                success: false,

                message:
                    "Couldn't load today's challenge.",
            })
        }
    }
)




challengeRouter.post(
    "/evaluate",
    protect,
    async (req, res) => {

        try {

            const {
                challenge,
                reflection,
            } = req.body


            if (!challenge) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Challenge is required.",
                })
            }


            if (
                !reflection ||
                !reflection.trim()
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Reflection is required.",
                })
            }


           

            const evaluation =
                await evaluateChallenge(
                    challenge,
                    reflection
                )


            res.json({

                success: true,

                evaluation,
            })


        } catch (error) {

            console.error(
                "Challenge evaluation error:",
                error
            )


            res.status(500).json({

                success: false,

                message:
                    "Could not evaluate challenge.",
            })
        }
    }
)



challengeRouter.post(
    "/complete",
    protect,
    async (req, res) => {

        try {

            const {
                challengeId,
                date,
            } = req.body


        
            if (
                !challengeId ||
                !date
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Challenge ID and date are required.",
                })
            }


            if (!isValidDate(date)) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid challenge date.",
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


            

            const dailyChallenge =
                await DailyChallenge.findOne({
                    date,
                })


            if (!dailyChallenge) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Daily challenge not found.",
                })
            }



            if (
                dailyChallenge.challengeId !==
                challengeId
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "This is not today's challenge.",
                })
            }



            const alreadyCompleted =
                user.challengeHistory.some(
                    (item) =>
                        item.date === date
                )


            if (alreadyCompleted) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Today's challenge is already completed.",
                })
            }

            const reward =
                getRewardByDifficulty(
                    dailyChallenge.difficulty
                )


            if (reward === undefined) {

                return res.status(500).json({

                    success: false,

                    message:
                        "Invalid challenge difficulty.",
                })
            }


            user.challengeHistory.unshift({

                challengeId:
                    dailyChallenge.challengeId,

                title:
                    dailyChallenge.title,

                difficulty:
                    dailyChallenge.difficulty,

                reward,

                date,
            })


            user.xp += reward



            const uniqueCompletedDates = [
                ...new Set(
                    user.challengeHistory.map(
                        (item) => item.date
                    )
                ),
            ]


         

            user.completedChallenges =
                uniqueCompletedDates.length


            user.streak =
                calculateStreak(
                    user.challengeHistory
                )


            await user.save()


           

            res.json({

                success: true,

                user: {

                    id:
                        user._id,

                    name:
                        user.name,

                    email:
                        user.email,

                    xp:
                        user.xp,

                    streak:
                        user.streak,

                    completedChallenges:
                        user.completedChallenges,

                    challengeHistory:
                        user.challengeHistory,
                },
            })


        } catch (error) {

            console.error(
                "Challenge completion error:",
                error
            )


            res.status(500).json({

                success: false,

                message:
                    "Could not save your progress.",
            })
        }
    }
)


export default challengeRouter