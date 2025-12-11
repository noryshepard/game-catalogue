import React from "react";
import { Game } from "../types/Game";
import { Edit, Trash } from "lucide-react";

interface GameCardProps {
  game: Game;
  onEdit: (game: Game) => void;
  onDelete: (id: number) => void;
  zoom: number;
  viewMode: "grid" | "list";
}

const GameCard: React.FC<GameCardProps> = ({
  game,
  onEdit,
  onDelete,
  zoom,
  viewMode,
}) => {
  const sizeClasses =
    zoom === 0
      ? "text-xs"
      : zoom === 1
      ? "text-sm"
      : zoom === 2
      ? "text-m"
      : zoom === 3
      ? "text-base"
      : "text-lg";

  const isList = viewMode === "list";

  return (
    <div
      className={`relative group rounded-lg shadow
    ${
      isList
        ? "flex flex-row items-center gap-4 p-4 bg-white dark:bg-gray-800"
        : "flex flex-col gap-4 p-4 bg-white dark:bg-gray-800 p-4 h-full"
    }
    ${sizeClasses}`}
    >
      {/* Cover Image */}
      {game.coverImage ? (
        <img
          src={game.coverImage}
          alt={game.title}
          className={
            isList
              ? "w-24 h-auto object-cover rounded-md" // LIST VIEW
              : "w-full aspect-video object-cover rounded-md" // GRID VIEW
          }
        />
      ) : (
        <div
          className={
            isList
              ? "w-24 h-auto rounded-md bg-zinc-800 flex items-center justify-center text-zinc-500 text-[0.8em]"
              : "w-full aspect-video rounded-md bg-zinc-800 flex items-center justify-center text-zinc-500 text-[1em]"
          }
        >
          No cover image
        </div>
      )}
      {/* Game title */}
      <div
        className={
          isList
            ? "flex flex-col justify-center flex-1 gap-1" // List: vertical stack next to image
            : "mt-3 flex flex-wrap items-center gap-x-2" // Grid: original layout
        }
      >
        <h3
          className={`font-bold truncate ${
            zoom === 0
              ? "text-sm"
              : zoom === 1
              ? "text-base"
              : zoom === 2
              ? "text-lg"
              : zoom === 3
              ? "text-xl"
              : "text-2xl"
          }`}
        >
          {game.title}
        </h3>
        {/* Status badge */}
        <div className="flex gap-2 flex-wrap">
          {" "}
          {/* wrapper ensures badge doesn't stretch */}
          <span
            className={`inline-block px-3 py-1 font-semibold rounded-full ${
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
      </div>
      {/* Tags */}
      <div
        className={`flex flex-wrap gap-2 ${
          isList ? "items-center" : "" // LIST: vertically center tags
        }`}
      >
        {game.tags.map((tag) => (
          <span
            key={tag}
            //className="px-3 py-1 text-[1em] rounded-full bg-gray-800 border border-gray-700 text-gray-200 font-medium"
            className={`
        px-3 py-1 rounded-full border border-gray-700 font-medium
        bg-gray-800 text-gray-200
        ${
          zoom === 0
            ? "text-sm"
            : zoom === 1
            ? "text-text-base"
            : zoom === 2
            ? "text-lg"
            : zoom === 3
            ? "text-xl"
            : "text-2xl"
        }
      `}
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
            <Trash className="w-5 h-5" stroke="currentColor" strokeWidth={2} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default GameCard;
