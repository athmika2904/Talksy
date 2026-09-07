import { useState } from "react"

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  instruction: string
}

const challenges: Challenge[] = [
  {
    id: "start-conversation",
    title: "Start a conversation",
    description:
      "Practice taking the first step when you want to talk to someone new.",
    difficulty: "Easy",
    instruction:
      "Imagine you're sitting next to someone from your class that you've never talked to before. Start the conversation naturally.",
  },
  {
    id: "join-group",
    title: "Join a group",
    description:
      "Practice entering a conversation when a group of people are already talking.",
    difficulty: "Medium",
    instruction:
      "A few classmates are talking about something interesting. Walk over and find a natural way to join the conversation.",
  },
  {
    id: "talk-to-crush",
    title: "Talk to someone you like",
    description:
      "Practice keeping a conversation going with someone you're interested in.",
    difficulty: "Medium",
    instruction:
      "You get a chance to talk to someone you like. Start with something simple and try to keep the conversation going.",
  },
  {
    id: "speak-up",
    title: "Speak up",
    description:
      "Practice expressing your thoughts instead of staying quiet.",
    difficulty: "Easy",
    instruction:
      "You're in a group discussion and you have an opinion about the topic. Share your thoughts with the group.",
  },
  {
    id: "awkward-moment",
    title: "Handle an awkward moment",
    description:
      "Practice staying calm when a conversation suddenly gets awkward.",
    difficulty: "Hard",
    instruction:
      "The conversation suddenly becomes quiet and awkward. Say something that naturally keeps the interaction going.",
  },
  {
    id: "new-environment",
    title: "Enter a new environment",
    description:
      "Practice talking to people when you're somewhere completely unfamiliar.",
    difficulty: "Hard",
    instruction:
      "You're at a college event where you don't know anyone. Approach someone and introduce yourself.",
  },
]

export function ChallengeDetails() {
  const [selectedChallenge, setSelectedChallenge] =
    useState<Challenge | null>(null)

  function handleStart(challenge: Challenge) {
    alert(`Challenge started: ${challenge.title}`)
  }

  if (selectedChallenge) {
    return (
      <main className="min-h-screen bg-[#11110f] px-6 py-16 text-[#f4f4f0]">
        <div className="mx-auto max-w-3xl">

          <button
            type="button"
            onClick={() => setSelectedChallenge(null)}
            className="text-xs font-bold uppercase tracking-widest text-white/30 transition hover:text-white"
          >
            ← Back to Challenges
          </button>

          <div className="mt-12">

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c7ff3d]">
              CHALLENGE
            </p>

            <h1 className="mt-4 text-4xl font-black">
              {selectedChallenge.title}
            </h1>

            <p className="mt-4 text-white/40">
              {selectedChallenge.description}
            </p>

            <div className="mt-8 border border-white/10 bg-[#191917] p-8">

              <p className="text-xs font-bold uppercase tracking-widest text-white/30">
                Your task
              </p>

              <p className="mt-4 text-lg leading-8 text-white/80">
                {selectedChallenge.instruction}
              </p>

            </div>

            <div className="mt-6 flex items-center justify-between border border-white/10 p-5">

              <span className="text-xs uppercase tracking-widest text-white/30">
                Difficulty
              </span>

              <span className="text-sm font-bold text-[#c7ff3d]">
                {selectedChallenge.difficulty}
              </span>

            </div>

            <button
              type="button"
              onClick={() => handleStart(selectedChallenge)}
              className="mt-8 w-full bg-[#c7ff3d] px-6 py-4 text-sm font-black text-black transition hover:translate-y-[-2px]"
            >
              START CHALLENGE →
            </button>

          </div>

        </div>
      </main>
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
            Get out of your comfort zone.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">
            Small challenges designed to help you practice real social
            situations without putting yourself under pressure.
          </p>

        </header>

        <section className="mt-10">

          <div className="grid gap-4 md:grid-cols-2">

            {challenges.map((challenge, index) => (
              <button
                key={challenge.id}
                type="button"
                onClick={() => setSelectedChallenge(challenge)}
                className="group border border-white/10 bg-[#191917] p-6 text-left transition hover:-translate-y-1 hover:border-white/20"
              >

                <div className="flex items-start justify-between gap-4">

                  <span className="text-xs font-bold text-white/20">
                    0{index + 1}
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#c7ff3d]">
                    {challenge.difficulty}
                  </span>

                </div>

                <h2 className="mt-8 text-xl font-black">
                  {challenge.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/40">
                  {challenge.description}
                </p>

                <div className="mt-8 text-xs font-bold uppercase tracking-widest text-white/20 transition group-hover:text-[#c7ff3d]">
                  View challenge →
                </div>

              </button>
            ))}

          </div>

        </section>

      </div>

    </main>
  )
}

export default ChallengeDetails