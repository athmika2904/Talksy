interface ContextInputProps {
  context: string
  setContext: (value: string) => void
}

function ContextInput({
  context,
  setContext,
}: ContextInputProps) {

  return (
    <section className="mt-8">

      <div className="flex items-center justify-between">

        <label className="text-xs font-bold uppercase tracking-widest text-white/40">
          Give some context
        </label>

        <span className="text-xs text-white/20">
          Optional
        </span>

      </div>

      <textarea
        value={context}
        onChange={(event) => setContext(event.target.value)}
        maxLength={300}
        placeholder="What's the situation? Who are you talking to? What are you worried about?"
        className="mt-4 min-h-30 w-full resize-none border border-white/10 bg-[#191917] p-5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#c7ff3d]"
      />

      <p className="mt-2 text-xs text-white/20">
        Example: "It's someone I like and I don't want to sound too eager."
      </p>

    </section>
  )
}

export default ContextInput