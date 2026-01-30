import { useState, useEffect, useRef } from "react";
import GameList from "./components/GameList";
import GameModal from "./components/GameModal";
import { Game } from "./types/Game";
import { games as initialGames } from "./data/games"; // import your data
import Navbar from "./components/Navbar";
import { useConfirm } from "./hooks/useConfirm";
import { FiltersContent } from "./components/FiltersContent";
import ManageTagsModal from "./components/ManageTagsModal";
import { renameTag } from "./utils/tags";
import Papa from "papaparse";
import { csvRowToGame } from "./utils/importCsv";
import { useCsvImport } from "./features/csvImport/useCsvImport";
import CsvImportModal from "./features/csvImport/CsvImportModal";

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
      window.matchMedia("(prefers-color-scheme: dark)").matches,
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

  // Open Modal for Managing Tags

  const [isManageTagsModalOpen, setIsManageTagsModalOpen] = useState(false);

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
      game.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((game) =>
      statusFilter === "all" ? true : game.status === statusFilter,
    )

    .filter((game) =>
      tagFilter === "all" ? true : game.tags.includes(tagFilter),
    );

  //clearfilter

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTagFilter("all");
  };

  // Renames tag globally and in games

  const handleRenameTag = (oldTag: string, newTag: string): string | null => {
    const result = renameTag(availableTags, oldTag, newTag);

    if (result.message) {
      return result.message; // let modal show error
    }
    //Updates global tags
    setAvailableTags(result.tags);

    // Updates all games that had the old tag
    setGames((prevGames) =>
      prevGames.map((game) => ({
        ...game,
        tags: game.tags.map((t) => (t === oldTag ? newTag : t)),
      })),
    );

    return null;
  };

  // Deletes tag globally and from games
  const handleDeleteTag = (tagToDelete: string) => {
    setAvailableTags((prev) => prev.filter((tag) => tag !== tagToDelete));

    setGames((prevGames) =>
      prevGames.map((game) => ({
        ...game,
        tags: game.tags.filter((t) => t !== tagToDelete),
      })),
    );
  };

  // brand new CSV import logic

  const csvImport = useCsvImport();
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // CSV cleaner
  const [csvPreview, setCsvPreview] = useState<Record<string, string>[]>([]);
  const [csvErrors, setCsvErrors] = useState<string[]>([]);

  const normalizeCSVHeaders = (csv: string) => {
    const lines = csv.split(/\r?\n/);
    if (!lines.length) return csv;

    const headerLine = lines[0];

    const headers = headerLine
      .split(",")
      .map(
        (h) =>
          h
            .trim()
            .replace(/^"+|"+$/g, "") // remove outer quotes
            .replace(/"+/g, ""), // remove any remaining quotes
      )
      .filter(Boolean);

    const fixedHeader = headers.map((h) => `"${h}"`).join(",");

    return [fixedHeader, ...lines.slice(1)].join("\n");
  };

  // CSV import handler
  const handleCSVImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const rawCSV = reader.result as string;
      const cleanCSV = normalizeCSVHeaders(rawCSV);
      console.log(
        "Fixed CSV header:",
        normalizeCSVHeaders(rawCSV).split("\n")[0],
      );

      Papa.parse<Record<string, string>>(cleanCSV, {
        header: true,
        skipEmptyLines: true,
        transform: (v) => v.replace(/^"|"$/g, "").trim(),
        complete: (results) => {
          const validationErrors = validateCSV(results.data);

          if (validationErrors.length) {
            setCsvErrors(validationErrors);
            setCsvPreview([]);
            return;
          }

          setCsvErrors([]);
          setCsvPreview(results.data);
        },
      });
    };

    reader.readAsText(file);
    e.target.value = "";
  };

  //validate columns helper

  const REQUIRED_COLUMNS = ["name", "platform"];

  const validateCSV = (rows: Record<string, string>[]) => {
    const errors: string[] = [];

    if (!rows.length) {
      errors.push("CSV is empty");
      return errors;
    }

    const headers = Object.keys(rows[0]);

    REQUIRED_COLUMNS.forEach((col) => {
      if (!headers.includes(col)) {
        errors.push(`Missing required column: ${col}`);
      }
    });

    return errors;
  };

  /*
    console.log("Parsed rows:", data[0]);
    console.log("All keys:", Object.keys(data[0]));
    console.log("First row object:", data[0]);
*/

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

  // ref to hidden file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    csvImport.handleFile(file, () => {
      setIsImportModalOpen(true);
    });

    e.target.value = ""; // reset input so same file can be reselected
  };

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
              <li
                className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  handleAddNew();
                  setIsMenuOpen(false);
                }}
              >
                Add Game
              </li>
              <li
                className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => {
                  setIsManageTagsModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                Manage Tags
              </li>

              <li
                className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => fileInputRef.current?.click()}
              >
                Import CSV
              </li>

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
        {csvErrors.length > 0 && (
          <div className="text-red-500 text-sm">
            {csvErrors.map((err) => (
              <div key={err}>{err}</div>
            ))}
          </div>
        )}
        {csvPreview.length > 0 && (
          <div className="mt-4 text-sm">
            <div className="font-semibold mb-2">
              CSV Preview ({csvPreview.length} rows)
            </div>

            <pre className="max-h-64 overflow-auto bg-gray-100 p-2 rounded">
              {JSON.stringify(csvPreview.slice(0, 3), null, 2)}
            </pre>
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
        <ManageTagsModal
          isOpen={isManageTagsModalOpen}
          onClose={() => setIsManageTagsModalOpen(false)}
          tags={availableTags}
          games={games}
          onAddTag={(tag) => setAvailableTags((prev) => [...prev, tag])}
          onRenameTag={handleRenameTag}
          onDeleteTag={handleDeleteTag}
        />
        isImportModalOpen && (
        <CsvImportModal
          isOpen={isImportModalOpen}
          columns={csvImport.csvColumns} // parsed CSV headers
          mapping={csvImport.mapping}
          onChangeMapping={(field, column) => {
            csvImport.setMapping((prev) => ({
              ...prev,
              [field]: column,
            }));
          }} // <- use setMapping here
          onCancel={() => setIsImportModalOpen(false)} // <- rename onClose → onCancel
          onConfirm={() => {
            console.log("Mapping confirmed:", csvImport.mapping);
            // logic to transform CSV rows → games here
            setIsImportModalOpen(false);
          }}
        />
        );
      </div>
      <input
        type="file"
        accept=".csv"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
};

export default App;
