import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function FilterBar({ search, setSearch, filter, setFilter, }) {
    return (_jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center mb-4 p-4", children: [_jsx("input", { type: "text", placeholder: "Search by title...", value: search, onChange: (e) => setSearch(e.target.value), className: "px-3 py-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500" }), _jsx("div", { className: "flex gap-2", children: ["all", "finished", "owned", "wishlist"].map((f) => (_jsx("button", { onClick: () => setFilter(f), className: `px-3 py-1 rounded text-sm font-medium ${filter === f
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-200"}`, children: f.charAt(0).toUpperCase() + f.slice(1) }, f))) })] }));
}
