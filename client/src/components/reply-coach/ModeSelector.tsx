interface ModeSelectorProps {
  mode: "message" | "conversation" | "screenshot"
  setMode: (
    mode: "message" | "conversation" | "screenshot"
  ) => void
}

function ModeSelector({
  mode,
  setMode,
}: ModeSelectorProps) {

  return (
    <section className="mt-10">

      <p className="text-xs font-bold uppercase tracking-widest text-white/40">
        What are you replying to?
      </p>

      <div className="mt-4 flex gap-2">

        <button
          type="button"
          onClick={() => setMode("message")}
          className={`
            border px-5 py-3 text-sm transition
            ${
              mode === "message"
                ? "border-[#c7ff3d] bg-[#c7ff3d] text-[#11110f]"
                : "border-white/10 text-white/50 hover:border-white/30"
            }
          `}
        >
          One message
        </button>

        <button
          type="button"
          onClick={() => setMode("conversation")}
          className={`
            border px-5 py-3 text-sm transition
            ${
              mode === "conversation"
                ? "border-[#c7ff3d] bg-[#c7ff3d] text-[#11110f]"
                : "border-white/10 text-white/50 hover:border-white/30"
            }
          `}
        >
          Full conversation
        </button>

        <button
          type="button"
          onClick={() => setMode("screenshot")}
          className={`
            border px-5 py-3 text-sm transition
            ${
              mode === "screenshot"
                ? "border-[#c7ff3d] bg-[#c7ff3d] text-[#11110f]"
                : "border-white/10 text-white/50 hover:border-white/30"
            }
          `}
        >
          Screenshot 📷
        </button>

      </div>

    </section>
  )
}

export default ModeSelector