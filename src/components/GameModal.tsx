import React, { useState, useEffect } from "react";
import { Game } from "../types/Game";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (game: Game) => void;
  gameToEdit?: Game;
  availableTags: string[];
}

const GameModal: React.FC<GameModalProps> = ({
  isOpen,
  onClose,
  onSave,
  gameToEdit,
  availableTags,
}) => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState<Game["status"]>("backlog");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [completedDate, setCompletedDate] = useState<Date | null>(null);
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const [score, setScore] = useState<number | null>(null);

  // Initialize modal state when editing or opening new
  useEffect(() => {
    if (gameToEdit) {
      setTitle(gameToEdit.title);
      setCoverImage(gameToEdit.coverImage || "");
      setStatus(gameToEdit.status);
      setSelectedTags(gameToEdit.tags || []);
      setCompletedDate(gameToEdit.completedDate || null);
      setReleaseDate(gameToEdit.releaseDate || null);
      setScore(gameToEdit.score || null);
    } else {
      setTitle("");
      setCoverImage("");
      setStatus("backlog");
      setSelectedTags([]);
      setCompletedDate(null);
      setReleaseDate(null);
      setScore(null);
    }
  }, [gameToEdit]);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  // Save game and close modal
  const handleSave = () => {
    const newGame: Game = {
      id: gameToEdit?.id || Date.now(),
      title,
      coverImage,
      status,
      tags: selectedTags,
      score,
      completedDate: status === "finished" ? completedDate : null,
      releaseDate: status === "wishlist" ? releaseDate : null,
      comments: "",
    };
    onSave(newGame);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">
          {gameToEdit ? "Edit Game" : "Add New Game"}
        </h2>

        {/* Title */}
        <label className="block mb-2 font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />

        {/* Cover Image */}
        <label className="block mb-2 font-semibold">Cover Image URL</label>
        <input
          type="text"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />

        {/* Status */}
        <label className="block mb-2 font-semibold">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Game["status"])}
          className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        >
          <option value="finished">Finished</option>
          <option value="backlog">Backlog</option>
          <option value="replay">Replay</option>
          <option value="abandoned">Abandoned</option>
          <option value="suspended">Suspended</option>
          <option value="wishlist">Wishlist</option>
        </select>

        {/* Completed / Release Date */}
        {status === "finished" && (
          <>
            <label className="block mb-2 font-semibold">Completed Date</label>
            <input
              type="date"
              value={
                completedDate
                  ? completedDate.toISOString().substring(0, 10)
                  : ""
              }
              onChange={(e) => setCompletedDate(new Date(e.target.value))}
              className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </>
        )}
        {status === "wishlist" && (
          <>
            <label className="block mb-2 font-semibold">Release Date</label>
            <input
              type="date"
              value={
                releaseDate ? releaseDate.toISOString().substring(0, 10) : ""
              }
              onChange={(e) => setReleaseDate(new Date(e.target.value))}
              className="w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </>
        )}

        {/* SCORE */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Score: {score}
          </label>
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={score ?? 0}
            onChange={(e) => setScore(Number(e.target.value))}
            className="
      w-full
      cursor-pointer
      accent-teal-400         /* slider thumb + bar color */
    "
          />

          {/* Optional visual markers */}
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <label className="block mb-2 font-semibold">Tags</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {availableTags.map((tag) => {
            const isSelected = selectedTags.includes(tag); // check if this tag is selected
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)} // toggle selection
                className={`px-3 py-1 rounded-full border font-semibold text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? "text-black border-black" // text and border controlled
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600" // unselected tags
                }`}
                style={{
                  backgroundColor: selectedTags.includes(tag)
                    ? "#7FFFD4"
                    : undefined, // aquamarine
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {gameToEdit ? "Save" : "Add Game"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
