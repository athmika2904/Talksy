import { useEffect, useState } from "react"

interface MessageInputProps {
  message: string
  setMessage: (value: string) => void

  mode: "message" | "conversation" | "screenshot"

  screenshot: File | null
  setScreenshot: (file: File | null) => void
}

function MessageInput({
  message,
  setMessage,
  mode,
  screenshot,
  setScreenshot,
}: MessageInputProps) {

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {

    if (!screenshot) {
      setPreviewUrl(null)
      return
    }

    const url = URL.createObjectURL(screenshot)

    setPreviewUrl(url)

    return () => {
      URL.revokeObjectURL(url)
    }

  }, [screenshot])


  function handleScreenshotChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    const file = event.target.files?.[0]

    if (!file) return



    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ]

    if (!allowedTypes.includes(file.type)) {

      alert("Please upload a JPG, PNG, or WEBP image.")

      event.target.value = ""

      return
    }


    if (file.size > 10 * 1024 * 1024) {

      alert("Screenshot must be smaller than 10MB.")

      event.target.value = ""

      return
    }


    setScreenshot(file)
  }


  function removeScreenshot() {

    setScreenshot(null)

  }



  if (mode === "screenshot") {

    return (

      <section className="mt-10">

        <div className="flex items-center justify-between">

          <label className="text-xs font-bold uppercase tracking-widest text-white/40">
            Conversation screenshot
          </label>

          <span className="text-xs text-white/20">
            JPG, PNG or WEBP
          </span>

        </div>


        {!screenshot ? (

          <label
            htmlFor="conversation-screenshot"
            className="
              mt-4 flex min-h-65 cursor-pointer
              flex-col items-center justify-center
              border border-dashed border-white/10
              bg-[#191917] p-8 text-center
              transition
              hover:border-[#c7ff3d]/50
              hover:bg-[#1c1c19]
            "
          >

            <div className="text-4xl">
              📸
            </div>

            <p className="mt-5 text-sm font-bold text-white/70">
              Upload your conversation
            </p>

            <p className="mt-2 max-w-sm text-xs leading-6 text-white/30">
              Take a screenshot of the conversation
              and upload it here.
            </p>

            <span
              className="
                mt-6 border border-white/10
                px-5 py-3 text-xs font-bold
                uppercase tracking-wider
                text-white/50
                transition
                hover:border-[#c7ff3d]
                hover:text-[#c7ff3d]
              "
            >
              Choose screenshot
            </span>

            <input
              id="conversation-screenshot"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleScreenshotChange}
              className="hidden"
            />

          </label>

        ) : (

          <div className="mt-4 border border-white/10 bg-[#191917] p-5">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-wider text-[#c7ff3d]">
                  Screenshot ready
                </p>

                <p className="mt-2 max-w-100 truncate text-xs text-white/30">
                  {screenshot.name}
                </p>

              </div>


              <button
                type="button"
                onClick={removeScreenshot}
                className="
                  text-xs font-bold uppercase
                  tracking-wider text-white/30
                  transition hover:text-red-400
                "
              >
                Remove
              </button>

            </div>


            {previewUrl && (

              <div className="mt-5 overflow-hidden border border-white/10 bg-[#11110f]">

                <img
                  src={previewUrl}
                  alt="Uploaded conversation screenshot"
                  className="
                    mx-auto max-h-125
                    max-w-full object-contain
                  "
                />

              </div>

            )}


            <label
              htmlFor="replace-conversation-screenshot"
              className="
                mt-4 inline-block cursor-pointer
                text-xs font-bold uppercase
                tracking-wider text-white/30
                transition hover:text-[#c7ff3d]
              "
            >
              Replace screenshot

              <input
                id="replace-conversation-screenshot"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleScreenshotChange}
                className="hidden"
              />

            </label>

          </div>

        )}

      </section>

    )
  }


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
            : "Paste the conversation here..."
        }
        className={`
          mt-4 w-full resize-none
          border border-white/10
          bg-[#191917] p-6 text-lg
          text-white outline-none
          transition
          placeholder:text-white/20
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