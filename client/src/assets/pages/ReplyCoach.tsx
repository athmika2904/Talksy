
import { useState,useEffect } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
const tones = [
  "Casual",
  "Friendly",
  "Funny",
  "Confident",
  "Polite",
  "Direct",
]

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

function ReplyCoach() {

  const [message, setMessage] = useState("")
  const [tone, setTone] = useState("Casual")
  const [replies, setReplies] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    useEffect(() => {
      if (replies.length > 0 && !loading) {
        setTimeout(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          })
        }, 100)
      }
    }, [replies, loading])
  async function handleGenerate() {
    if (!message.trim()) {
            setError("Write a message first.")
      return
    }

    setLoading(true)
        setError("")
        setReplies([])
  

        try {

            const response = await axios.post(
                "http://localhost:5000/api/ai/reply",
                {
                    message,
                    tone
                }
            )

            setReplies(response.data.replies)
            
        } catch (error:any) {

            console.error(error)

            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            )

        } finally {

            setLoading(false)

        }
      }

  return (
    <div className="min-h-screen bg-[#11110f] text-[#f4f4f0]">

      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-12">

        

        <section className="border-b border-white/10 pb-10">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c7ff3d]">
            AI COMMUNICATION TOOL
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-[-0.06em] md:text-6xl">
            Reply Coach
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
            Say what you actually mean without spending
            twenty minutes rewriting one sentence.
          </p>

        </section>



        <section className="mt-10">

          <div className="flex items-center justify-between">

            <label className="text-xs font-bold uppercase tracking-widest text-white/40">
              What happened?
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
            placeholder="Paste the message you've been overthinking..."
            className="mt-4 min-h-[180px] w-full resize-none border border-white/10 bg-[#191917] p-6 text-lg text-white outline-none transition placeholder:text-white/20 focus:border-[#c7ff3d]"
          />

        </section>



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


        <section className="mt-10 flex items-center justify-end gap-3">
            {message && (
              <button
                type="button"
                onClick={() => {
                  setMessage("")
                  setReplies([])
                  setError("")
                }}
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-white/30 transition hover:text-white"
              >
                Clear
              </button>
            )}

          <button
            type="button"
            onClick={handleGenerate}
            disabled={!message.trim()||loading}
            className="bg-[#c7ff3d] px-8 py-4 text-sm font-black uppercase tracking-wide text-[#11110f] transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-30"
          >
            {loading
              ? "Thinking..."
              : "Generate replies →"
            }
          </button>

        </section>
        
           {error && (

          <div className="mt-6 border border-red-400/20 bg-red-400/5 px-5 py-4">

            <p className="text-sm text-red-400">
              {error}
            </p>

          </div>

        )}
 
        {loading && (

          <section className="mt-16 border-t border-white/10 pt-10">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/30">
              AI IS THINKING...
            </p>

            <div className="mt-6 space-y-3">

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className="h-24 animate-pulse border border-white/10 bg-[#191917]"
                />

              ))}

            </div>

          </section>

        )}

        {!loading && replies.length>0 &&(

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
                onClick={handleGenerate}
                disabled={loading}
                className="border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white/40 transition hover:border-[#c7ff3d] hover:text-[#c7ff3d] disabled:opacity-30"
              >
                ↻ Regenerate
              </button>
            </div>

          </section>

        )}

      </main>

    </div>
  )
}

export default ReplyCoach;
