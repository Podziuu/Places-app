import { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import NewPlacePage from "./pages/NewPlacePage";
import MainNavigation from "./components/Navigation/MainNavigation";
import NotFound from "./pages/NotFound";
import UserPlaces from "./pages/UserPlaces";
import UpdatePlacePage from "./pages/UpdatePlacePage";
import Auth from "./pages/Auth";
import { AuthContext } from "./context/auth-context";
import PrivateRoutes from "./util/PrivateRoutes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        userId,
      }}
    >
      <MainNavigation />
      <main>
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
      </main>
    </AuthContext.Provider>
  );
}

export default App;
