export interface Challenge {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  instruction: string
  reward: number
}

interface ChallengeCardProps {
  challenge: Challenge
  completed: boolean
  onSelect: (challenge: Challenge) => void
}

export function ChallengeCard({
  challenge,
  completed,
  onSelect,
}: ChallengeCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(challenge)}
      className="group w-full border border-white/10 bg-[#191917] p-7 text-left transition hover:-translate-y-1 hover:border-white/20"
    >
      <div className="flex items-start justify-between gap-6">

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c7ff3d]">
            TODAY'S MISSION
          </p>

          <h2 className="mt-5 text-2xl font-black">
            {challenge.title}
          </h2>
        </div>

        {completed && (
          <span className="shrink-0 text-xs font-bold text-[#c7ff3d]">
            ✓ DONE
          </span>
        )}

      </div>

      <p className="mt-4 text-sm leading-6 text-white/40">
        {challenge.description}
      </p>

      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">

        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
          {challenge.difficulty}
        </span>

        <span className="text-[10px] font-bold uppercase tracking-widest text-[#c7ff3d]">
          +{challenge.reward} XP
        </span>

      </div>

      <div className="mt-6 text-xs font-bold uppercase tracking-widest text-white/20 transition group-hover:text-[#c7ff3d]">
        {completed
          ? "View challenge →"
          : "Take the challenge →"}
      </div>

    </button>
  )
}

export default ChallengeCard