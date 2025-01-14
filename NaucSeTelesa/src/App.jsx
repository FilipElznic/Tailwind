import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import LoginPage from "./pages/loginPage";
import SuccessPage from "./pages/successPage";
import { ProtectedRoute, RedirectIfLoggedIn } from "./ProtectedRoute";
import TailwindTest from "./pages/TailwindTest";
import UserPage from "./pages/userpage";
import TaskPage from "./pages/taskPage";
import TelesaPage from "./pages/telesaPage";
import AboutPage from "./pages/aboutPage";
import ProfilePic from "./Components/ProfilePic";
import { GlobalProvider } from "./Global"; // Používáme pojmenovaný export

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <Router>
          <Routes>
            {/* Public route for login */}
            <Route path="/prihlaseni" element={<LoginPage />} />

            {/* Protected routes */}
            <Route
              path="/uzivatel"
              element={
                <ProtectedRoute redirectTo="/prihlaseni">
                  <SuccessPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tailwind"
              element={
                <ProtectedRoute redirectTo="/prihlaseni">
                  <TailwindTest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ukoly"
              element={
                <ProtectedRoute redirectTo="/prihlaseni">
                  <TaskPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/telesa"
              element={
                <ProtectedRoute redirectTo="/prihlaseni">
                  <TelesaPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projekt"
              element={
                <ProtectedRoute redirectTo="/">
                  <AboutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pic"
              element={
                <ProtectedRoute redirectTo="/prihlaseni">
                  <ProfilePic />
                </ProtectedRoute>
              }
            />
            <Route
              path="/success"
              element={
                <ProtectedRoute redirectTo="/">
                  <SuccessPage />
                </ProtectedRoute>
              }
            />

            {/* Redirect logged-in users from the root ("/") */}
            <Route
              path="/"
              element={
                <RedirectIfLoggedIn redirectTo="/success">
                  <UserPage />
                </RedirectIfLoggedIn>
              }
            />
          </Routes>
        </Router>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
