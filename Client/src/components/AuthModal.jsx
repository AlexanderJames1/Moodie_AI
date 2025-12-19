"use client";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthModal() {
  const location = useLocation(); 
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (location.pathname === "/signup") setIsLogin(false);
    else setIsLogin(true);
  }, [location.pathname]);

  const handleAuth = () => {
    if (!email || !password || (!isLogin && !name)) {
      return alert("Please fill all fields.");
    }

    // Email validation
    if (!email.includes("@")) {
      return alert("Please enter a valid email address.");
    }

    // Password validation
    if (password.length < 8) {
      return alert("Password must be at least 8 characters long.");
    }

    const user = {
      name: isLogin ? email.split("@")[0] : name,
      email,
    };

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-background px-4">
    <div className="w-full max-w-md rounded-xl bg-gray-100 p-8 shadow-xl">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        {isLogin ? "Welcome Back" : "Create Your Account"}
      </h2>
      <p className="text-sm text-muted text-center mb-6">
        {isLogin ? "Login to continue using Moodie" : "Sign up to start your journey with Moodie"}
      </p>

      {/* Social Login Buttons */}
      <div className="flex flex-col gap-3 mb-6">
        <button className="flex bg-gray-200 items-center cursor-pointer hover:bg-gray-300 justify-center gap-3 w-full py-2 border-none rounded-xl transition">
          <img src="/google.png" alt="Google" className="w-5 h-5"/>
          Continue with Google
        </button>
        <button className="flex bg-gray-200 items-center cursor-pointer hover:bg-gray-300 justify-center gap-3 w-full py-2 border-none rounded-xl transition">
          <img src="/facebook.png" alt="Facebook" className="w-5 h-5"/>
          Continue with Facebook
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="flex-1 border-b border-border"></span>
        <span className="text-xs text-muted uppercase">or</span>
        <span className="flex-1 border-b border-border"></span>
      </div>

      {/* Form Inputs */}
      <div className="grid gap-4">
        {!isLogin && (
          <div className="grid gap-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="rounded-xl border border-none bg-gray-200 px-4 py-2"
            />
          </div>
        )}

        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="rounded-xl border border-none bg-gray-200 px-4 py-2"
          />
        </div>

        <div className="grid gap-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="rounded-xl border border-none bg-gray-200 px-4 py-2"
          />
        </div>

        <Button
          variant="link"
          size="sm"
          className="justify-end px-0 text-xs text-muted hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create an account?" : "Already have an account?"}
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-6">
        <Button className="w-full py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-900 hover:scale-101 800 hover:text-white cursor-pointer" onClick={handleAuth}>
          {isLogin ? "Login" : "Sign Up"}
        </Button>

        <Button
          variant="outline"
          className="w-full py-2 rounded-xl bg-gray-300 hover:bg-gray-400 cursor-pointer border-none"
          onClick={() => navigate("/")}
        >
          Continue as Guest
        </Button>
      </div>
    </div>
  </div>

  );
}
