import { tones } from "../../data/replyCoachOptions"

interface ToneSelectorProps {
  tone: string
  setTone: (tone: string) => void
}

function ToneSelector({
  tone,
  setTone,
}: ToneSelectorProps) {

  return (
    <section className="mt-8">

      <p className="text-xs font-bold uppercase tracking-widest text-white/40">
        How should it sound?
      </p>

      <div className="mt-4 flex flex-wrap gap-2">

        {tones.map((item) => (

          <button
            type="button"
            key={item}
            onClick={() => setTone(item)}
            className={`
              border px-5 py-3 text-sm transition
              ${
                tone === item
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

export default ToneSelector