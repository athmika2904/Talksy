
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"


const situations = [
    {
        id: "new-friend",
        title: "Meet someone new",
        description:
            "Practice starting a conversation with someone you don't know.",
    },
    {
        id: "crush",
        title: "Talk to a crush",
        description:
            "Practice keeping a conversation natural and interesting.",
    },
    {
        id: "college",
        title: "College conversation",
        description:
            "Practice talking to classmates or people around campus.",
    },
    {
        id: "interview",
        title: "Job interview",
        description:
            "Practice answering questions without freezing up.",
    },
    {
        id: "professor",
        title: "Talk to a professor",
        description:
            "Practice asking questions or starting a conversation.",
    },
    {
        id: "group",
        title: "Join a group",
        description:
            "Practice entering an ongoing group conversation.",
    },
]


const difficulties = ["Easy", "Medium", "Hard"]


function Practice() {

    const navigate = useNavigate()

    const [selectedSituation, setSelectedSituation] = useState("")
    const [difficulty, setDifficulty] = useState("Easy")


    const handleStartPractice = () => {

        const selected = situations.find(
            (situation) =>
                situation.id === selectedSituation
        )


        navigate("/practice/session", {
            state: {
                situation: selected?.title || "",
                difficulty,
            },
        })
    }


    return (
        <div className="min-h-screen bg-[#11110f] text-[#f4f4f0]">

            <Navbar />

            <main className="min-h-screen bg-[#10100f] px-6 py-24 text-white">

                <div className="mx-auto max-w-6xl">

                    {/* HEADER */}

                    <div className="max-w-2xl">

                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c7ff3d]">
                            PRACTICE MODE
                        </p>

                        <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                            Have the awkward
                            <br />
                            conversation here first.
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-7 text-white/40">
                            Pick a situation and practice it with AI.
                            No pressure. No judgement. Just a safe place to try.
                        </p>

                    </div>



                    <section className="mt-16">

                        <div className="mb-6 flex items-center justify-between">

                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/30">
                                CHOOSE A SITUATION
                            </p>

                            <span className="text-xs text-white/20">
                                {selectedSituation
                                    ? "1 selected"
                                    : "Choose one"}
                            </span>

                        </div>


                        <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">

                            {situations.map((situation, index) => {

                                const selected =
                                    selectedSituation === situation.id


                                return (
                                    <button
                                        key={situation.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedSituation(
                                                situation.id
                                            )
                                        }
                                        className={`group min-h-44 bg-[#10100f] p-7 text-left transition ${
                                            selected
                                                ? "bg-[#c7ff3d] text-black"
                                                : "hover:bg-[#171716]"
                                        }`}
                                    >

                                        <div className="flex items-start justify-between">

                                            <span
                                                className={`text-xs font-bold ${
                                                    selected
                                                        ? "text-black/40"
                                                        : "text-white/20"
                                                }`}
                                            >
                                                0{index + 1}
                                            </span>


                                            <span
                                                className={`text-lg transition-transform ${
                                                    selected
                                                        ? "text-black"
                                                        : "text-white/20 group-hover:translate-x-1"
                                                }`}
                                            >
                                                ↗
                                            </span>

                                        </div>


                                        <h2 className="mt-12 text-lg font-bold">
                                            {situation.title}
                                        </h2>


                                        <p
                                            className={`mt-3 text-sm leading-6 ${
                                                selected
                                                    ? "text-black/60"
                                                    : "text-white/35"
                                            }`}
                                        >
                                            {situation.description}
                                        </p>

                                    </button>
                                )
                            })}

                        </div>

                    </section>



                    <section className="mt-12 max-w-xl">

                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-white/30">
                            DIFFICULTY
                        </p>


                        <div className="flex gap-2">

                            {difficulties.map((level) => {

                                const selected =
                                    difficulty === level


                                return (
                                    <button
                                        key={level}
                                        type="button"
                                        onClick={() =>
                                            setDifficulty(level)
                                        }
                                        className={`border px-6 py-3 text-xs font-bold uppercase tracking-wider transition ${
                                            selected
                                                ? "border-[#c7ff3d] bg-[#c7ff3d] text-black"
                                                : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"
                                        }`}
                                    >
                                        {level}
                                    </button>
                                )
                            })}

                        </div>

                    </section>


                    <div className="mt-14 border-t border-white/10 pt-8">

                        <button
                            type="button"
                            disabled={!selectedSituation}
                            onClick={handleStartPractice}
                            className="bg-[#c7ff3d] px-8 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:translate-x-1 disabled:cursor-not-allowed disabled:opacity-20"
                        >
                            Start Practice →
                        </button>

                    </div>

                </div>

            </main>

        </div>
    )
}


export default Practice
