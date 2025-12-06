import React, { useState, useEffect } from "react";
import { Game } from "../types/Game";
import { X, Check } from "lucide-react";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (game: Game) => void;
  gameToEdit?: Game;
  availableTags: string[];
  addNewTag: (tag: string) => void;
}

const GameModal: React.FC<GameModalProps> = ({
  isOpen,
  onClose,
  onSave,
  gameToEdit,
  availableTags,
  addNewTag,
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

  //insert new tag to available tags if not exist

  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;

    // ✅ Add to global availableTags
    addNewTag(trimmed);

    // ✅ Add to this game's selected tags
    if (!selectedTags.includes(trimmed)) {
      setSelectedTags([...selectedTags, trimmed]);
    }

    // ✅ Clear input box
    setNewTag("");
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
        <div className="mb-6 space-y-1">
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

        {/* Add New Tag */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add new tag..."
            className="flex-1 rounded px-3 py-1 bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />

          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-1 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
          >
            +
          </button>
        </div>

        {/* Cancel & Save Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded flex items-center gap-2 transition-all duration-200 transform hover:scale-105 hover:bg-gray-600"
          >
            <X className="w-5 h-5 stroke-red-500" strokeWidth={3} />
            <span className="text-white">Cancel</span>
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 rounded flex items-center gap-2 transition-all duration-200 transform hover:scale-105 hover:bg-green-600"
          >
            <Check className="w-5 h-5 stroke-green-500" strokeWidth={3} />
            <span className="text-white">
              {/* green tick */}
              {gameToEdit ? "Save" : "Add Game"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameModal;
