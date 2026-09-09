import { Navigate, Outlet } from "react-router-dom"

import { useAuth } from "../context/AuthContext"


function ProtectedRoute() {
  const {
    user,
    loading,
  } = useAuth()



  if (loading) {
    return (
      <main className="min-h-screen bg-[#11110f] text-[#f4f4f0]">
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/30">
            Loading...
          </p>
        </div>
      </main>
    )
  }


  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }



  return <Outlet />
}


export default ProtectedRoute