import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import ChallengeCard, {
  type Challenge,
} from "./ChallengeCard"

import ChallengeDetails from "./ChallengeDetails"


const API_URL =
  "http://localhost:5000/api/challenges"


interface ChallengeHistoryItem {
  date: string
  challengeId: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  reward: number
}


interface Progress {
  xp: number
  streak: number
  completedChallenges: number
  history: ChallengeHistoryItem[]
  completedToday: boolean
}


function getToday() {
  const date = new Date()

  const year =
    date.getFullYear()

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0")

  const day = String(
    date.getDate()
  ).padStart(2, "0")

  return `${year}-${month}-${day}`
}


export function Challenges() {
  const navigate = useNavigate()

  const [challenge, setChallenge] =
    useState<Challenge | null>(null)

  const [
    selectedChallenge,
    setSelectedChallenge,
  ] = useState<Challenge | null>(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState("")

  const [progress, setProgress] =
    useState<Progress>({
      xp: 0,
      streak: 0,
      completedChallenges: 0,
      history: [],
      completedToday: false,
    })


  useEffect(() => {
    loadChallenge()
  }, [])


  async function loadChallenge() {
    try {
      setLoading(true)
      setError("")

      const token =
        localStorage.getItem("token")

      if (!token) {
        navigate("/login")
        return
      }

      const today = getToday()

      /*
        We still cache the generated challenge
        for the current day.

        Progress itself NEVER comes from localStorage.
      */

      const savedChallenge =
        localStorage.getItem(
          "dailyChallenge"
        )

      const savedDate =
        localStorage.getItem(
          "dailyChallengeDate"
        )


      let currentChallenge: Challenge


      if (
        savedChallenge &&
        savedDate === today
      ) {
        currentChallenge =
          JSON.parse(savedChallenge)
      } else {
        const response =
          await axios.get(
            `${API_URL}/today`,
            {
              params: {
                date: today,
              },

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          )

        currentChallenge =
          response.data.challenge

        localStorage.setItem(
          "dailyChallenge",
          JSON.stringify(
            currentChallenge
          )
        )

        localStorage.setItem(
          "dailyChallengeDate",
          today
        )
      }


      /*
        Always fetch progress from MongoDB.
        This is what fixes yesterday/today
        completion confusion.
      */

      const response =
        await axios.get(
          `${API_URL}/today`,
          {
            params: {
              date: today,
            },

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )


      setChallenge(currentChallenge)

      setProgress(
        response.data.progress
      )
    } catch (error: any) {
      console.error(
        "Challenge loading error:",
        error
      )

      setError(
        error.response?.data?.message ||
          "Couldn't load today's challenge."
      )
    } finally {
      setLoading(false)
    }
  }


  async function handleComplete() {
    if (
      !challenge ||
      progress.completedToday
    ) {
      return
    }

    try {
      const token =
        localStorage.getItem("token")

      const response =
        await axios.post(
          `${API_URL}/complete`,
          {
            challengeId:
              challenge.id,

            title:
              challenge.title,

            difficulty:
              challenge.difficulty,

            reward:
              challenge.reward,

            date:
              getToday(),
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )


      const updatedUser =
        response.data.user


      setProgress({
        xp: updatedUser.xp,

        streak:
          updatedUser.streak,

        completedChallenges:
          updatedUser.completedChallenges,

        history:
          updatedUser.challengeHistory,

        completedToday: true,
      })


      /*
        Remove the old completion flag
        from previous versions.
      */

      localStorage.removeItem(
        "dailyChallengeCompleted"
      )

      localStorage.removeItem(
        "dailyChallengeCompletedDate"
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
              {error ||
                "No challenge available."}
            </p>

            <button
              type="button"
              onClick={loadChallenge}
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
        challenge={
          selectedChallenge
        }

        completed={
          progress.completedToday
        }

        onComplete={
          handleComplete
        }

        onBack={() =>
          setSelectedChallenge(null)
        }
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


        {/* STATS */}

        <section className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="border border-white/10 bg-[#191917] p-6">

            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">
              TOTAL XP
            </p>

            <p className="mt-3 text-3xl font-black text-[#c7ff3d]">
              {progress.xp}
            </p>

          </div>


          <div className="border border-white/10 bg-[#191917] p-6">

            <p className="text-[10px] font-bold uppercase tracking-widest text-white/20">
              CURRENT STREAK
            </p>

            <p className="mt-3 text-3xl font-black">

              {progress.streak}

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
              {progress.completedChallenges}
            </p>

          </div>

        </section>


        {/* TODAY */}

        <section className="mt-10">

          <ChallengeCard
            challenge={challenge}
            completed={
              progress.completedToday
            }
            onSelect={
              setSelectedChallenge
            }
          />

        </section>


        {/* INFO */}

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


        {/* HISTORY */}

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
              {progress.history.length} completed
            </span>

          </div>


          {progress.history.length === 0 ? (
            <div className="mt-6 border border-white/10 p-8">

              <p className="text-sm text-white/30">
                Your completed challenges will appear here.
              </p>

            </div>
          ) : (
            <div className="mt-6 space-y-3">

              {progress.history.map(
                (item) => (
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
                )
              )}

            </div>
          )}

        </section>

      </div>

    </main>
  )
}


export default Challenges