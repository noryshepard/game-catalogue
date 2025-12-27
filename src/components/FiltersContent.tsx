import Button from "../components/Button";
import { RotateCcw } from "lucide-react";

interface FiltersContentProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  tagFilter: string;
  setTagFilter: (value: string) => void;
  allTags: string[];
  clearFilters: () => void;
}

export function FiltersContent({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  tagFilter,
  setTagFilter,
  allTags,
  clearFilters,
}: FiltersContentProps) {
  return (
    <>
      <input
        type="text"
        placeholder="Search games..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 min-w-[220px] px-3 py-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="min-w-[160px] px-3 py-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        <option value="all">All statuses</option>
        <option value="finished">Finished</option>
        <option value="backlog">Backlog</option>
        <option value="replay">Replay</option>
        <option value="abandoned">Abandoned</option>
        <option value="suspended">Suspended</option>
        <option value="wishlist">Wishlist</option>
      </select>

      <select
        value={tagFilter}
        onChange={(e) => setTagFilter(e.target.value)}
        className="min-w-[160px] px-3 py-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        <option value="all">All tags</option>
        {allTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <Button
        variant="ghost"
        size="sm"
        onClick={clearFilters}
        aria-label="Clear search and filters"
      >
        <RotateCcw className="w-5 h-5" />
      </Button>
    </>
  );
}
