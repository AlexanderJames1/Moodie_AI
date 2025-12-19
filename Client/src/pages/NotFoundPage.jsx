import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center bg-white/100 backdrop-blur-md rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-xl font-semibold text-gray-700 mb-4">
          You seem a little lost
        </p>
        <p className="text-gray-600 mb-6">
          It’s okay. Even the mind wanders sometimes. Let’s gently find our way back.
        </p>

        <div className="flex flex-col gap-3">
          <Link to="/login">
            <Button className="w-full rounded-xl text-base">
              Take me home
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="outline"
              className="w-full rounded-xl text-base border-gray-300 text-gray-800 hover:bg-gray-100"
            >
              Talk to Moodie
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          I’m still here with you 🤍
        </p>
      </motion.div>
    </div>
  );
}