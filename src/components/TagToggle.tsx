import React from "react";

export interface TagToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether the toggle is active */
  selected: boolean;

  /** Text shown inside the toggle */
  label: string;
}

const TagToggle: React.FC<TagToggleProps> = ({
  selected,
  label,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400";

  const selectedClasses = "bg-teal-400 text-black border-teal-500";

  const unselectedClasses =
    "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700";

  return (
    <button
      type="button"
      aria-pressed={selected}
      className={`${baseClasses} ${
        selected ? selectedClasses : unselectedClasses
      } ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default TagToggle;
