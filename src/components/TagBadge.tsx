import React from "react";

export interface TagBadgeProps {
  label: string;
  zoom: number;
}

const TagBadge: React.FC<TagBadgeProps> = ({ label, zoom }) => {
  const sizeClass =
    zoom === 0
      ? "text-sm"
      : zoom === 1
      ? "text-base"
      : zoom === 2
      ? "text-lg"
      : zoom === 3
      ? "text-xl"
      : "text-2xl";

  return (
    <span
      className={`
        inline-flex items-center justify-center
        px-3 py-1 rounded-full border font-medium
        bg-gray-200 text-gray-800 border-gray-600
        dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700
        ${sizeClass}
      `}
    >
      {label}
    </span>
  );
};

export default TagBadge;
