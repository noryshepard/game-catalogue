import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import GameList from "./components/GameList";
import GameModal from "./components/GameModal";
import { games as initialGames } from "./data/games"; // import your data
const App = () => {
    const [games, setGames] = useState(initialGames);
    const availableTags = [
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
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gameToEdit, setGameToEdit] = useState(undefined);
    // Open modal for new game
    const handleAddNew = () => {
        setGameToEdit(undefined);
        setIsModalOpen(true);
    };
    // Open modal for editing existing game
    const handleEdit = (game) => {
        setGameToEdit(game);
        setIsModalOpen(true);
    };
    // Delete game from list
    const handleDelete = (gameId) => {
        setGames((prev) => prev.filter((g) => g.id !== gameId));
    };
    // Save game (new or edited)
    const handleSave = (game) => {
        setGames((prev) => {
            const exists = prev.find((g) => g.id === game.id);
            if (exists) {
                // Update existing game
                return prev.map((g) => (g.id === game.id ? game : g));
            }
            else {
                // Add new game
                return [...prev, game];
            }
        });
    };
    return (_jsxs("div", { className: "p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "My Game Catalogue" }), _jsx("button", { onClick: handleAddNew, className: "mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700", children: "+ Add Game" }), _jsx(GameList, { games: games, onEdit: handleEdit, onDelete: handleDelete }), _jsx(GameModal, { isOpen: isModalOpen, onClose: () => setIsModalOpen(false), onSave: handleSave, gameToEdit: gameToEdit, availableTags: availableTags })] }));
};
export default App;
