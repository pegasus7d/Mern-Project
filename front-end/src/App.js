import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
// import Users from "./user/pages/Users";
import { BrowserRouter as Router } from "react-router-dom";
// import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
// import UserPlaces from "./places/pages/UserPlaces";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import React from "react";
import { Suspense } from "react";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
const Users=React.lazy(()=>import("./user/pages/Users"))
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const Auth = React.lazy(() => import("./user/pages/Auth"));


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
        <main><Suspense fallback={
          <div className="center">
          <LoadingSpinner />
        </div>
        }>{routes}</Suspense></main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
