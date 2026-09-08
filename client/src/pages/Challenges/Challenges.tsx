import { useEffect, useState } from "react"
import axios from "axios"

import ChallengeCard, {
  type Challenge,
} from "./ChallengeCard"

import ChallengeDetails from "./ChallengeDetails"

const API_URL = "http://localhost:5000/api/challenges"

interface ChallengeHistoryItem {
  date: string
  challengeId: string
  title: string
  difficulty: string
  reward: number
}

function getToday() {
  const date = new Date()

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function getYesterday() {
  const date = new Date()

  date.setDate(date.getDate() - 1)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

export function Challenges() {
  const [challenge, setChallenge] =
    useState<Challenge | null>(null)

  const [selectedChallenge, setSelectedChallenge] =
    useState<Challenge | null>(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState("")

  const [completed, setCompleted] =
    useState(false)

  const [xp, setXp] = useState(0)

  const [streak, setStreak] = useState(0)

  const [history, setHistory] =
    useState<ChallengeHistoryItem[]>([])

  useEffect(() => {
    loadProgress()
    loadChallenge()
  }, [])

  function loadProgress() {
    const savedXP =
      localStorage.getItem("challengeXP")

    const savedStreak =
      localStorage.getItem("challengeStreak")

    const savedHistory =
      localStorage.getItem("challengeHistory")

    if (savedXP) {
      setXp(Number(savedXP))
    }

    if (savedStreak) {
      setStreak(Number(savedStreak))
    }

    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch {
        setHistory([])
      }
    }
  }

  async function loadChallenge() {
    try {
      const today = getToday()

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
        setChallenge(
          JSON.parse(savedChallenge)
        )

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
async function handleComplete() {
  if (!challenge || completed) {
    return
  }

  try {
    const token = localStorage.getItem("token")

    const response = await axios.post(
      "http://localhost:5000/api/challenges/complete",
      {
        challengeId: challenge.id,
        title: challenge.title,
        difficulty: challenge.difficulty,
        reward: challenge.reward,
        date: getToday(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const updatedUser = response.data.user

    setXp(updatedUser.xp)
    setStreak(updatedUser.streak)
    setCompleted(
      updatedUser.completedChallenges
    )
    setHistory(updatedUser.challengeHistory)

    setCompleted(true)

    localStorage.setItem(
      "dailyChallengeCompleted",
      "true"
    )
  } catch (error: any) {
    console.error(
      "Challenge completion error:",
      error
    )

    alert(
      error.response?.data?.message ||
        "Could not save your progress."
    )
  }
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

       

        <section className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="border border-white/10 bg-[#191917] p-6">

            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">
              TOTAL XP
            </p>

            <p className="mt-3 text-3xl font-black text-[#c7ff3d]">
              {xp}
            </p>

          </div>

          <div className="border border-white/10 bg-[#191917] p-6">

            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">
              CURRENT STREAK
            </p>

            <p className="mt-3 text-3xl font-black">
              {streak}
              <span className="ml-2 text-lg text-[#c7ff3d]">
                🔥
              </span>
            </p>

          </div>

          <div className="border border-white/10 bg-[#191917] p-6">

            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">
              COMPLETED
            </p>

            <p className="mt-3 text-3xl font-black">
              {history.length}
            </p>

          </div>

        </section>

       

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
              Get a small mission, do it in the real
              world, then come back and tell us how it
              went.
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


        <section className="mt-12">

          <div className="flex items-end justify-between border-b border-white/10 pb-5">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c7ff3d]">
                HISTORY
              </p>

              <h2 className="mt-3 text-2xl font-black">
                Your progress
              </h2>

            </div>

            <span className="text-xs text-white/20">
              {history.length} completed
            </span>

          </div>

          {history.length === 0 ? (
            <div className="mt-6 border border-white/10 p-8">

              <p className="text-sm text-white/30">
                Your completed challenges will appear
                here.
              </p>

            </div>
          ) : (
            <div className="mt-6 space-y-3">

              {history.map((item) => (
                <div
                  key={`${item.date}-${item.challengeId}`}
                  className="flex items-center justify-between gap-6 border border-white/10 bg-[#191917] p-5"
                >

                  <div className="min-w-0">

                    <p className="text-sm font-bold">
                      {item.title}
                    </p>

                    <div className="mt-2 flex gap-4">

                      <span className="text-[10px] uppercase tracking-widest text-white/20">
                        {item.date}
                      </span>

                      <span className="text-[10px] uppercase tracking-widest text-white/20">
                        {item.difficulty}
                      </span>

                    </div>

                  </div>

                  <span className="shrink-0 text-sm font-black text-[#c7ff3d]">
                    +{item.reward} XP
                  </span>

                </div>
              ))}

            </div>
          )}

        </section>

      </div>

    </main>
  )
}

export default Challenges