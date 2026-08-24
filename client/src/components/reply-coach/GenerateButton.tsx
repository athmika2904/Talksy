interface GenerateButtonProps {
  canGenerate: boolean
  loading: boolean
  onGenerate: () => void
  onClear: () => void
}

function GenerateButton({
  canGenerate,
  loading,
  onGenerate,
  onClear,
}: GenerateButtonProps) {

  return (
    <section className="mt-10 flex items-center justify-end gap-3">

      {canGenerate && (
        <button
          type="button"
          onClick={onClear}
          className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/30 transition hover:text-white"
        >
          Clear
        </button>
      )}

      <button
        type="button"
        onClick={onGenerate}
        disabled={!canGenerate || loading}
        className="bg-[#c7ff3d] px-8 py-4 text-sm font-black uppercase tracking-wide text-[#11110f] transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-30"
      >
        {loading
          ? "Thinking..."
          : "Generate replies →"}
      </button>

    </section>
  )
}

export default GenerateButton