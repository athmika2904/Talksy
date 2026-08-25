import ReplyOption from "./ReplyOption"

interface ReplyResultsProps {
  replies?: string[]
  tone: string
  loading: boolean
  onRegenerate: () => void
}

function ReplyResults({
  replies=[],
  tone,
  loading,
  onRegenerate,
}: ReplyResultsProps) {

  if (loading || replies.length === 0) {
    return null
  }

  return (
    <section className="mt-16 border-t border-white/10 pt-10">

      <div className="flex items-center justify-between">

        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/30">
          YOUR OPTIONS
        </p>

        <span className="text-xs text-white/20">
          Tone: {tone}
        </span>

      </div>

      <div className="mt-6 space-y-3">

        {replies.map((reply, index) => (

          <ReplyOption
            key={index}
            number={`0${index + 1}`}
            text={reply}
          />

        ))}

      </div>

      <div className="mt-8 flex justify-end">

        <button
          type="button"
          onClick={onRegenerate}
          disabled={loading}
          className="border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white/40 transition hover:border-[#c7ff3d] hover:text-[#c7ff3d] disabled:opacity-30"
        >
          ↻ Regenerate
        </button>

      </div>

    </section>
  )
}

export default ReplyResults