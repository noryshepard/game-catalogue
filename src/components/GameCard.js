import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Edit, Trash } from "lucide-react";
const GameCard = ({ game, onEdit, onDelete }) => {
    return (_jsxs("div", { className: "relative bg-white dark:bg-gray-800 rounded-lg shadow p-4 group", children: [game.coverImage ? (_jsx("img", { src: game.coverImage, alt: game.title, className: "w-full h-40 object-cover rounded-md mb-4" })) : (_jsx("div", { className: "w-full h-40 rounded-md bg-zinc-800 flex items-center justify-center text-zinc-500 text-sm", children: "No cover image" })), _jsx("h3", { className: "mt-2 font-bold text-lg", children: game.title }), _jsx("span", { className: `inline-block px-3 py-1 text-sm font-semibold rounded-full ${game.status === "finished"
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
                }`, children: game.status }), _jsx("div", { className: "flex flex-wrap gap-2 mt-3", children: game.tags.map((tag) => (_jsx("span", { className: "\r\n        px-3 py-1 text-sm \r\n        rounded-full \r\n        bg-gray-800 \r\n        border border-gray-700 \r\n        text-gray-200 \r\n        font-medium\r\n      ", children: tag }, tag))) }), game.score !== null && (_jsxs("p", { className: "text-sm font-semibold mt-1", children: ["Score: ", game.score, "/10"] })), _jsxs("div", { className: "absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [_jsx("button", { onClick: () => onEdit(game), className: "w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition-colors", children: _jsx("span", { className: "text-green-500", children: _jsx(Edit, { className: "w-5 h-5", stroke: "currentColor", strokeWidth: 2 }) }) }), _jsx("button", { onClick: () => onDelete(game.id), className: "w-6 h-6 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 transition-colors", children: _jsx("span", { className: "text-red-500", children: _jsx(Trash, { className: "w-5 h-5", stroke: "currentColor", strokeWidth: 2 }) }) })] })] }));
};
export default GameCard;
