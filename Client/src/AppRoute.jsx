import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFoundPage";
import TermsPrivacy from "./pages/Terms";


export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Allowed laht ng access */}
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<TermsPrivacy />} />

        {/* Public routes */}
        <Route element={<PublicRoute restrictedTo="user" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Private + guest allowed route */}
        <Route element={<PrivateRoute allowedRole="user" guestAllowed={true} />}>
          <Route path="/" element={<ChatPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
