import { useState } from "react"
import axios from "axios"

import type { Challenge } from "./ChallengeCard"

interface ChallengeDetailsProps {
  challenge: Challenge
  completed: boolean
  onComplete: () => void
  onBack: () => void
}

interface Evaluation {
  completed: boolean
  score: number
  feedback: string
  strength: string
  improvement: string
  nextStep: string
}

export function ChallengeDetails({
  challenge,
  completed,
  onComplete,
  onBack,
}: ChallengeDetailsProps) {

  const [started, setStarted] = useState(false)

  const [reflection, setReflection] = useState("")

  const [loading, setLoading] = useState(false)

  const [evaluation, setEvaluation] =
    useState<Evaluation | null>(null)

  async function handleEvaluate() {
    if (!reflection.trim() || loading) {
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(
        "http://localhost:5000/api/challenges/evaluate",
        {
          challenge,
          reflection,
        }
      )

      setEvaluation(response.data.evaluation)

      if (response.data.evaluation.completed) {
        onComplete()
      }
    } catch (error) {
      console.error("Challenge evaluation error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (evaluation) {
    return (
      <main className="min-h-screen bg-[#11110f] px-6 py-16 text-[#f4f4f0]">
        <div className="mx-auto max-w-3xl">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c7ff3d]">
            CHALLENGE COMPLETE
          </p>

          <h1 className="mt-4 text-4xl font-black">
            You showed up.
          </h1>

          <div className="mt-10 border border-white/10 bg-[#191917] p-8">

            <p className="text-xs font-bold uppercase tracking-widest text-white/30">
              CONFIDENCE SCORE
            </p>

            <p className="mt-3 text-6xl font-black text-[#c7ff3d]">
              {evaluation.score}
              <span className="text-xl text-white/20">
                /10
              </span>
            </p>

          </div>

          <div className="mt-4 border border-white/10 bg-[#191917] p-7">

            <p className="text-xs font-bold uppercase tracking-widest text-white/30">
              FEEDBACK
            </p>

            <p className="mt-4 text-lg leading-8 text-white/80">
              {evaluation.feedback}
            </p>

          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">

            <div className="border border-white/10 p-6">

              <p className="text-xs font-bold uppercase tracking-widest text-[#c7ff3d]">
                YOU DID WELL
              </p>

              <p className="mt-4 text-sm leading-6 text-white/50">
                {evaluation.strength}
              </p>

            </div>

            <div className="border border-white/10 p-6">

              <p className="text-xs font-bold uppercase tracking-widest text-white/30">
                TRY NEXT
              </p>

              <p className="mt-4 text-sm leading-6 text-white/50">
                {evaluation.improvement}
              </p>

            </div>

          </div>

          <div className="mt-4 border border-[#c7ff3d]/20 bg-[#c7ff3d]/5 p-7">

            <p className="text-xs font-bold uppercase tracking-widest text-[#c7ff3d]">
              NEXT STEP
            </p>

            <p className="mt-4 text-sm leading-6 text-white/60">
              {evaluation.nextStep}
            </p>

          </div>

          <button
            type="button"
            onClick={onBack}
            className="mt-8 w-full bg-[#c7ff3d] px-6 py-4 text-sm font-black text-black transition hover:-translate-y-1"
          >
            BACK TO CHALLENGE
          </button>

        </div>
      </main>
    )
  }

  if (started) {
    return (
      <main className="min-h-screen bg-[#11110f] px-6 py-16 text-[#f4f4f0]">
        <div className="mx-auto max-w-3xl">

          <button
            type="button"
            onClick={onBack}
            className="text-xs font-bold uppercase tracking-widest text-white/30 transition hover:text-white"
          >
            ← Back
          </button>

          <p className="mt-12 text-xs font-bold uppercase tracking-[0.3em] text-[#c7ff3d]">
            GO DO IT
          </p>

          <h1 className="mt-4 text-4xl font-black">
            Your mission starts now.
          </h1>

          <div className="mt-10 border border-white/10 bg-[#191917] p-8">

            <p className="text-xs font-bold uppercase tracking-widest text-white/30">
              YOUR TASK
            </p>

            <p className="mt-5 text-xl leading-9 text-white/80">
              {challenge.instruction}
            </p>

          </div>

          <div className="mt-6 border border-[#c7ff3d]/20 bg-[#c7ff3d]/5 p-6">

            <p className="text-xs font-bold uppercase tracking-widest text-[#c7ff3d]">
              NO PRESSURE
            </p>

            <p className="mt-3 text-sm leading-6 text-white/50">
              You don't need to make it perfect. The goal is simply
              to take one small step.
            </p>

          </div>

          <div className="mt-10">

            <p className="text-xs font-bold uppercase tracking-widest text-white/30">
              WHEN YOU'RE BACK
            </p>

            <p className="mt-3 text-sm text-white/40">
              Tell us honestly how it went.
            </p>

            <textarea
              value={reflection}
              onChange={(event) =>
                setReflection(event.target.value)
              }
              placeholder="What happened? How did you feel?..."
              rows={6}
              className="mt-4 w-full resize-none border border-white/10 bg-[#191917] px-5 py-4 text-sm leading-6 text-white outline-none placeholder:text-white/20 focus:border-white/30"
            />

            <button
              type="button"
              onClick={handleEvaluate}
              disabled={!reflection.trim() || loading}
              className="mt-4 w-full bg-[#c7ff3d] px-6 py-4 text-sm font-black text-black transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-20"
            >
              {loading
                ? "AI IS ANALYZING..."
                : "GET AI FEEDBACK →"}
            </button>

          </div>

        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#11110f] px-6 py-16 text-[#f4f4f0]">
      <div className="mx-auto max-w-3xl">

        <button
          type="button"
          onClick={onBack}
          className="text-xs font-bold uppercase tracking-widest text-white/30 transition hover:text-white"
        >
          ← Back to Challenges
        </button>

        <div className="mt-12">

          <div className="flex items-center justify-between">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c7ff3d]">
              TODAY'S CHALLENGE
            </p>

            <span className="text-xs font-bold text-[#c7ff3d]">
              +{challenge.reward} XP
            </span>

          </div>

          <h1 className="mt-5 text-4xl font-black">
            {challenge.title}
          </h1>

          <p className="mt-4 text-white/40">
            {challenge.description}
          </p>

          <div className="mt-10 border border-white/10 bg-[#191917] p-8">

            <p className="text-xs font-bold uppercase tracking-widest text-white/30">
              YOUR MISSION
            </p>

            <p className="mt-5 text-xl leading-9 text-white/80">
              {challenge.instruction}
            </p>

          </div>

          <div className="mt-6 flex items-center justify-between border border-white/10 p-5">

            <span className="text-xs uppercase tracking-widest text-white/30">
              Difficulty
            </span>

            <span className="text-sm font-bold text-[#c7ff3d]">
              {challenge.difficulty}
            </span>

          </div>

          {completed ? (
            <div className="mt-8 border border-[#c7ff3d]/30 bg-[#c7ff3d]/5 p-6">

              <p className="text-sm font-black text-[#c7ff3d]">
                ✓ Challenge completed
              </p>

              <p className="mt-2 text-sm text-white/40">
                You already completed today's challenge.
              </p>

            </div>
          ) : (
            <button
              type="button"
              onClick={() => setStarted(true)}
              className="mt-8 w-full bg-[#c7ff3d] px-6 py-4 text-sm font-black text-black transition hover:-translate-y-1"
            >
              TAKE THE CHALLENGE →
            </button>
          )}

        </div>

      </div>
    </main>
  )
}

export default ChallengeDetails