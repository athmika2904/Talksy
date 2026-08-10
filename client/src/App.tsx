import {BrowserRouter,Routes,Route} from "react-router-dom";
import Landing from "./assets/pages/Landing";
import Dashboard from "./assets/pages/Dashboard";
import ReplyCoach from "./assets/pages/ReplyCoach";


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
