import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

interface PracticeState {
  situation: string
  difficulty: string
}

interface Message {
  id: number
  sender: "ai" | "user"
  text: string
}

function PracticeChat() {

  const location = useLocation()
  const navigate = useNavigate()

  const state = location.state as PracticeState | undefined

  const [message, setMessage] = useState("")

  const [loading, setLoading] = useState(false)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Hey! I don't think we've talked before. What's your name?",
    },
  ])

  if (!state) {

    return (
      <main className="min-h-screen bg-[#11110f] px-6 py-24 text-[#f4f4f0]">

        <div className="mx-auto max-w-3xl">

          <p className="text-white/40">
            No practice session found.
          </p>

          <button
            onClick={() => navigate("/practice")}
            className="mt-6 bg-[#c7ff3d] px-6 py-3 text-sm font-bold text-black"
          >
            Go back
          </button>

        </div>

      </main>
    )
  }

  async function handleSend() {

    if (!message.trim() || loading) {
      return
    }
    if (!state) return

    const userText = message.trim()

    const newMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: userText,
    }

    const updatedMessages = [
      ...messages,
      newMessage,
    ]

    setMessages(updatedMessages)

    setMessage("")

    setLoading(true)

    try {

      const response = await axios.post(
        "http://localhost:5000/api/practice/session",
        {
          situation: state.situation,
          difficulty: state.difficulty,
          messages: updatedMessages,
        }
      )

      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: response.data.reply,
      }

      setMessages((previous) => [
        ...previous,
        aiMessage,
      ])

    } catch (error) {

      console.error("Practice AI error:", error)

    } finally {

      setLoading(false)

    }
  }

  return (
    <main className="min-h-screen bg-[#11110f] px-6 py-10 text-[#f4f4f0]">

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-4xl flex-col">

        <header className="border-b border-white/10 pb-6">

          <div className="flex items-start justify-between gap-6">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c7ff3d]">
                PRACTICE SESSION
              </p>

              <h1 className="mt-3 text-2xl font-black">
                {state.situation}
              </h1>

              <p className="mt-2 text-xs uppercase tracking-wider text-white/25">
                Difficulty · {state.difficulty}
              </p>

            </div>

            <button
              type="button"
              onClick={() => navigate("/practice")}
              className="text-xs font-bold uppercase tracking-wider text-white/30 transition hover:text-white"
            >
              Exit
            </button>

          </div>

        </header>

        <section className="flex-1 py-10">

          <div className="space-y-6">

            {messages.map((item) => (

              <div
                key={item.id}
                className={`flex ${
                  item.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[75%] px-5 py-4 text-sm leading-6 ${
                    item.sender === "user"
                      ? "bg-[#c7ff3d] text-black"
                      : "border border-white/10 bg-[#191917] text-white/80"
                  }`}
                >
                  {item.text}
                </div>

              </div>

            ))}

            {loading && (

              <div className="flex justify-start">

                <div className="border border-white/10 bg-[#191917] px-5 py-4 text-sm text-white/40">
                  AI is thinking...
                </div>

              </div>

            )}

          </div>

        </section>

        <section className="border-t border-white/10 pt-6">

          <div className="flex gap-3">

            <input
              type="text"
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              onKeyDown={(event) => {

                if (event.key === "Enter") {
                  handleSend()
                }

              }}
              disabled={loading}
              placeholder="Type your response..."
              className="min-w-0 flex-1 border border-white/10 bg-[#191917] px-5 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30 disabled:opacity-40"
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!message.trim() || loading}
              className="bg-[#c7ff3d] px-6 text-sm font-black text-black transition hover:translate-x-1 disabled:cursor-not-allowed disabled:opacity-20"
            >
              {loading ? "..." : "SEND →"}
            </button>

          </div>

          <p className="mt-3 text-center text-xs text-white/20">
            There are no wrong answers. Just practice.
          </p>

        </section>

      </div>

    </main>
  )
}

export default PracticeChat