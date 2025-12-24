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

  // search & filters stuff
  searchQuery: string;
  setSearchQuery: (value: string) => void;

  statusFilter: string;
  setStatusFilter: (value: string) => void;

  tagFilter: string;
  setTagFilter: (value: string) => void;

  allTags: string[];
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
}) => {
  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTagFilter("all");
  };

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
          </div>
        </div>

        {/* 🔹 BOTTOM ROW: search & filters */}
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2 max-w-4xl mx-auto w-full">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-1/4 px-3 py-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All statuses</option>
              <option value="finished">Finished</option>
              <option value="backlog">Backlog</option>
              <option value="replay">Replay</option>
              <option value="abandoned">Abandoned</option>
              <option value="suspended">Suspended</option>
              <option value="wishlist">Wishlist</option>
            </select>

            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="w-full sm:w-1/4 px-3 py-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            {/* Clear Filters Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              aria-label="Clear search and filters"
            >
              <RotateCcw className="w-5 h-5 stroke-gray-500 dark:stroke-gray-200" />
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
