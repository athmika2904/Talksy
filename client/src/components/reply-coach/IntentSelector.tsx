import { intents } from "../../data/replyCoachOptions"

interface IntentSelectorProps {
  intent: string
  setIntent: (intent: string) => void
}

function IntentSelector({
  intent,
  setIntent,
}: IntentSelectorProps) {

  return (
    <section className="mt-8">

      <div className="flex items-center justify-between">

        <p className="text-xs font-bold uppercase tracking-widest text-white/40">
          What do you want your reply to do?
        </p>

      </div>

      <div className="mt-4 flex flex-wrap gap-2">

        {intents.map((item) => (

          <button
            type="button"
            key={item}
            onClick={() => setIntent(item)}
            className={`
              border px-4 py-3 text-sm transition
              ${
                intent === item
                  ? "border-[#c7ff3d] bg-[#c7ff3d] text-[#11110f]"
                  : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
              }
            `}
          >
            {item}
          </button>

        ))}

      </div>

    </section>
  )
}

export default IntentSelector