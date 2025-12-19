import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setMenuOpen(false);
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Load user from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("user");
        setUser(saved ? JSON.parse(saved) : null);
    }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} user={user} setUser={setUser} />

      <main className={`pt-14 w-full max-w-7xl mx-auto px-4 transition-all duration-300 ${menuOpen ? "blur-sm pointer-events-none" : ""}`}>
        
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-8 py-12">
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Meet Moodie</h1>
            <p className="text-lg md:text-xl text-muted">
              Your personal AI assistant for mental health, advice, and guidance.
              Moodie helps you reflect, gain confidence, and navigate your daily life.
            </p>
            <p className="text-md text-muted">
              Explore how Moodie works, watch demos, and see how it can assist you in your journey.
            </p>
          </div>
          <div className="md:w-1/2">
            {/* Hero Image */}
            <img src="AI_CHAT.png" alt="Moodie AI" className="rounded-2xl shadow-lg w-full object-cover" />
          </div>
        </section>

        {/* Video / Demo Section */}
        <section className="py-12 space-y-8">
          <h2 className="text-3xl font-semibold text-center">AI in Action</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <img
              src="Demo2.png"
              className="rounded-xl shadow-lg max-w-md w-full"
            ></img>
            <img
              src="Demo_2.png"
              className="rounded-xl shadow-lg max-w-md w-full"
            ></img>
          </div>
        </section>

        {/* Features / Info Section */}
        <section className="py-12 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-muted rounded-2xl shadow-md bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-6">
            <h3 className="font-semibold text-xl mb-2">Mental Health Support</h3>
            <p className="text-sm text-muted">Moodie listens and offers guidance with empathy and care.</p>
          </div>
          <div className="p-6 bg-muted rounded-2xl shadow-md bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-6">
            <h3 className="font-semibold text-xl mb-2">Motivation & Advice</h3>
            <p className="text-sm text-muted">Get actionable advice and encouragement for everyday challenges.</p>
          </div>
          <div className="p-6 bg-muted rounded-2xl shadow-md bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-6">
            <h3 className="font-semibold text-xl mb-2">Easy to Use</h3>
            <p className="text-sm text-muted">Simple interface, quick responses, and no cloud storage required.</p>
          </div>
          <div className="p-6 bg-muted rounded-2xl shadow-md bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-6">
            <h3 className="font-semibold text-xl mb-2">Light and Normal Theme support</h3>
            <p className="text-sm text-muted">Navigate Theme choices best for you.</p>
          </div>
          <div className="p-6 bg-muted rounded-2xl shadow-md bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-6">
            <h3 className="font-semibold text-xl mb-2">User Freindly AI</h3>
            <p className="text-sm text-muted">Be part of Friends.</p>
          </div>
          <div className="p-6 bg-muted rounded-2xl shadow-md bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-6">
            <h3 className="font-semibold text-xl mb-2">Mobile Web Access</h3>
            <p className="text-sm text-muted">Can be Acccess to Mobile.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
