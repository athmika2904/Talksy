import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-[#11110f]">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        <Link to="/" className="group flex items-center gap-2">

          <span className="h-3 w-3 rounded-full bg-[#c7ff3d] transition-transform group-hover:scale-150" />

          <span className="text-lg font-black tracking-[-0.04em]">
            TALKSY
          </span>

        </Link>

        <div className="hidden items-center gap-8 text-sm md:flex">

          <Link
            to="/dashboard"
            className="text-white/50 transition hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            to="/reply-coach"
            className="text-white/50 transition hover:text-white"
          >
            Reply Coach
          </Link>

          <Link
            to="/practice"
            className="text-white/50 transition hover:text-white"
          >
            Practice
          </Link>

        </div>

        <Link
          to="/dashboard"
          className="border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider transition hover:border-[#c7ff3d] hover:text-[#c7ff3d]"
        >
          Enter →
        </Link>

      </div>

    </nav>
  )
}

export default Navbar