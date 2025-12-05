import React, { useState } from "react";
import { Game } from "../types/Game";
import GameCard from "./GameCard";

interface GameListProps {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (gameId: number) => void;
}

const GameList: React.FC<GameListProps> = ({ games, onEdit, onDelete }) => {
  // Track selected tags per game (use game's tags by default)
  const [selectedTagsPerGame, setSelectedTagsPerGame] = useState<
    Record<number, string[]>
  >(() =>
    games.reduce((acc, game) => {
      acc[game.id] = game.tags || [];
      return acc;
    }, {} as Record<number, string[]>)
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {games?.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default GameList;
