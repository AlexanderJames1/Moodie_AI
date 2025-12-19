import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ restrictedTo }) {
  const { user } = useAuth();

  // If logged in → redirect to home/chat
  if (user && restrictedTo === "user") return <Navigate to="/" />;
  if (user && restrictedTo === "admin") return <Navigate to="/admin" />;

  return <Outlet />; // render nested routes for guests
}
