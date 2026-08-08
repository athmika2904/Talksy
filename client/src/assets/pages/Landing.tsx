import { Link } from "react-router-dom"
import Navbar from "../components/Navbar.tsx";

function Landing() {
  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <main>

        

        <section className="mx-auto max-w-5xl px-6 pb-24 pt-24 text-center">

          <div className="mx-auto mb-6 w-fit rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-600">
            Built for people who overthink everything ⁶🤷🏻‍♀️⁷
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-zinc-950 md:text-7xl">

            Say what you mean.
            <br />

            <span className="text-violet-600">
              Without overthinking it.
            </span>

          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-500">

            Talksy helps you practice conversations,
            improve messages, and build confidence for
            real-life social situations.

          </p>

          <div className="mt-8 flex justify-center gap-4">

            <Link
              to="/dashboard"
              className="rounded-full bg-black px-7 py-3 font-medium text-white transition hover:bg-zinc-800"
            >
              Get started →
            </Link>

            <Link
              to="/practice"
              className="rounded-full border border-zinc-300 px-7 py-3 font-medium hover:bg-zinc-50"
            >
              Try practice
            </Link>

          </div>

        </section>


        

        <section className="mx-auto max-w-6xl px-6 pb-24">

          <div className="grid gap-5 md:grid-cols-3">

            <div className="rounded-3xl bg-violet-50 p-8 md:col-span-2">

              <div className="text-4xl">
                🗪
              </div>

              <h2 className="mt-6 text-2xl font-semibold">
                Stop staring at the typing box.
              </h2>

              <p className="mt-3 max-w-lg leading-7 text-zinc-600">
                Get natural reply suggestions that actually
                sound like you.
              </p>

            </div>


            <div className="rounded-3xl bg-zinc-100 p-8">

              <div className="text-4xl">
                𐀪𐀪
              </div>

              <h2 className="mt-6 text-2xl font-semibold">
                Practice before reality.
              </h2>

              <p className="mt-3 leading-7 text-zinc-600">
                Simulate awkward conversations without
                the awkwardness.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  )
}

export default Landing