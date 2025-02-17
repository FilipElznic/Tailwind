import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserPage from "./pages/userpage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route for login */}
        <Route path="/" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
