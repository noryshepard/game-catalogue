import React from "react";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  tagFilter: string;
  setTagFilter: (val: string) => void;
  allTags: string[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  tagFilter,
  setTagFilter,
  allTags,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full mb-4">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search games..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 px-3 py-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
      />

      {/* Status filter */}
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="block sm:w-1/4 px-3 py-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
      >
        <option value="all">All statuses</option>
        <option value="finished">Finished</option>
        <option value="backlog">Backlog</option>
        <option value="replay">Replay</option>
        <option value="abandoned">Abandoned</option>
        <option value="suspended">Suspended</option>
        <option value="wishlist">Wishlist</option>
      </select>

      {/* Tag filter */}
      <select
        value={tagFilter}
        onChange={(e) => setTagFilter(e.target.value)}
        className="block sm:w-1/4 px-3 py-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
      >
        <option value="all">All tags</option>
        {allTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilters;
