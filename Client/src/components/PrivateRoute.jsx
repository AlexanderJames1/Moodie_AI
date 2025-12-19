import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ allowedRole, guestAllowed = false }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user && !guestAllowed) return <Navigate to="/login" replace />;
  return <Outlet />;
}
