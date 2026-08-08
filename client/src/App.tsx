import {BrowserRouter,Routes,Route} from "react-router-dom";
import Landing from "./assets/pages/Landing";

function Dashboard() {
  return <h1>Dashboard</h1>
}

function ReplyCoach() {
  return <h1>Reply Coach</h1>
}

function Practice() {
  return <h1>Conversation Practice</h1>
}

function Challenges() {
  return <h1>Challenges</h1>
}
function App(){
  return(
     <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/reply-coach"
          element={<ReplyCoach />}
        />

        <Route
          path="/practice"
          element={<Practice />}
        />

        <Route
          path="/challenges"
          element={<Challenges />}
        />

      </Routes>
    </BrowserRouter>
  )
}
export default App;
