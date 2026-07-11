import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "navy" | "outline" | "white" | "whatsapp" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  href?: string;
}

const variants = {
  primary: "bg-gold-400 text-navy-900 hover:bg-gold-500 shadow-gold",
  navy: "bg-navy-900 text-white hover:bg-navy-800",
  outline: "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
  white: "bg-white text-navy-900 hover:bg-gray-50 shadow-card border border-gray-100",
  whatsapp: "bg-green-500 text-white hover:bg-green-600",
  ghost: "text-navy-900 hover:bg-navy-900/5",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-6 py-3 text-base rounded-xl gap-2",
  lg: "px-8 py-4 text-lg rounded-xl gap-2",
  xl: "px-10 py-5 text-xl rounded-2xl gap-3",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={size === "sm" ? 14 : 18} />
      ) : (
        icon && iconPosition === "left" && icon
      )}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </button>
  );
}
