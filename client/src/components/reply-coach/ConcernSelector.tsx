import { concerns } from "../../data/replyCoachOptions"

interface ConcernSelectorProps {
  selectedConcerns: string[]
  toggleConcern: (concern: string) => void
}

function ConcernSelector({
  selectedConcerns,
  toggleConcern,
}: ConcernSelectorProps) {

  return (
    <section className="mt-8">

      <div className="flex items-center justify-between">

        <p className="text-xs font-bold uppercase tracking-widest text-white/40">
          What's making this hard?
        </p>

        <span className="text-xs text-white/20">
          Optional
        </span>

      </div>

      <div className="mt-4 flex flex-wrap gap-2">

        {concerns.map((concern) => {

          const selected =
            selectedConcerns.includes(concern)

          return (
            <button
              type="button"
              key={concern}
              onClick={() => toggleConcern(concern)}
              className={`
                border px-4 py-3 text-sm transition
                ${
                  selected
                    ? "border-[#c7ff3d] bg-[#c7ff3d] text-[#11110f]"
                    : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                }
              `}
            >
              {concern}
            </button>
          )
        })}

      </div>

    </section>
  )
}

export default ConcernSelector