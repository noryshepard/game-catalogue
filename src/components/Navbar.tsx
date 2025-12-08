import { useEffect, useState } from "react";
import { Menu, Sun, Moon, ZoomIn, ZoomOut, Plus } from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  onMenuToggle: () => void;
  onAddNew: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  toggleDarkMode,
  zoomIn,
  zoomOut,
  onMenuToggle,
  onAddNew,
}) => {
  return (
    <nav className="sticky top-0 z-100 w-full bg-white dark:bg-gray-800 px-4 py-0.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left side: Dark mode + Zoom */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Zoom out */}
          <button
            onClick={zoomOut}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ZoomOut size={20} />
          </button>

          {/* Zoom in */}
          <button
            onClick={zoomIn}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ZoomIn size={20} />
          </button>
        </div>
        <h1 className="font-semibold text-center text-base md:text-lg mx-auto">
          My Game Catalogue
        </h1>
        {/* Hamburger Button - menu right side */}
        <div className="flex items-center space-x-2">
          {/* Add Game button */}
          <button
            onClick={onAddNew}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-3 py-1 rounded transition-colors"
          >
            + Add Game
          </button>
          <button
            onClick={onMenuToggle}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
