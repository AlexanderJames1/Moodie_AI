import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import AuthModal from "../components/AuthModal";
import Footer from "../components/Footer";

export default function SignUp() {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setMenuOpen(false);
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">

      {/* Header */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className={`pt-14 w-full max-w-xl transition-all duration-300 ${menuOpen ? "blur-sm pointer-events-none" : ""}`}>

        {/* Hero */}
        <AuthModal/>

        {/*Footer*/}
        <Footer/>
      </main>
    </div>
  );
}
