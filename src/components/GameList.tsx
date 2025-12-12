import React, { useState } from "react";
import { Game } from "../types/Game";
import GameCard from "./GameCard";
import { MotionDiv } from "./MotionDiv";
import { motion, AnimatePresence } from "framer-motion";

interface GameListProps {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (gameId: number) => void;
  zoom: number;
  viewMode: "grid" | "list";
}

const GameList: React.FC<GameListProps> = ({
  games,
  onEdit,
  onDelete,
  zoom,
  viewMode,
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
      ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      : zoom === 1
      ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      : zoom === 2
      ? "sm:grid-cols-2 md:grid-cols-3"
      : zoom === 3
      ? "sm:grid-cols-2"
      : zoom === 4
      ? "grid-cols-1"
      : "";

  // Grid logic
  const wrapperClass =
    viewMode === "grid"
      ? `grid grid-cols-1 ${gridCols} gap-4`
      : "flex flex-col gap-4 px-4";

  const isList = viewMode === "list";

  return (
    <MotionDiv className={wrapperClass} layout>
      <AnimatePresence>
        {games?.map((game) => (
          <motion.div
            key={game.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            {...({ className: isList ? "" : "min-h-[350px] h-full" } as any)} // uniform height in grid view
          >
            <GameCard
              key={game.id}
              game={game}
              onEdit={onEdit}
              onDelete={onDelete}
              zoom={zoom}
              viewMode={viewMode}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </MotionDiv>
  );
};

export default GameList;
