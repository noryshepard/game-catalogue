import React from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "custom";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled,
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg border font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes: Record<ButtonSize, string> = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-teal-500 text-white border-transparent hover:bg-teal-600",
    secondary:
      "bg-gray-200 text-black border-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600",
    danger: "bg-red-500 text-white border-transparent hover:bg-red-600",
    ghost:
      "bg-transparent text-gray-600 border-transparent hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700",
    custom: "",
  };

  return (
    <button
      {...props}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    />
  );
};

export default Button;
