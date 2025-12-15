import React, { useState } from "react";

interface TagsProps {
  availableTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onAddTag?: (tag: string) => void; // optional for new tag input
}

const Tags: React.FC<TagsProps> = ({
  availableTags,
  selectedTags,
  onToggleTag,
  onAddTag,
}) => {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (!trimmed) return;
    if (onAddTag) onAddTag(trimmed);
    if (!selectedTags.includes(trimmed)) onToggleTag(trimmed);
    setNewTag("");
  };

  return (
    <div className="space-y-2">
      {/* Tags list */}
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onToggleTag(tag)}
              className={`px-3 py-1 rounded-full border font-semibold text-sm transition-colors
                ${
                  isSelected
                    ? "bg-teal-300 text-black border-teal-400 dark:bg-teal-500 dark:text-black"
                    : "bg-gray-200 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                }
              `}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Add new tag input */}
      {onAddTag && (
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add new tag..."
            className="flex-1 rounded px-3 py-1 bg-gray-200 text-black dark:bg-gray-900 dark:text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-1 rounded bg-teal-500 text-white dark:bg-teal-600 dark:text-white hover:bg-teal-600 dark:hover:bg-teal-500 transition-colors"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default Tags;
