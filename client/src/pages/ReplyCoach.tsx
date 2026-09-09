import { useEffect, useState } from "react"

import axios from "axios"

import Navbar from "../components/Navbar"

import ModeSelector from "../components/reply-coach/ModeSelector"
import MessageInput from "../components/reply-coach/MessageInput"
import ContextInput from "../components/reply-coach/ContextInput"
import ConcernSelector from "../components/reply-coach/ConcernSelector"
import IntentSelector from "../components/reply-coach/IntentSelector"
import ToneSelector from "../components/reply-coach/ToneSelector"

import GenerateButton from "../components/reply-coach/GenerateButton"
import LoadingReplies from "../components/reply-coach/LoadingReplies"
import ReplyResults from "../components/reply-coach/ReplyResults"

import { useAuth } from "../context/AuthContext"


const API_URL =
    "http://localhost:5000"


function ReplyCoach() {

    const {
        token,
        updateUser,
    } = useAuth()


    const [message, setMessage] =
        useState("")

    const [tone, setTone] =
        useState("Casual")

    const [context, setContext] =
        useState("")


    const [replies, setReplies] =
        useState<string[]>([])

    const [loading, setLoading] =
        useState(false)

    const [error, setError] =
        useState("")


    const [selectedConcerns, setSelectedConcerns] =
        useState<string[]>([])


    const [intent, setIntent] =
        useState(
            "Continue the conversation"
        )


    const [mode, setMode] =
        useState<
            "message" |
            "conversation" |
            "screenshot"
        >("message")


    const [screenshot, setScreenshot] =
        useState<File | null>(null)


    /*
        Scroll to generated replies
    */

    useEffect(() => {

        if (
            replies.length > 0 &&
            !loading
        ) {

            setTimeout(() => {

                window.scrollTo({
                    top:
                        document.documentElement
                            .scrollHeight,
                    behavior: "smooth",
                })

            }, 100)
        }

    }, [replies, loading])


    async function recordConversation() {

        /*
            If the user isn't logged in,
            Reply Coach still works.

            We simply don't save progress.
        */

        if (!token) {
            return
        }


        try {

            const response =
                await axios.post(
                    `${API_URL}/api/auth/activity`,
                    {
                        type: "reply",
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                )


            updateUser(
                response.data.user
            )

        } catch (error) {

            /*
                Activity tracking should
                never break Reply Coach.
            */

            console.error(
                "Could not update conversation progress:",
                error
            )
        }
    }


    async function handleGenerate() {

        if (
            mode === "screenshot"
        ) {

            if (!screenshot) {

                setError(
                    "Upload a screenshot first."
                )

                return
            }

        } else {

            if (!message.trim()) {

                setError(
                    "Write a message first."
                )

                return
            }
        }


        setLoading(true)
        setError("")
        setReplies([])


        try {

            const formData =
                new FormData()


            formData.append(
                "message",
                message
            )


            formData.append(
                "context",
                context
            )


            formData.append(
                "tone",
                tone
            )


            formData.append(
                "concerns",
                JSON.stringify(
                    selectedConcerns
                )
            )


            formData.append(
                "intent",
                intent
            )


            formData.append(
                "mode",
                mode
            )


            if (screenshot) {

                formData.append(
                    "screenshot",
                    screenshot
                )
            }


            const response =
                await axios.post(
                    `${API_URL}/api/ai/reply`,
                    formData
                )


            setReplies(
                response.data.replies
            )


            /*
                Only count the conversation
                after AI successfully generated
                the replies.
            */

            await recordConversation()

        } catch (error: any) {

            console.error(error)


            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            )

        } finally {

            setLoading(false)

        }
    }


    function toggleConcern(
        concern: string
    ) {

        setSelectedConcerns(
            (current) => {

                if (
                    current.includes(
                        concern
                    )
                ) {

                    return current.filter(
                        (item) =>
                            item !== concern
                    )
                }


                return [
                    ...current,
                    concern,
                ]
            }
        )
    }


    function handleClear() {

        setMessage("")
        setReplies([])
        setError("")
        setScreenshot(null)

    }


    return (

        <div className="min-h-screen bg-[#11110f] text-[#f4f4f0]">

            <Navbar />


            <main className="mx-auto max-w-5xl px-6 py-12">

                <section className="border-b border-white/10 pb-10">

                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c7ff3d]">
                        AI COMMUNICATION TOOL
                    </p>


                    <h1 className="mt-4 text-5xl font-black tracking-[-0.06em] md:text-6xl">
                        Reply Coach
                    </h1>


                    <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
                        Say what you actually mean without spending
                        twenty minutes rewriting one sentence.
                    </p>

                </section>


                <ModeSelector
                    mode={mode}
                    setMode={setMode}
                />


                <MessageInput
                    message={message}
                    setMessage={setMessage}
                    mode={mode}
                    screenshot={screenshot}
                    setScreenshot={setScreenshot}
                />


                <ContextInput
                    context={context}
                    setContext={setContext}
                />


                <ConcernSelector
                    selectedConcerns={
                        selectedConcerns
                    }
                    toggleConcern={
                        toggleConcern
                    }
                />


                <IntentSelector
                    intent={intent}
                    setIntent={setIntent}
                />


                <ToneSelector
                    tone={tone}
                    setTone={setTone}
                />


                <GenerateButton
                    canGenerate={
                        mode === "screenshot"
                            ? screenshot !== null
                            : message.trim().length > 0
                    }
                    loading={loading}
                    onGenerate={
                        handleGenerate
                    }
                    onClear={
                        handleClear
                    }
                />


                {error && (

                    <div className="mt-6 border border-red-400/20 bg-red-400/5 px-5 py-4">

                        <p className="text-sm text-red-400">
                            {error}
                        </p>

                    </div>
                )}


                {loading && (
                    <LoadingReplies />
                )}


                <ReplyResults
                    replies={replies}
                    tone={tone}
                    loading={loading}
                    onRegenerate={
                        handleGenerate
                    }
                />

            </main>

        </div>
    )
}


export default ReplyCoach
