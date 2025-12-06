import React, { useState } from "react";
import GameList from "./components/GameList";
import GameModal from "./components/GameModal";
import { Game } from "./types/Game";
import { games as initialGames } from "./data/games"; // import your data

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

  //hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900">
      {/* Container for relative positioning */}
      <div className="relative flex flex-col items-end">
        {/* Hamburger + dark mode */}
        <div className="flex items-center gap-2 bg-gray-900 dark:bg-gray-900 p-2 rounded shadow">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
          >
            <div className="w-5 h-0.5 bg-gray-900 dark:bg-white mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-900 dark:bg-white mb-1"></div>
            <div className="w-5 h-0.5 bg-gray-900 dark:bg-white"></div>
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded hover:bg-gray-900 dark:hover:bg-gray-900 transition-colors"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Expanded menu */}
        {menuOpen && (
          <div className="absolute top-full right-0 mt-2 flex flex-col gap-2 bg-gray-50 dark:bg-gray-900 p-2 rounded shadow w-40">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
              Add Game
            </button>
            <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
              Manage Tags
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Import CSV
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Export CSV
            </button>
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          My Game Catalogue
        </h1>

        <button
          onClick={handleAddNew}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Game
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
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
        <GameList
          games={filteredGames}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
  );
};

export default App;
