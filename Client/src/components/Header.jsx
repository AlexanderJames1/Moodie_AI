import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetOverlay,
} from "@/components/ui/sheet";

export default function Header({ menuOpen, setMenuOpen, user, setUser }) {
  const [hovered, setHovered] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const handleNewChat = () => {
    setMessages([]);
    navigate("/");
  };
  // handle responsive detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
   if(confirm("Are you sure you want to Logout?")){
    localStorage.removeItem("user"); 
    setUser(null);                   
    window.location.href = "/login"; 
   }
   else{
    e.preventDefault();
   }
    
  };

  return (
    <header className="w-full fixed top-0 z-50 bg-background/90 backdrop-blur-sm text-foreground">
    <div className={`max-w-7xl mx-auto flex items-center justify-between px-4 h-14 ${menuOpen ? "blur-sm pointer-events-none" : ""}`}>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={handleNewChat}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={hovered ? "NewTab.png" : "Logo.png"}
            alt="Moodie"
            className={`w-6 ${hovered ? "bg-gray-50 rounded-sm" : "bg-transparent"}`}
          />
          <span className="font-semibold text-lg" title="Moodie">Moodie</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-gray-700 text-center w-20 rounded-full hover:bg-gray-200 ${isActive("/") ? "underline font-semibold       text-black" : ""}`}>{user ? "Home" : "On Guest"}
            </Link>
            <Link
              to="/about"
              className={`text-gray-700 text-center w-20 rounded-full hover:bg-gray-200 ${isActive("/about") ? "underline font-semibold text-black" : ""}`}
            >
              About
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="px-2 h-8 shadow-xl/10 text-center rounded-full bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="bg-black text-white w-20 text-center h-7 rounded-full hover:scale-102">Login</Link>
                <Link to="/signup" className="px-4 py-1 rounded-full border bg-gray-200 hover:bg-gray-300">Sign up for free</Link>
              </>
            )}

            <ThemeToggle/>
          </nav>
        )}

        {/* Mobile Menu */}
         {isMobile && (
        <div className="md:hidden flex items-center gap-2">

           {user ? (
                <button
                  onClick={handleLogout}
                  className="px-2 py-2 rounded-full shadow-xl/20 bg-red-600 text-white hover:bg-red-700"
                >
                  Logout
                </button>
              ) : (
                <>
                 <Link to="/login" className="bg-black text-white w-20 text-center h-7 rounded-full hover:scale-102">Login</Link>
                 <Link
                    to="/signup"
                    className="px-4 py-1 rounded-full border bg-gray-200 hover:bg-gray-300">
                    {isMobile ? "Sign Up" : "Sign Up for Free"}
                </Link>
                </>
              )}

          <Sheet modal={false}
            open={menuOpen}
            onOpenChange={(open) => setMenuOpen(open)} 
          >

          {!menuOpen && (
            <SheetTrigger asChild>
              <Menu className="w-5 h-5 mr-2 cursor-pointer"/>
            </SheetTrigger>

          )}
            <SheetOverlay className="bg-black/50" />

            <SheetContent
              side="right"
              className="mr-0 mt-0  bg-gray-100 w-64 h-screen shadow-xl border-none"
              hideClose
            >
               <div className="flex items-center gap-2">
                  <img
                    src={hovered ? "NewTab.png" : "Logo.png"}
                    alt="Moodie"
                    className={`w-6 ${hovered ? "bg-gray-50 rounded-sm" : "bg-transparent"}`}
                  />
                  <span className="font-semibold text-lg">Moodie</span>
               </div>

              <div className="flex flex-col gap-4 mt-6">
              <ThemeToggle menuOpen={menuOpen}/>
              <Link to="/" className={`text-gray-700 ${isActive("/") ? "underline font-semibold text-black" : ""}`}>{user ? "Home" : "On Guest"}</Link>
              <Link to="/about" className={`text-gray-700 ${isActive("/about") ? "underline font-semibold text-black" : ""}`}> About </Link>
            </div>
            </SheetContent>
          </Sheet>
        </div>
         )}
      </div>
    </header>
  );
}
