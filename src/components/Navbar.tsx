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
  RotateCcw,
  Filter,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import Button from "../components/Button";
import { FiltersContent } from "../components/FiltersContent";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  onMenuToggle: () => void;
  onAddNew: () => void;
  viewMode: "grid" | "list";
  onToggleView: () => void;
  clearFilters: () => void;

  // search & filters stuff
  searchQuery: string;
  setSearchQuery: (value: string) => void;

  statusFilter: string;
  setStatusFilter: (value: string) => void;

  tagFilter: string;
  setTagFilter: (value: string) => void;

  allTags: string[];

  // mobile filters
  isFilterOpen: boolean;
  onFilterToggle: () => void;
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
  // search & filters stuff
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  tagFilter,
  setTagFilter,
  allTags,
  isFilterOpen,
  onFilterToggle,
  clearFilters,
}) => {
  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 border-b">
        {/* 🔹 ROW 1 */}
        <div className="flex items-center justify-between px-4 py-2">
          {/* LEFT */}
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

          {/* CENTER TITLE*/}
          <h1 className="font-bold text-center text-xl md:text-[1.5rem] text-black dark:text-white mx-auto w-full sm:w-auto -order-1 sm:order-0">
            My Game Catalogue
          </h1>

          {/* RIGHT */}
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

            {/* Mobile filter toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onFilterToggle}
              className="md:hidden"
              aria-label="Open filters"
            >
              <Filter size={20} />
            </Button>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700" />
        {/* Desktop filter toggle */}
        <div className="hidden md:flex justify-center py-1">
          <button
            onClick={onFilterToggle}
            aria-label="Toggle filters"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300"
          >
            {isFilterOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
