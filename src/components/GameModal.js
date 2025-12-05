import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const GameModal = ({ isOpen, onClose, onSave, gameToEdit, availableTags, }) => {
    const [title, setTitle] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [status, setStatus] = useState("backlog");
    const [selectedTags, setSelectedTags] = useState([]);
    const [completedDate, setCompletedDate] = useState(null);
    const [releaseDate, setReleaseDate] = useState(null);
    const [score, setScore] = useState(null);
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
        }
        else {
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
    const toggleTag = (tag) => {
        setSelectedTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
    };
    // Close modal on Escape key
    useEffect(() => {
        const handleEsc = (event) => {
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
        const newGame = {
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
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-6 overflow-y-auto max-h-[90vh]", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: gameToEdit ? "Edit Game" : "Add New Game" }), _jsx("label", { className: "block mb-2 font-semibold", children: "Title" }), _jsx("input", { type: "text", value: title, onChange: (e) => setTitle(e.target.value), className: "w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white" }), _jsx("label", { className: "block mb-2 font-semibold", children: "Cover Image URL" }), _jsx("input", { type: "text", value: coverImage, onChange: (e) => setCoverImage(e.target.value), className: "w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white" }), _jsx("label", { className: "block mb-2 font-semibold", children: "Status" }), _jsxs("select", { value: status, onChange: (e) => setStatus(e.target.value), className: "w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white", children: [_jsx("option", { value: "finished", children: "Finished" }), _jsx("option", { value: "backlog", children: "Backlog" }), _jsx("option", { value: "replay", children: "Replay" }), _jsx("option", { value: "abandoned", children: "Abandoned" }), _jsx("option", { value: "suspended", children: "Suspended" }), _jsx("option", { value: "wishlist", children: "Wishlist" })] }), status === "finished" && (_jsxs(_Fragment, { children: [_jsx("label", { className: "block mb-2 font-semibold", children: "Completed Date" }), _jsx("input", { type: "date", value: completedDate
                                ? completedDate.toISOString().substring(0, 10)
                                : "", onChange: (e) => setCompletedDate(new Date(e.target.value)), className: "w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white" })] })), status === "wishlist" && (_jsxs(_Fragment, { children: [_jsx("label", { className: "block mb-2 font-semibold", children: "Release Date" }), _jsx("input", { type: "date", value: releaseDate ? releaseDate.toISOString().substring(0, 10) : "", onChange: (e) => setReleaseDate(new Date(e.target.value)), className: "w-full mb-4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white" })] })), _jsxs("div", { className: "mb-4", children: [_jsxs("label", { className: "block text-sm font-medium mb-1", children: ["Score: ", score] }), _jsx("input", { type: "range", min: 0, max: 10, step: 1, value: score ?? 0, onChange: (e) => setScore(Number(e.target.value)), className: "\r\n      w-full\r\n      cursor-pointer\r\n      accent-teal-400         /* slider thumb + bar color */\r\n    " }), _jsx("div", { className: "flex justify-between text-xs text-gray-400 mt-1", children: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (_jsx("span", { children: n }, n))) })] }), _jsx("label", { className: "block mb-2 font-semibold", children: "Tags" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: availableTags.map((tag) => {
                        const isSelected = selectedTags.includes(tag); // check if this tag is selected
                        return (_jsx("button", { type: "button", onClick: () => toggleTag(tag), className: `px-3 py-1 rounded-full border font-semibold text-sm transition-colors ${selectedTags.includes(tag)
                                ? "text-black border-black" // text and border controlled
                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600" // unselected tags
                            }`, style: {
                                backgroundColor: selectedTags.includes(tag)
                                    ? "#7FFFD4"
                                    : undefined, // aquamarine
                            }, children: tag }, tag));
                    }) }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 rounded bg-gray-300 hover:bg-gray-400", children: "Cancel" }), _jsx("button", { onClick: handleSave, className: "px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700", children: gameToEdit ? "Save" : "Add Game" })] })] }) }));
};
export default GameModal;
