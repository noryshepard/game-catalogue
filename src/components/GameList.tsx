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

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
                min-[1600px]:grid-cols-6 min-[1920px]:grid-cols-7 min-[2200px]:grid-cols-8 gap-4"
    >
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
