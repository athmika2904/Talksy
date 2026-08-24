import { useState } from "react"

interface ReplyOptionProps {
  number: string
  text: string
}

function ReplyOption({ number, text }: ReplyOptionProps) {
  const [copied, setCopied] = useState(false)

  async function copyReply() {
    try {
      await navigator.clipboard.writeText(text)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1500)

    } catch (error) {
      console.error("Copy failed:", error)

      const textArea = document.createElement("textarea")

      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.opacity = "0"

      document.body.appendChild(textArea)

      textArea.focus()
      textArea.select()

      try {
        document.execCommand("copy")

        setCopied(true)

        setTimeout(() => {
          setCopied(false)
        }, 1500)

      } catch (fallbackError) {
        console.error("Fallback copy failed:", fallbackError)
      }

      document.body.removeChild(textArea)
    }
  }

  return (
    <div className="group flex gap-6 border border-white/10 bg-[#191917] p-6 transition hover:border-white/20">

      <span className="text-xs font-bold text-white/20">
        {number}
      </span>

      <p className="flex-1 text-sm leading-7 text-white/70">
        {text}
      </p>

      <button
        type="button"
        onClick={copyReply}
        className="self-start text-xs font-bold uppercase tracking-wider text-white/30 transition hover:text-[#c7ff3d]"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>

    </div>
  )
}

export default ReplyOption