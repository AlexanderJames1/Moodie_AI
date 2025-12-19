import { Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle({menuOpen}) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark");

  if (menuOpen) {
    return (
      <h3 title="Theme toggle"
        onClick={toggleTheme}
        className="hover:underline cursor-pointer transition text-sm"
      >
        {theme === "dark" ? "Light Mode" : "Normal Mode"}
      </h3>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 mr-7 rounded-full border border-border hover:bg-muted transition cursor-pointer"
      aria-label="Toggle theme" title="Toggle theme"
    >
      <Sun className="h-4 w-4 dark:hidden" />
      <img
        src="Normal.png"
        alt="Dark"
        className="h-4 w-4 hidden dark:block"
      />
    </button>
  );
}
