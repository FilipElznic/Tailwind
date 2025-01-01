import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import LoginPage from "./pages/loginPage";
import SuccessPage from "./pages/successPage";
import { ProtectedRoute, RedirectIfLoggedIn } from "./ProtectedRoute";
import TailwindTest from "./pages/TailwindTest";
import UserPage from "./pages/userpage";
import TaskPage from "./pages/taskPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/prihlaseni" element={<LoginPage />} />
          <Route path="/uzivatel" element={<SuccessPage />} />
          <Route path="/tailwind" element={<TailwindTest />} />
          <Route path="/ukoly" element={<TaskPage />} />

          {/* Protect the Success page */}
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
    </AuthProvider>
  );
}

export default App;
