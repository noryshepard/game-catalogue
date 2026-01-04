import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import Tag from "../components/Tag";
import { normalizeTag, findExistingTag, renameTag } from "../utils/tags";
import { Edit, Trash, Plus } from "lucide-react";

interface ManageTagsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tags: string[];
  onAddTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
  onRenameTag: (oldTag: string, newTag: string) => string | null;
}

const ManageTagsModal: React.FC<ManageTagsModalProps> = ({
  isOpen,
  onClose,
  tags,
  onAddTag,
  onRenameTag,
  onDeleteTag,
}) => {
  if (!isOpen) return null;

  const sortedTags = [...tags].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );

  const handleAddTag = () => {
    const normalized = normalizeTag(newTag);
    if (!normalized) return;

    const existing = findExistingTag(tags, normalized);

    if (existing) {
      setTagError(`Tag already exists as "${existing}"`);
      return;
    }

    // ✅ Add new tag to parent/global list
    onAddTag(normalized); // Make sure this function is passed as a prop

    // ✅ Clear input and error
    setNewTag("");
    setTagError(null);
  };

  const [newTag, setNewTag] = useState("");
  const [tagError, setTagError] = useState<string | null>(null);

  const [tagToDelete, setTagToDelete] = useState<string | null>(null);

  //rename tag state

  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [editedTag, setEditedTag] = useState("");
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="manage-tags-title"
    >
      {/* MAIN MODAL */}

      <div
        className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-6 overflow-y-auto max-h-[90vh]"
        role="document"
      >
        <h2 className="text-xl font-bold mb-4">Manage Tags</h2>

        <div className="flex space-y-2 gap-2 mt-4">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add new tag..."
            className="flex-1 rounded px-3 py-1 bg-gray-200 dark:bg-gray-900 text-black dark:text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
            aria-label="New tag name"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAddTag}
            aria-label="Add new tag"
          >
            <Plus
              className="w-5 h-5 stroke-black dark:stroke-white"
              strokeWidth={3}
            />
          </Button>
        </div>
        {tagError && <p className="text-sm text-red-500 mt-1">{tagError}</p>}

        <ul className="space-y-2">
          {sortedTags.map((tag) => (
            <li key={tag} className="flex items-center justify-between gap-2">
              {editingTag === tag ? (
                /* 📝 EDIT MODE */
                <div className="flex items-center gap-2 w-full">
                  <input
                    value={editedTag}
                    onChange={(e) => setEditedTag(e.target.value)}
                    className="flex-1 rounded px-2 py-1 text-sm dark:bg-gray-700"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const message = onRenameTag(tag, editedTag);
                        if (!message) setEditingTag(null);
                      }
                      if (e.key === "Escape") {
                        setEditingTag(null);
                        setError(null);
                      }
                    }}
                  />

                  <button
                    className="text-sm text-blue-500"
                    onClick={() => {
                      const message = onRenameTag(tag, editedTag);
                      if (message) {
                        setError(message);
                        return;
                      }
                      setEditingTag(null);
                    }}
                  >
                    Save
                  </button>

                  <button
                    className="text-sm text-gray-500"
                    onClick={() => {
                      setEditingTag(null);
                      setError(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                /* 👀 VIEW MODE */
                <>
                  <Tag label={tag} />

                  <div className="flex gap-2">
                    <button
                      className="p-1 hover:bg-blue-200 dark:hover:bg-gray-700 rounded"
                      aria-label={`Rename tag ${tag}`}
                      onClick={() => {
                        setEditingTag(tag);
                        setEditedTag(tag);
                        setError(null);
                      }}
                    >
                      <Edit size={16} className="text-blue-500" />
                    </button>
                    <button
                      className="p-1 hover:bg-red-200 dark:hover:bg-gray-700 rounded"
                      aria-label={`Delete tag ${tag}`}
                      onClick={() => setTagToDelete(tag)} // opens confirmation dialog
                    >
                      <Trash size={16} className="text-red-500" />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            aria-label="Close Manage Tags modal"
          >
            Close
          </Button>
        </div>
      </div>
      {/* 🔥 CONFIRM DELETE DIALOG */}
      {tagToDelete && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-60"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm"
            role="document"
          >
            <h3
              id="confirm-delete-title"
              className="text-lg font-semibold mb-3 text-red-600"
            >
              Delete Tag
            </h3>

            <p className="mb-4 text-sm">
              Deleting <strong>{tagToDelete}</strong> will remove this tag from
              all games that use it. This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setTagToDelete(null)}
                className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700"
                aria-label="Cancel deleting tag"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onDeleteTag(tagToDelete);
                  setTagToDelete(null);
                }}
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                aria-label={`Confirm delete tag ${tagToDelete}`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTagsModal;
