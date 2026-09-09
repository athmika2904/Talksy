import {
  Routes,
  Route,
} from "react-router-dom"

import Landing from "./pages/Landing"

import Dashboard from "./pages/Dashboard"

import ReplyCoach from "./pages/ReplyCoach"

import PracticeSetup from "./pages/Practice/PracticeSetup"

import PracticeChat from "./pages/Practice/PracticeChat"

import PracticeFeedback from "./pages/Practice/PracticeFeedback"

import Challenges from "./pages/Challenges/Challenges"

import Signup from "./pages/auth/SIgnup"

import Login from "./pages/auth/Login"

import ProtectedRoute from "./components/ProtectedRoute"


function App() {
  return (
    <Routes>

      {/* PUBLIC */}

      <Route
        path="/"
        element={<Landing />}
      />

      <Route
        path="/reply-coach"
        element={<ReplyCoach />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/login"
        element={<Login />}
      />


      {/* PROTECTED */}

      <Route element={<ProtectedRoute />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/practice"
          element={<PracticeSetup />}
        />

        <Route
          path="/practice/session"
          element={<PracticeChat />}
        />

        <Route
          path="/practice/feedback"
          element={<PracticeFeedback />}
        />

        <Route
          path="/challenges"
          element={<Challenges />}
        />

      </Route>

    </Routes>
  )
}


export default App
