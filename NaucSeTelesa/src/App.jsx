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
          <Route path="/user" element={<UserPage />} />
          {/* Protect the Success page */}
          <Route path="/tailwind" element={<TailwindTest />} />
          {/* Protect the Success page */}
          <Route path="/tasks" element={<TaskPage />} />
          <Route
            path="/success"
            element={
              <ProtectedRoute redirectTo="/">
                <SuccessPage />
              </ProtectedRoute>
            }
          />

          {/* Redirect logged-in users from the Login page */}
          <Route
            path="/"
            element={
              <RedirectIfLoggedIn redirectTo="/success">
                <LoginPage />
              </RedirectIfLoggedIn>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
