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
import { useAuth } from "./hooks/auth-hook";

function App() {
  const { token, login, logout, userId } = useAuth();
  console.log(import.meta.env.VITE_GOOGLE_API_KEY)
  console.log(import.meta.env.BACKEND_URL)
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
