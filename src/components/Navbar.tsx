import { useEffect, useState } from "react";
import { Menu, Sun, Moon } from "lucide-react";

interface NavbarProps {
  onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  const [dark, setDark] = useState(false);

  // Sync dark mode with <html>
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center gap-4 p-4">
      {/* Theme Toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="p-2 rounded-xl bg-white dark:bg-neutral-800 shadow
                   hover:scale-110 transition-transform"
      >
        {dark ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
      </button>
      <nav className="fixed top-0 right-0 z-50 flex items-center gap-4 p-4">
        {/* Hamburger Button */}
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-xl bg-white dark:bg-neutral-800 shadow 
                   hover:scale-110 transition-transform"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>
    </nav>
  );
}
