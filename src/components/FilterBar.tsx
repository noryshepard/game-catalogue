import React from "react";

interface FilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  filter: "all" | "finished" | "owned" | "wishlist";
  setFilter: (value: "all" | "finished" | "owned" | "wishlist") => void;
}

export default function FilterBar({
  search,
  setSearch,
  filter,
  setFilter,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center mb-4 p-4">
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-3 py-2 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
      />
      <div className="flex gap-2">
        {(["all", "finished", "owned", "wishlist"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded text-sm font-medium ${
              filter === f
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
