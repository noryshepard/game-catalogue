import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import GameCard from "./GameCard";
const GameList = ({ games, onEdit, onDelete }) => {
    // Track selected tags per game (use game's tags by default)
    const [selectedTagsPerGame, setSelectedTagsPerGame] = useState(() => games.reduce((acc, game) => {
        acc[game.id] = game.tags || [];
        return acc;
    }, {}));
    return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: games?.map((game) => (_jsx(GameCard, { game: game, onEdit: onEdit, onDelete: onDelete }, game.id))) }));
};
export default GameList;
