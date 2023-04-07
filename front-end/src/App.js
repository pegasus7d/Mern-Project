import "./App.css";
import { Routes, Route } from "react-router-dom";
import Users from "./user/pages/Users";
import { BrowserRouter as Router} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
      </Routes>
      </main>
    </Router>
  );
}

export default App;
