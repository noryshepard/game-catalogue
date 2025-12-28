import React, { useState, useEffect } from "react";
import GameList from "./components/GameList";
import GameModal from "./components/GameModal";
import { Game } from "./types/Game";
import { games as initialGames } from "./data/games"; // import your data
import Navbar from "./components/Navbar";
import { useConfirm } from "./hooks/useConfirm";
import { FiltersContent } from "./components/FiltersContent";

const App = () => {
  const [games, setGames] = useState<Game[]>(initialGames);
  const { confirm, ConfirmDialog } = useConfirm();
  const [availableTags, setAvailableTags] = useState<string[]>([
    "RPG",
    "Adventure",
    "Action",
    "Indie",
    "Puzzle",
    "Strategy",
    "Multiplayer",
    "Singleplayer",
    "Driving",
    "Metroidvania",
    "Platformer",
    "Rhythm",
    "Horror",
    "Point & Click",
    "Building",
    "Cooking",
    "Sports",
  ]);

  //navbar menu
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [cardZoom, setCardZoom] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const zoomIn = () => setCardZoom((z) => Math.min(z + 1, 4));
  const zoomOut = () => setCardZoom((z) => Math.max(z - 1, 0));

  //change view from grid to list
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  // Add new tag globally
  const addNewTag = (tag: string) => {
    setAvailableTags((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameToEdit, setGameToEdit] = useState<Game | undefined>(undefined);

  // Open modal for new game
  const handleAddNew = () => {
    setGameToEdit(undefined);
    setIsModalOpen(true);
  };

  // Open modal for editing existing game
  const handleEdit = (game: Game) => {
    setGameToEdit(game);
    setIsModalOpen(true);
  };

  // Delete game from list

  const handleDelete = async (gameId: number) => {
    // Ask user for confirmation
    const ok = await confirm("Are you sure you want to delete this game?");
    if (!ok) return;

    // If confirmed → delete normally

    setGames((prev) => prev.filter((g) => g.id !== gameId));
  };

  // Save game (new or edited)
  const handleSave = (game: Game) => {
    setGames((prev) => {
      const exists = prev.find((g) => g.id === game.id);
      if (exists) {
        // Update existing game
        return prev.map((g) => (g.id === game.id ? game : g));
      } else {
        // Add new game
        return [...prev, game];
      }
    });
  };

  //Collapsible filter panel
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  //console log isFilterOpen changes
  useEffect(() => {
    console.log("isFilterOpen changed:", isFilterOpen);
  }, [isFilterOpen]);

  //search stuff
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | string>("all");
  const [tagQuery, setTagQuery] = useState("");
  const allTags = Array.from(new Set(games.flatMap((game) => game.tags)));
  const [tagFilter, setTagFilter] = useState("all");

  const filteredGames = games
    .filter((game) =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((game) =>
      statusFilter === "all" ? true : game.status === statusFilter
    )

    .filter((game) =>
      tagFilter === "all" ? true : game.tags.includes(tagFilter)
    );

  //clearfilter

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTagFilter("all");
  };

  //sync html dark class with isDarkMode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [isDarkMode]);

  return (
    <>
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        viewMode={viewMode}
        onToggleView={toggleViewMode}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        onAddNew={handleAddNew}
        searchQuery={searchQuery} // search & filters stuff
        setSearchQuery={setSearchQuery}
        isFilterOpen={isFilterOpen}
        onFilterToggle={() => setIsFilterOpen((v) => !v)}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        tagFilter={tagFilter}
        setTagFilter={setTagFilter}
        allTags={allTags}
        clearFilters={clearFilters}
      />
      <div className="flex-1 min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors flex flex-col p-4">
        {/* Slide-out menu on the right */}
        {isMenuOpen && (
          <div
            className={`fixed top-[62px] right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 p-4
            ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
          >
            <h2 className="text-xl font-semibold mb-4">Menu</h2>
            <div className="border-t border-gray-200 dark:border-gray-700border-t border-gray-200 dark:border-gray-700 max-w-4xl mx-auto mb-4" />
            <ul className="space-y-3">
              <li className="cursor-pointer hover:underline">Add Game</li>
              <li className="cursor-pointer hover:underline">Manage Tags</li>
              <li className="cursor-pointer hover:underline">Import CSV</li>
              <li className="cursor-pointer hover:underline">Export CSV</li>
              <li className="cursor-pointer hover:underline">About</li>
            </ul>
          </div>
        )}

        {isMenuOpen && ( //background overlay when menu is open
          <div
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30"
          />
        )}

        {isFilterOpen && (
          <div
            className="
      fixed top-[72px] left-0 w-full
      bg-white dark:bg-gray-800
      border-b shadow-md
      z-40
    "
            onClick={(e) => e.stopPropagation()} // ✅ stops chevron click from closing when clicking inside
          >
            <div className="flex flex-wrap gap-2 max-w-4xl mx-auto w-full p-3">
              <FiltersContent
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                tagFilter={tagFilter}
                setTagFilter={setTagFilter}
                allTags={allTags}
                clearFilters={clearFilters}
              />
            </div>
          </div>
        )}

        <GameList
          games={filteredGames}
          onEdit={handleEdit}
          onDelete={handleDelete}
          zoom={cardZoom}
          viewMode={viewMode}
        />
        <ConfirmDialog />

        <GameModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          gameToEdit={gameToEdit}
          availableTags={availableTags}
          addNewTag={addNewTag}
        />
      </div>
    </>
  );
};

export default App;
