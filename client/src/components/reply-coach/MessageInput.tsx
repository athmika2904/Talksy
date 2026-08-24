interface MessageInputProps {
  message: string
  setMessage: (value: string) => void
  mode: "message" | "conversation" | "screenshot"
}

function MessageInput({
  message,
  setMessage,
  mode,
}: MessageInputProps) {

  return (
    <section className="mt-10">

      <div className="flex items-center justify-between">

        <label className="text-xs font-bold uppercase tracking-widest text-white/40">
          {mode === "message"
            ? "What happened?"
            : "Paste the conversation"}
        </label>

        <span
          className={`text-xs ${
            message.length >= 450
              ? "text-red-400"
              : "text-white/30"
          }`}
        >
          {message.length} / 500
        </span>

      </div>

      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        maxLength={500}
        placeholder={
          mode === "message"
            ? "Paste the message you've been overthinking..."
            : "Paste the conversation here...\n\nThem: ...\nYou: ...\nThem: ..."
        }
        className={`
          mt-4 w-full resize-none border border-white/10
          bg-[#191917] p-6 text-lg text-white outline-none
          transition placeholder:text-white/20
          focus:border-[#c7ff3d]
          ${
            mode === "conversation"
              ? "min-h-70"
              : "min-h-45"
          }
        `}
      />

    </section>
  )
}

export default MessageInput