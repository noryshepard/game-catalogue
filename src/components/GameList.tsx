import React, { useState } from "react";
import { Game } from "../types/Game";
import GameCard from "./GameCard";

interface GameListProps {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (gameId: number) => void;
  zoom: number;
}

const GameList: React.FC<GameListProps> = ({
  games,
  onEdit,
  onDelete,
  zoom,
}) => {
  // Track selected tags per game (use game's tags by default)
  const [selectedTagsPerGame, setSelectedTagsPerGame] = useState<
    Record<number, string[]>
  >(() =>
    games.reduce((acc, game) => {
      acc[game.id] = game.tags || [];
      return acc;
    }, {} as Record<number, string[]>)
  );

    const gridCols =
    zoom === 0
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : zoom === 1
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : zoom === 2
      ? "sm:grid-cols-2"
      : "";

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-4`}>
      {games?.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          onEdit={onEdit}
          onDelete={onDelete}
          zoom={zoom}
        />
      ))}
    </div>
  );
};

export default GameList;
