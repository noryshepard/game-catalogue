import { useEffect, useState } from "react";
import {
  Menu,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  LayoutGrid,
  List,
} from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  onMenuToggle: () => void;
  onAddNew: () => void;
  viewMode: "grid" | "list";
  onToggleView: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  toggleDarkMode,
  zoomIn,
  zoomOut,
  onMenuToggle,
  onAddNew,
  viewMode,
  onToggleView,
}) => {
  return (
    <nav className="sticky top-0 z-100 w-full bg-white dark:bg-gray-800 px-4 py-2">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left side: Dark mode + Zoom */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Zoom out */}
          <button
            onClick={zoomOut}
            className="rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ZoomOut size={20} />
          </button>

          {/* Zoom in */}
          <button
            onClick={zoomIn}
            className="rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <ZoomIn size={20} />
          </button>

          {/* View Mode Toggle */}
          <button
            onClick={onToggleView}
            className="p-2 rounded-lg hover:bg-zinc-800 transition"
            title={
              viewMode === "grid"
                ? "Switch to List View"
                : "Switch to Grid View"
            }
          >
            {viewMode === "grid" ? (
              <List className="w-5 h-5" />
            ) : (
              <LayoutGrid className="w-5 h-5" />
            )}
          </button>
        </div>
        <h1 className="font-bold text-center text-xl md:text-[1.5rem] dark:text-white mx-auto w-full sm:w-auto -order-1 sm:order-0">
          My Game Catalogue
        </h1>
        {/* Hamburger Button - menu right side */}
        <div className="flex items-center gap-2">
          {/* Add Game button */}
          <button
            onClick={onAddNew}
            className="hover:bg-green-600 font-semibold rounded transition-colors text-xs"
          >
            + Add Game
          </button>
          <button
            onClick={onMenuToggle}
            className="rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
