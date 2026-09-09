import Navbar from "../components/Navbar"
import FeatureCard from "../components/FeatureCard"
import ProgressCard from "../components/ProgressCard"

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
        <div className="min-h-screen bg-[#11110f] text-[#f4f4f0]">

            <Navbar />


            <main className="mx-auto max-w-7xl px-6 py-12">

                {/* HEADER */}

                <section className="flex flex-col justify-between gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end">

                    <div>

                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c7ff3d]">
                            PERSONAL SPACE
                        </p>


                        <h1 className="mt-4 text-5xl font-black tracking-[-0.06em]">
                            Hey, {user.name}.
                        </h1>


                        <p className="mt-3 text-sm text-white/40">
                            What are we working on today?
                        </p>

                    </div>


                    <div className="text-left md:text-right">

                        <p className="text-3xl font-black">
                            {user.confidenceScore}%
                        </p>


                        <p className="text-xs uppercase tracking-widest text-white/30">
                            confidence score
                        </p>

                    </div>

                </section>


                {/* FEATURES */}

                <section className="mt-8 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">

                    <FeatureCard
                        emoji="↗"
                        title="REPLY COACH"
                        description="Got a message you're overthinking? Let's work through it."
                        link="/reply-coach"
                        large
                    />


                    <FeatureCard
                        emoji="◎"
                        title="PRACTICE"
                        description="Try the conversation before you have it."
                        link="/practice"
                    />


                    <FeatureCard
                        emoji="✦"
                        title="TODAY'S CHALLENGE"
                        description="One tiny step outside your comfort zone."
                        link="/challenges"
                    />

                </section>


                {/* PROGRESS */}

                <section className="mt-8">

                    <ProgressCard
                        streak={user.streak}
                        conversations={
                            user.conversations
                        }
                        confidenceScore={
                            user.confidenceScore
                        }
                    />

                </section>

            </main>

        </div>
    )
}


export default Dashboard