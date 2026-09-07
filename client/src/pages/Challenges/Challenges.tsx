import { useEffect, useState } from "react"
import axios from "axios"

import ChallengeCard, {
  type Challenge,
} from "./ChallengeCard"

import ChallengeDetails from "./ChallengeDetails"

const API_URL = "http://localhost:5000/api/challenges"

export function Challenges() {
  const [challenge, setChallenge] =
    useState<Challenge | null>(null)

  const [selectedChallenge, setSelectedChallenge] =
    useState<Challenge | null>(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    loadChallenge()
  }, [])

  async function loadChallenge() {
    try {
      const today = new Date()
        .toISOString()
        .split("T")[0]

      const savedChallenge =
        localStorage.getItem("dailyChallenge")

      const savedDate =
        localStorage.getItem("dailyChallengeDate")

      const savedCompleted =
        localStorage.getItem("dailyChallengeCompleted")

      if (
        savedChallenge &&
        savedDate === today
      ) {
        setChallenge(JSON.parse(savedChallenge))

        setCompleted(
          savedCompleted === "true"
        )

        setLoading(false)

        return
      }

      const response = await axios.get(
        `${API_URL}/today`
      )

      const newChallenge =
        response.data.challenge

      setChallenge(newChallenge)

      localStorage.setItem(
        "dailyChallenge",
        JSON.stringify(newChallenge)
      )

      localStorage.setItem(
        "dailyChallengeDate",
        today
      )

      localStorage.setItem(
        "dailyChallengeCompleted",
        "false"
      )

      setCompleted(false)
    } catch (error) {
      console.error(
        "Daily challenge error:",
        error
      )

      setError(
        "Couldn't load today's challenge."
      )
    } finally {
      setLoading(false)
    }
  }

  function handleComplete() {
    setCompleted(true)

    localStorage.setItem(
      "dailyChallengeCompleted",
      "true"
    )
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#11110f] px-6 py-20 text-[#f4f4f0]">
        <div className="mx-auto max-w-5xl">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c7ff3d]">
            CHALLENGES
          </p>

          <div className="mt-12 border border-white/10 bg-[#191917] p-8">

            <p className="text-sm text-white/30">
              AI is creating today's challenge...
            </p>

          </div>

        </div>
      </main>
    )
  }

  if (error || !challenge) {
    return (
      <main className="min-h-screen bg-[#11110f] px-6 py-20 text-[#f4f4f0]">
        <div className="mx-auto max-w-5xl">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c7ff3d]">
            CHALLENGES
          </p>

          <div className="mt-10 border border-white/10 p-8">

            <p className="text-sm text-white/40">
              {error || "No challenge available."}
            </p>

            <button
              type="button"
              onClick={() => {
                setLoading(true)
                setError("")
                loadChallenge()
              }}
              className="mt-6 bg-[#c7ff3d] px-6 py-3 text-sm font-black text-black"
            >
              TRY AGAIN
            </button>

          </div>

        </div>
      </main>
    )
  }

  if (selectedChallenge) {
    return (
      <ChallengeDetails
        challenge={selectedChallenge}
        completed={completed}
        onComplete={handleComplete}
        onBack={() => setSelectedChallenge(null)}
      />
    )
  }

  return (
    <main className="min-h-screen bg-[#11110f] px-6 py-16 text-[#f4f4f0]">

      <div className="mx-auto max-w-5xl">

        <header className="border-b border-white/10 pb-10">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c7ff3d]">
            CHALLENGES
          </p>

          <h1 className="mt-4 text-4xl font-black">
            Do something uncomfortable.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">
            One small real-world challenge every day.
            Practice doesn't stop when you close the app.
          </p>

        </header>

        <section className="mt-10">

          <ChallengeCard
            challenge={challenge}
            completed={completed}
            onSelect={setSelectedChallenge}
          />

        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">

          <div className="border border-white/10 p-6">

            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">
              HOW IT WORKS
            </p>

            <p className="mt-4 text-sm leading-6 text-white/50">
              Get a small mission, do it in the real world,
              then come back and tell us how it went.
            </p>

          </div>

          <div className="border border-white/10 p-6">

            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">
              TODAY'S REWARD
            </p>

            <p className="mt-4 text-2xl font-black text-[#c7ff3d]">
              +{challenge.reward} XP
            </p>

          </div>

        </section>

      </div>

    </main>
  )
}

export default Challenges