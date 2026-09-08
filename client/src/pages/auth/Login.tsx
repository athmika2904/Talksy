import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
export function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
    const { login } = useAuth()
  async function handleLogin(
    
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
        "http://localhost:5000/api/auth/login",
        {
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
      console.error("Login error:", error)

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
            WELCOME BACK
          </p>

          <h1 className="mt-4 text-4xl font-black">
            Keep going.
          </h1>

          <p className="mt-4 text-sm leading-6 text-white/40">
            Log in and continue building your confidence
            one step at a time.
          </p>
        </div>


        <form
          onSubmit={handleLogin}
          className="mt-10 border border-white/10 bg-[#191917] p-7"
        >


          <div>
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
              placeholder="Your password"
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
              !email.trim() ||
              !password
            }
            className="mt-6 w-full bg-[#c7ff3d] px-6 py-4 text-sm font-black text-black transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-20"
          >
            {loading
              ? "LOGGING IN..."
              : "LOG IN →"}
          </button>

        </form>


        

        <p className="mt-6 text-center text-sm text-white/30">
          Don't have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="font-bold text-[#c7ff3d] hover:underline"
          >
            Create one
          </button>
        </p>

      </div>
    </main>
  )
}

export default Login