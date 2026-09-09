import {
    useLocation,
    useNavigate,
} from "react-router-dom"

import {
    useEffect,
    useRef,
    useState,
} from "react"

import axios from "axios"

import {
    useAuth,
} from "../../context/AuthContext"


interface Message {
    id: number
    sender: "ai" | "user"
    text: string
}


interface FeedbackState {
    situation: string
    difficulty: string
    messages: Message[]
}


interface Feedback {
    score: number
    strengths: string[]
    improvements: string[]
    tip: string
}


const API_URL =
    "http://localhost:5000"


function PracticeFeedback() {

    const location =
        useLocation()

    const navigate =
        useNavigate()


    const {
        token,
        updateUser,
    } = useAuth()


    const state =
        location.state as
        FeedbackState |
        undefined


    const [feedback, setFeedback] =
        useState<Feedback | null>(null)


    const [loading, setLoading] =
        useState(true)


    const [error, setError] =
        useState("")


    /*
        Prevent duplicate progress
        updates during React development
        StrictMode effect re-runs.
    */

    const activityRecorded =
        useRef(false)


    useEffect(() => {

        async function getFeedback() {

            if (!state) {

                setLoading(false)

                return
            }


            try {

                /*
                    Get AI feedback
                */

                const response =
                    await axios.post(
                        `${API_URL}/api/practice/feedback`,
                        {
                            situation:
                                state.situation,

                            difficulty:
                                state.difficulty,

                            messages:
                                state.messages,
                        }
                    )


                const generatedFeedback =
                    response.data.feedback


                setFeedback(
                    generatedFeedback
                )


                if (
                    token &&
                    !activityRecorded.current
                ) {

                    activityRecorded.current =
                        true


                    try {

                        const activityResponse =
                            await axios.post(
                                `${API_URL}/api/auth/activity`,
                                {
                                    type:
                                        "practice",

                                    score:
                                        generatedFeedback.score,
                                },
                                {
                                    headers: {
                                        Authorization:
                                            `Bearer ${token}`,
                                    },
                                }
                            )


                        updateUser(
                            activityResponse
                                .data
                                .user
                        )

                    } catch (activityError) {

                        

                        console.error(
                            "Progress update error:",
                            activityError
                        )
                    }
                }

            } catch (error) {

                console.error(
                    "Feedback error:",
                    error
                )


                setError(
                    "Couldn't generate feedback. Please try again."
                )

            } finally {

                setLoading(false)

            }
        }


        getFeedback()

    }, [
        state,
        token,
        updateUser,
    ])


    if (!state) {

        return (

            <main className="min-h-screen bg-[#11110f] px-6 py-24 text-[#f4f4f0]">

                <div className="mx-auto max-w-3xl">

                    <p className="text-white/40">
                        No practice session found.
                    </p>


                    <button
                        onClick={() =>
                            navigate(
                                "/practice"
                            )
                        }
                        className="mt-6 bg-[#c7ff3d] px-6 py-3 text-sm font-bold text-black"
                    >
                        Back to Practice
                    </button>

                </div>

            </main>
        )
    }


    return (

        <main className="min-h-screen bg-[#11110f] px-6 py-16 text-[#f4f4f0]">

            <div className="mx-auto max-w-3xl">

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c7ff3d]">
                    PRACTICE FEEDBACK
                </p>


                <h1 className="mt-4 text-4xl font-black">
                    Here's how you did.
                </h1>


                <p className="mt-3 text-white/40">
                    {state.situation} ·{" "}
                    {state.difficulty}
                </p>


                {loading && (

                    <div className="mt-10 border border-white/10 bg-[#191917] p-8">

                        <p className="text-sm text-white/40">
                            Analyzing your conversation...
                        </p>

                    </div>
                )}


                {error && (

                    <div className="mt-10 border border-red-500/20 bg-[#191917] p-8">

                        <p className="text-sm text-red-400">
                            {error}
                        </p>

                    </div>
                )}


                {feedback && (

                    <div className="mt-10 space-y-5">

                        {/* SCORE */}

                        <div className="border border-white/10 bg-[#191917] p-8">

                            <p className="text-xs uppercase tracking-widest text-white/30">
                                Overall Score
                            </p>


                            <div className="mt-3 flex items-end gap-2">

                                <span className="text-6xl font-black text-[#c7ff3d]">
                                    {feedback.score}
                                </span>


                                <span className="mb-2 text-white/30">
                                    / 10
                                </span>

                            </div>


                            <div className="mt-6 h-1 bg-white/10">

                                <div
                                    className="h-full bg-[#c7ff3d]"
                                    style={{
                                        width: `${feedback.score * 10}%`,
                                    }}
                                />

                            </div>

                        </div>



                        <div className="border border-white/10 bg-[#191917] p-8">

                            <p className="text-xs font-bold uppercase tracking-widest text-[#c7ff3d]">
                                What you did well
                            </p>


                            <div className="mt-5 space-y-3">

                                {feedback.strengths.map(
                                    (
                                        strength,
                                        index
                                    ) => (

                                        <p
                                            key={index}
                                            className="text-sm leading-6 text-white/70"
                                        >
                                            ✓ {strength}
                                        </p>
                                    )
                                )}

                            </div>

                        </div>


                       

                        <div className="border border-white/10 bg-[#191917] p-8">

                            <p className="text-xs font-bold uppercase tracking-widest text-[#c7ff3d]">
                                What you can improve
                            </p>


                            <div className="mt-5 space-y-3">

                                {feedback.improvements.map(
                                    (
                                        improvement,
                                        index
                                    ) => (

                                        <p
                                            key={index}
                                            className="text-sm leading-6 text-white/70"
                                        >
                                            → {improvement}
                                        </p>
                                    )
                                )}

                            </div>

                        </div>


                        {/* TIP */}

                        <div className="border border-[#c7ff3d]/20 bg-[#c7ff3d]/5 p-8">

                            <p className="text-xs font-bold uppercase tracking-widest text-[#c7ff3d]">
                                Try this next time
                            </p>


                            <p className="mt-4 text-sm leading-6 text-white/70">
                                {feedback.tip}
                            </p>

                        </div>

                    </div>
                )}


                <button
                    onClick={() =>
                        navigate(
                            "/practice"
                        )
                    }
                    className="mt-8 bg-[#c7ff3d] px-6 py-4 text-sm font-black text-black transition hover:translate-x-1"
                >
                    Practice Again →
                </button>

            </div>

        </main>
    )
}


export default PracticeFeedback