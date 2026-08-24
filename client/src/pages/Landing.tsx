import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

function Landing() {
  return (
    <div className="min-h-screen bg-[#11110f] text-[#f4f4f0]">

      <Navbar />

      <main>


        <section className="relative overflow-hidden border-b border-white/10">

          <div className="mx-auto max-w-7xl px-6 pb-28 pt-24">

            <div className="mb-16 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-white/40">
              <span className="h-px w-8 bg-[#c7ff3d]" />
              Your social life, but less stressful.
            </div>


            <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:items-end">

              <div>

                <h1 className="max-w-5xl text-6xl font-black leading-[0.9] tracking-[-0.07em] md:text-8xl">

                  STOP
                  <br />

                  <span className="text-[#c7ff3d]">
                    OVERTHINKING.
                  </span>

                </h1>

                <p className="mt-10 max-w-xl text-base leading-7 text-white/50 md:text-lg">

                  A private AI space for the conversations
                  you rehearse in your head 47 times before
                  actually having them.

                </p>

                <div className="mt-8 flex flex-wrap gap-3">

                  <Link
                    to="/dashboard"
                    className="bg-[#c7ff3d] px-7 py-4 text-sm font-black uppercase tracking-wide text-[#11110f] transition hover:-translate-y-1"
                  >
                    Try it out →
                  </Link>

                  <Link
                    to="/practice"
                    className="border border-white/20 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white/70 transition hover:border-white hover:text-white"
                  >
                    Practice a conversation
                  </Link>

                </div>

              </div>


   

              <div className="relative">

                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#c7ff3d] opacity-10 blur-3xl" />

                <div className="border border-white/10 bg-[#191917] p-6">

                  <div className="mb-8 flex items-center justify-between">

                    <span className="text-xs font-bold uppercase tracking-widest text-white/30">
                      LIVE THOUGHT
                    </span>

                    <span className="text-xs text-[#c7ff3d]">
                      ● thinking
                    </span>

                  </div>

                  <p className="text-xl leading-8 text-white/80">
                    "Should I reply now or will
                    that make me look desperate?"
                  </p>

                  <div className="my-6 h-px bg-white/10" />

                  <p className="text-sm leading-6 text-white/40">
                    You don't need to decode every
                    conversation alone.
                  </p>

                  <div className="mt-6 flex gap-2">

                    <span className="bg-white/5 px-3 py-2 text-xs text-white/50">
                      overthinking
                    </span>

                    <span className="bg-white/5 px-3 py-2 text-xs text-white/50">
                      texting
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>



        <section className="mx-auto max-w-7xl px-6 py-24">

          <div className="mb-14">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c7ff3d]">
              WHAT YOU CAN DO
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tighter md:text-5xl">
              Social situations.
              <br />
              Less intimidating.
            </h2>

          </div>


          <div className="grid border-l border-t border-white/10 md:grid-cols-3">

            <Feature
              number="01"
              title="REPLY COACH"
              description="Turn the message you've rewritten 12 times into something that actually sounds like you."
            />

            <Feature
              number="02"
              title="PRACTICE"
              description="Have the awkward conversation here first. Nobody judges your first attempt."
            />

            <Feature
              number="03"
              title="CHALLENGES"
              description="Small real-world missions designed to slowly push you outside your comfort zone."
            />

          </div>

        </section>

      </main>

    </div>
  )
}


interface FeatureProps {
  number: string
  title: string
  description: string
}

function Feature({
  number,
  title,
  description,
}: FeatureProps) {

  return (
    <div className="group border-b border-r border-white/10 p-8 transition hover:bg-white/3">

      <div className="mb-20 flex items-start justify-between">

        <span className="text-xs font-bold text-white/30">
          {number}
        </span>

        <span className="text-white/20 transition group-hover:text-[#c7ff3d]">
          ↗
        </span>

      </div>

      <h3 className="text-xl font-black tracking-tight">
        {title}
      </h3>

      <p className="mt-4 text-sm leading-7 text-white/40">
        {description}
      </p>

    </div>
  )
}

export default Landing