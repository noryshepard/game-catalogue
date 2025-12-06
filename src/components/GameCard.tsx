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
      ? "text-xs p-2"
      : zoom === 1
      ? "text-sm p-3"
      : zoom === 2
      ? "text-base p-4"
      : "text-lg p-5";
  const widthClasses =
    zoom === 0 ? "w-36" : zoom === 1 ? "w-44" : zoom === 2 ? "w-52" : "w-60";

  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-lg shadow ${sizeClasses} ${widthClasses}`}
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow p-4 group">
        {/* Cover Image */}
        {game.coverImage ? (
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
        ) : (
          <div className="w-full h-40 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-500 text-sm">
            No cover image
          </div>
        )}
        {/* Game title */}
        <h3 className="mt-2 font-bold text-lg">{game.title}</h3>

        {/* Status badge */}
        <span
          className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
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

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="
        px-3 py-1 text-sm 
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

        {/* Status date */}
        {game.status === "finished" && game.completedDate && (
          <p className="text-sm text-gray-500 mt-1">
            Completed: {game.completedDate.toLocaleDateString()}
          </p>
        )}

        {game.status === "wishlist" && game.releaseDate && (
          <p className="text-sm text-gray-500 mt-1">
            Release: {game.releaseDate.toLocaleDateString()}
          </p>
        )}

        {/* Score */}
        {game.score !== null && (
          <p className="text-sm font-semibold mt-1">Score: {game.score}/10</p>
        )}

        {/* Edit & Trash icons - visible only on hover */}
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
    </div>
  );
};

export default GameCard;
