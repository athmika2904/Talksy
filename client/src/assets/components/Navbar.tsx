import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        <Link
          to="/"
          className="text-xl font-bold tracking-tight"
        >
          Talksy<span className="text-violet-600">.</span>
        </Link>

        <div className="flex items-center gap-6 text-sm">

          <Link
            to="/dashboard"
            className="text-zinc-600 hover:text-black"
          >
            Dashboard
          </Link>

          <Link
            to="/reply-coach"
            className="text-zinc-600 hover:text-black"
          >
            Reply Coach
          </Link>

          <Link
            to="/practice"
            className="text-zinc-600 hover:text-black"
          >
            Practice
          </Link>

          <button className="rounded-full bg-black px-5 py-2 text-white hover:bg-zinc-800">
            Get Started
          </button>

        </div>

      </div>
    </nav>
  )
}

export default Navbar