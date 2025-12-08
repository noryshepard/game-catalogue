import React, { useState, useEffect } from "react";
import GameList from "./components/GameList";
import GameModal from "./components/GameModal";
import { Game } from "./types/Game";
import { games as initialGames } from "./data/games"; // import your data
import Navbar from "./components/Navbar";

const App = () => {
  const [games, setGames] = useState<Game[]>(initialGames);
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [cardZoom, setCardZoom] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const zoomIn = () => setCardZoom((z) => Math.min(z + 1, 3));
  const zoomOut = () => setCardZoom((z) => Math.max(z - 1, 0));

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
  const handleDelete = (gameId: number) => {
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

  //sync html dark class with isDarkMode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
        <Navbar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          onAddNew={handleAddNew}
        />
        {/* Slide-out menu on the right */}
        {isMenuOpen && (
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl z-40 p-4 transform transition-transform duration-300
            ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
  `}
          >
            <h2 className="text-xl font-semibold mb-4">Menu</h2>
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

        {/* Sticky search/filter bar full width */}
        <div className="sticky top-15 z-50 w-full bg-white dark:bg-neutral-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-5 border-gray-300 dark:border-gray-900">
          {" "}
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded dark:bg-gray-800 w-full sm:w-1/2 focus:outline-none
    focus:ring-2
    focus:ring-teal-400
    focus:border-teal-400"
          />
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
    block
    w-full
    sm:w-1/4
    px-3
    py-2
    border
    border-gray-300
    rounded
    bg-white
    dark:bg-gray-800
    text-gray-900
    dark:text-gray-100
    focus:outline-none
    focus:ring-2
    focus:ring-teal-400
    focus:border-teal-400
  "
          >
            <option value="all">All statuses</option>
            <option value="finished">Finished</option>
            <option value="backlog">Backlog</option>
            <option value="replay">Replay</option>
            <option value="abandoned">Abandoned</option>
            <option value="suspended">Suspended</option>
            <option value="wishlist">Wishlist</option>
          </select>
          {/* Search tag */}
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="
    block
    w-full
    sm:w-1/4
    px-3
    py-2
    border
    border-gray-300
    rounded
    bg-white
    dark:bg-gray-800
    text-gray-900
    dark:text-gray-100
    focus:outline-none
    focus:ring-2
    focus:ring-teal-400
    focus:border-teal-400
  "
          >
            <option value="all">All tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <div className="px-4 pt-4">
          <GameList
            games={filteredGames}
            onEdit={handleEdit}
            onDelete={handleDelete}
            zoom={cardZoom}
          />
          <GameModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            gameToEdit={gameToEdit}
            availableTags={availableTags}
            addNewTag={addNewTag}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
