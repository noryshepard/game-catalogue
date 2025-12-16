import { useEffect, useState } from "react";
import {
  Menu,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  LayoutGrid,
  List,
  Plus,
} from "lucide-react";

import Button from "../components/Button";

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
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          {/* Zoom out */}
          <Button
            variant="ghost"
            size="sm"
            onClick={zoomOut}
            aria-label="Zoom out"
          >
            <ZoomOut size={20} />
          </Button>

          {/* Zoom in */}
          <Button
            variant="ghost"
            size="sm"
            onClick={zoomIn}
            aria-label="Zoom in"
          >
            <ZoomIn size={20} />
          </Button>

          {/* View Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleView}
            aria-label="Switch to List/Grid View"
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
          </Button>
        </div>
        <h1 className="font-bold text-center text-xl md:text-[1.5rem] text-black dark:text-white mx-auto w-full sm:w-auto -order-1 sm:order-0">
          My Game Catalogue
        </h1>
        {/* Hamburger Button - menu right side */}
        <div className="flex items-center gap-2">
          {/* Add Game button */}
          <Button
            variant="custom"
            size="sm"
            onClick={onAddNew}
            aria-label="Add New Game"
            className="bg-teal-400 text-black border-transparent hover:bg-teal-500 dark:bg-purple-700 dark:text-white dark:border-transparent dark:hover:bg-purple-800"
          >
            <Plus
              className="w-5 h-5 stroke-black dark:stroke-white"
              strokeWidth={2}
            />
            <span className="text-black dark:text-white">Add Game</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            aria-label="Open Menu"
          >
            <Menu size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
