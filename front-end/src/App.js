import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./user/pages/Users";
import { BrowserRouter as Router } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";




const App = () => {

  const {token,login,logout,userId}=useAuth();
 
  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" />} replace />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        {/* <Route path="/places/new" element={<NewPlace />} /> */}
        <Route path="/:userId/places" element={<UserPlaces />} />
        {/* <Route path="/places/:placeId" element={<UpdatePlace />} /> */}
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} replace />
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
