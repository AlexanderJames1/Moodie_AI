import React from "react";
import "./index.css"; 
import ReactDOM from "react-dom/client"; 
import AppRoute from "./AppRoute";          
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "next-themes";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
