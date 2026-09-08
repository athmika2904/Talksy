import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
export function Signup() {
  const navigate = useNavigate()
    const {login}=useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSignup(
    event: React.FormEvent
  ) {
    event.preventDefault()

    if (loading) {
      return
    }

    setError("")
    setLoading(true)

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password,
        }
      )

      login(
  response.data.token,
  response.data.user
)

      navigate("/")
    } catch (error: any) {
      console.error("Signup error:", error)

      setError(
        error.response?.data?.message ||
          "Something went wrong."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#11110f] px-6 py-16 text-[#f4f4f0]">

      <div className="mx-auto max-w-md">

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c7ff3d]">
            CREATE ACCOUNT
          </p>

          <h1 className="mt-4 text-4xl font-black">
            Start small.
          </h1>

          <p className="mt-4 text-sm leading-6 text-white/40">
            Create an account and start building your
            confidence one step at a time.
          </p>
        </div>

        <form
          onSubmit={handleSignup}
          className="mt-10 border border-white/10 bg-[#191917] p-7"
        >

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-white/30">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Your name"
              className="mt-3 w-full border border-white/10 bg-[#11110f] px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </div>

          <div className="mt-5">
            <label className="text-xs font-bold uppercase tracking-widest text-white/30">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
              className="mt-3 w-full border border-white/10 bg-[#11110f] px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </div>

          <div className="mt-5">
            <label className="text-xs font-bold uppercase tracking-widest text-white/30">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="At least 6 characters"
              className="mt-3 w-full border border-white/10 bg-[#11110f] px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
            />
          </div>

          {error && (
            <div className="mt-5 border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={
              loading ||
              !name.trim() ||
              !email.trim() ||
              password.length < 6
            }
            className="mt-6 w-full bg-[#c7ff3d] px-6 py-4 text-sm font-black text-black transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-20"
          >
            {loading
              ? "CREATING ACCOUNT..."
              : "CREATE ACCOUNT →"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-white/30">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-bold text-[#c7ff3d] hover:underline"
          >
            Log in
          </button>
        </p>

      </div>

    </main>
  )
}

export default Signup