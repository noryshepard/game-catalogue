import React from "react";
import { Game } from "../types/Game";
import { Edit, Trash } from "lucide-react";

interface GameCardProps {
  game: Game;
  onEdit: (game: Game) => void;
  onDelete: (id: number) => void;
  zoom: number;
}

const GameCard: React.FC<GameCardProps> = ({
  game,
  onEdit,
  onDelete,
  zoom,
}) => {
  const sizeClasses =
    zoom === 0
      ? "text-xs"
      : zoom === 1
      ? "text-sm"
      : zoom === 2
      ? "text-base"
      : "text-lg";

  return (
    <div
      className={`relative group flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow p-4 ${sizeClasses}`}
    >
      {/* Cover Image */}
      {game.coverImage ? (
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full aspect-video object-cover rounded-md"
        />
      ) : (
        <div className="w-full aspect-video rounded-md bg-zinc-800 flex items-center justify-center text-zinc-500 text-[1em]">
          No cover image
        </div>
      )}
      {/* Game title */}
      <div className="mt-3 flex flex-wrap items-center gap-x-2">
        <h3 className="font-bold text-[2em]">{game.title}</h3>
        {/* Status badge */}
        <span
          className={`inline-block px-3 py-1 text-[1em] font-semibold rounded-full ${
            game.status === "finished"
              ? "bg-green-500 text-white"
              : game.status === "backlog"
              ? "bg-yellow-500 text-white"
              : game.status === "replay"
              ? "bg-purple-500 text-white"
              : game.status === "abandoned"
              ? "bg-red-500 text-white"
              : game.status === "suspended"
              ? "bg-gray-500 text-white"
              : "bg-blue-500 text-white" // wishlist
          }`}
        >
          {game.status}
        </span>
      </div>
      {/* Tags */}
      <div className="mt-2 flex flex-wrap gap-2">
        {game.tags.map((tag) => (
          <span
            key={tag}
            className="
        px-3 py-1 text-[1em] 
        rounded-full 
        bg-gray-800 
        border border-gray-700 
        text-gray-200 
        font-medium
      "
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-col items-start gap-1">
        {/* Status date */}
        {game.status === "finished" && game.completedDate && (
          <p className="text-[1em] text-gray-500">
            Completed: {game.completedDate.toLocaleDateString()}
          </p>
        )}

        {game.status === "wishlist" && game.releaseDate && (
          <p className="text-[1em] text-gray-500">
            Release: {game.releaseDate.toLocaleDateString()}
          </p>
        )}

        {/* Score */}
        {game.score !== null && (
          <p className="text-[1em] font-semibold">Score: {game.score}/10</p>
        )}

      </div>
      {/* Edit & Trash icons - visible only on hover */}
      <div className="absolute z-1 top-4 right-4 flex gap-2 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(game)}
          className="w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition-colors"
        >
          <span className="text-green-500">
            <Edit className="w-5 h-5" stroke="currentColor" strokeWidth={2} />
          </span>
        </button>
        <button
          onClick={() => onDelete(game.id)}
          className="w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition-colors"
        >
          <span className="text-red-500">
            <Trash
              className="w-5 h-5"
              stroke="currentColor"
              strokeWidth={2}
            />
          </span>
        </button>
      </div>
    </div>
  );
};

export default GameCard;
