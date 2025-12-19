import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsPrivacy() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("user");
    setUser(saved ? JSON.parse(saved) : null);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} user={user} setUser={setUser} />

      <main className="pt-14 w-full max-w-4xl mx-auto px-4 space-y-8">
        <h1 className="text-4xl font-bold text-center py-6">Terms & Privacy Policy</h1>

        {/* Terms Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Terms of Use</h2>
          <p className="text-sm text-muted">
            Welcome to Moodie! By using our AI platform, you agree to follow our terms and guidelines. 
            You must use Moodie responsibly and respect others' privacy. We are not liable for any advice 
            misinterpreted or used irresponsibly. Usage may be monitored for quality and security purposes.
          </p>

          <ul className="list-disc pl-5 text-sm text-muted space-y-1">
            <li>Do not use Moodie for illegal activities.</li>
            <li>Respect intellectual property rights.</li>
            <li>Do not attempt to manipulate or hack the AI system.</li>
            <li>Moodie is not a substitute for professional medical, legal, or financial advice.</li>
          </ul>
        </section>

        {/* Privacy Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Privacy Policy</h2>
          <p className="text-sm text-muted">
            Moodie respects your privacy. Any information you provide will be stored securely and used 
            only to improve your experience. We do not sell personal data to third parties.
          </p>

          <ul className="list-disc pl-5 text-sm text-muted space-y-1">
            <li>We may store messages locally in your browser (localStorage) for convenience.</li>
            <li>All AI interactions are processed securely on our server.</li>
            <li>Your account information (if any) is protected with standard security measures.</li>
            <li>You can delete your account at any time, which removes your stored data.</li>
          </ul>
        </section>

        {/* Contact Section */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="text-sm text-muted">
            If you have any questions about our Terms or Privacy Policy, please contact us at:
          </p>
          <p className="text-sm text-muted font-medium">support@moodie.ai</p>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
