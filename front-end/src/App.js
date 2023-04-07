import "./App.css";
import { Routes, Route } from "react-router-dom";
import Users from "./user/pages/Users";
import { BrowserRouter as Router} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/places/new" element={<NewPlace />} />
      </Routes>
      </main>
    </Router>
  );
}

export default App;
