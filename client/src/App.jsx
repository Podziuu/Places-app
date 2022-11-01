import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
// import Users from "./pages/Users";
// import NewPlacePage from "./pages/NewPlacePage";
import MainNavigation from "./components/Navigation/MainNavigation";
// import NotFound from "./pages/NotFound";
// import UserPlaces from "./pages/UserPlaces";
// import UpdatePlacePage from "./pages/UpdatePlacePage";
// import Auth from "./pages/Auth";
import { AuthContext } from "./context/auth-context";
import PrivateRoutes from "./util/PrivateRoutes";
import { useAuth } from "./hooks/auth-hook";
import LoadingSpinner from "./components/UI/LoadingSpinnder";

const Users = React.lazy(() => import("./pages/Users"));
const NewPlacePage = React.lazy(() => import("./pages/NewPlacePage"));
const UserPlaces = React.lazy(() => import("./pages/UserPlaces"));
const UpdatePlacePage = React.lazy(() => import("./pages/UpdatePlacePage"));
const Auth = React.lazy(() => import("./pages/Auth"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  const { token, login, logout, userId } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        login,
        logout,
        userId,
      }}
    >
      <MainNavigation />
      <main>
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Users />} exact />
            <Route path="/:userId/places" element={<UserPlaces />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/places/new" element={<NewPlacePage />} />
              <Route path="/places/:placeId" element={<UpdatePlacePage />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </AuthContext.Provider>
  );
}

export default App;
