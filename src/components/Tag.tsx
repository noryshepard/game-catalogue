import React from "react";

type CommonProps = {
  label: string;
  selected?: boolean;
  className?: string;
};

type ClickableProps = CommonProps & {
  onClick: () => void;
};

type NonClickableProps = CommonProps & {
  onClick?: never;
};

export type TagProps = ClickableProps | NonClickableProps;

const Tag: React.FC<TagProps> = ({
  label,
  selected = false,
  onClick,
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border transition-colors";

  const selectedClasses = "bg-teal-400 text-black border-teal-500";

  const unselectedClasses = onClick
    ? "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
    : "bg-gray-700 text-gray-200 border-gray-600 dark:bg-gray-800 dark:border-gray-700";

  const classes = `${baseClasses} ${
    selected ? selectedClasses : unselectedClasses
  } ${className}`;

  // 🧠 POLYMORPHIC PART
  if (onClick) {
    return (
      <button
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={classes}
      >
        {label}
      </button>
    );
  }

  return <span className={classes}>{label}</span>;
};

export default Tag;
