import {BrowserRouter,Routes,Route} from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ReplyCoach from "./pages/ReplyCoach";
import PracticeSetup from "./pages/Practice/PracticeSetup";
import PracticeChat from "./pages/Practice/PracticeChat";


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
          element={<PracticeSetup />}
        />

        <Route path="/practice/session" element={<PracticeChat />} />
        <Route
          path="/challenges"
          element={<Challenges />}
        />

      </Routes>
    </BrowserRouter>
  )
}
export default App;
