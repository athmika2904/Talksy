import Navbar from "../components/Navbar"
import { useAuth } from "../context/AuthContext"


function Dashboard() {
  const {
    user,
    loading,
  } = useAuth()


  if (loading) {
    return (
      <main className="min-h-screen bg-[#11110f] text-[#f4f4f0]">
        <Navbar />

        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/30">
            Loading your progress...
          </p>
        </div>
      </main>
    )
  }


  if (!user) {
    return null
  }


  return (
    <main className="min-h-screen bg-[#11110f] text-[#f4f4f0]">

      <Navbar />


      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* HEADER */}

        <section>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c7ff3d]">
            YOUR PROGRESS
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-6xl">
            Hey, {user.name}.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/40">
            Keep showing up. Small conversations,
            small challenges, real progress.
          </p>
        </section>


        {/* STATS */}

        <section className="mt-12 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">

          {/* XP */}

          <div className="bg-[#191917] p-8">

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
              TOTAL XP
            </p>

            <p className="mt-5 text-5xl font-black">
              {user.xp}
            </p>

            <p className="mt-3 text-xs text-white/30">
              Confidence points earned
            </p>

          </div>


          {/* STREAK */}

          <div className="bg-[#191917] p-8">

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
              CURRENT STREAK
            </p>

            <p className="mt-5 text-5xl font-black">
              {user.streak}
            </p>

            <p className="mt-3 text-xs text-white/30">
              {user.streak === 1
                ? "day"
                : "days"}{" "}
              of showing up
            </p>

          </div>


          {/* CHALLENGES */}

          <div className="bg-[#191917] p-8">

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
              CHALLENGES COMPLETED
            </p>

            <p className="mt-5 text-5xl font-black">
              {user.completedChallenges}
            </p>

            <p className="mt-3 text-xs text-white/30">
              Real-world actions taken
            </p>

          </div>

        </section>


        {/* PROGRESS MESSAGE */}

        <section className="mt-12 border border-white/10 bg-[#191917] p-8 md:p-10">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c7ff3d]">
                KEEP GOING
              </p>

              <h2 className="mt-4 text-2xl font-black">
                Confidence is built by doing.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/40">
                Practice conversations with AI, then
                take those skills into the real world
                through your daily challenges.
              </p>

            </div>


            <a
              href="/challenges"
              className="shrink-0 bg-[#c7ff3d] px-6 py-4 text-center text-xs font-black uppercase tracking-widest text-black transition hover:-translate-y-1"
            >
              Today's Challenge →
            </a>

          </div>

        </section>


        {/* QUICK ACTIONS */}

        <section className="mt-12">

          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
            KEEP PRACTICING
          </p>


          <div className="mt-5 grid gap-4 md:grid-cols-2">

            <a
              href="/practice"
              className="group border border-white/10 bg-[#191917] p-7 transition hover:-translate-y-1 hover:border-white/20"
            >

              <p className="text-xs font-bold uppercase tracking-widest text-[#c7ff3d]">
                PRACTICE
              </p>

              <h3 className="mt-4 text-xl font-black">
                Talk it out with AI
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/40">
                Practice difficult conversations without
                the pressure of a real interaction.
              </p>

              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-white/20 transition group-hover:text-[#c7ff3d]">
                Start practicing →
              </p>

            </a>


            <a
              href="/reply-coach"
              className="group border border-white/10 bg-[#191917] p-7 transition hover:-translate-y-1 hover:border-white/20"
            >

              <p className="text-xs font-bold uppercase tracking-widest text-[#c7ff3d]">
                REPLY COACH
              </p>

              <h3 className="mt-4 text-xl font-black">
                Don't know what to say?
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/40">
                Get natural reply suggestions for
                awkward or confusing conversations.
              </p>

              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-white/20 transition group-hover:text-[#c7ff3d]">
                Get a reply →
              </p>

            </a>

          </div>

        </section>

      </div>

    </main>
  )
}


export default Dashboard