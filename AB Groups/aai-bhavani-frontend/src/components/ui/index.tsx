import React from "react";
import { cn } from "@/lib/utils";

// ─── Card ─────────────────────────────────────────────────────────────────────
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({ hover = false, padding = "md", className, children, ...props }: CardProps) {
  const paddings = { none: "", sm: "p-4", md: "p-6", lg: "p-8" };
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-gray-100 shadow-card",
        hover && "hover:shadow-card-hover transition-shadow duration-300",
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "navy" | "green" | "red" | "gray";
}

export function Badge({ variant = "gold", className, children, ...props }: BadgeProps) {
  const variants = {
    gold: "bg-gold-400/15 text-gold-600",
    navy: "bg-navy-900/10 text-navy-900",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-gray-100 text-gray-600",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  suffix?: React.ReactNode;
}

export function Input({
  label,
  error,
  hint,
  icon,
  suffix,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            "w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400",
            "focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all duration-200",
            "disabled:bg-gray-50 disabled:cursor-not-allowed text-base",
            error ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : "border-gray-200",
            icon && "pl-11",
            suffix && "pr-11",
            className
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            {suffix}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {hint && !error && <p className="mt-1 text-sm text-gray-400">{hint}</p>}
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        rows={4}
        className={cn(
          "w-full px-4 py-3 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 resize-none",
          "focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all duration-200 text-base",
          error ? "border-red-400" : "border-gray-200",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
  placeholder?: string;
}

export function Select({ label, error, options, placeholder, className, id, ...props }: SelectProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {props.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        id={inputId}
        className={cn(
          "w-full px-4 py-3 rounded-xl border bg-white text-gray-900 outline-none transition-all duration-200 text-base appearance-none cursor-pointer",
          "focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20",
          error ? "border-red-400" : "border-gray-200",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

// ─── Section Title ────────────────────────────────────────────────────────────
interface SectionTitleProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  badge,
  title,
  highlight,
  subtitle,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-12", align === "center" && "text-center", className)}>
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gold-400/15 text-gold-600 rounded-full text-sm font-semibold mb-4">
          <span className="w-1.5 h-1.5 bg-gold-400 rounded-full inline-block" />
          {badge}
        </span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy-900 leading-tight">
        {title}{" "}
        {highlight && <span className="text-gradient-gold">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ value, label, icon, className }: StatCardProps) {
  return (
    <div className={cn("text-center p-6", className)}>
      {icon && (
        <div className="w-12 h-12 bg-gold-400/15 rounded-xl flex items-center justify-center mx-auto mb-3 text-gold-500">
          {icon}
        </div>
      )}
      <div className="text-3xl md:text-4xl font-bold font-heading text-navy-900 mb-1">
        {value}
      </div>
      <div className="text-sm text-gray-500 font-medium">{label}</div>
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-px flex-1 bg-gray-200" />
      <div className="w-2 h-2 bg-gold-400 rotate-45 flex-shrink-0" />
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
interface AvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-base" };
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} className={cn("rounded-full object-cover", sizes[size], className)} />;
  }

  return (
    <div
      className={cn(
        "rounded-full bg-navy-900 text-white font-semibold flex items-center justify-center flex-shrink-0",
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
}

// ─── Loading Spinner ──────────────────────────────────────────────────────────
export function Spinner({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizes = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={cn("animate-spin rounded-full border-2 border-gold-400 border-t-transparent", sizes[size], className)} />
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-16 px-4">
      {icon && (
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-400">
          {icon}
        </div>
      )}
      <h3 className="font-heading text-lg font-semibold text-navy-900 mb-2">{title}</h3>
      {description && <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">{description}</p>}
      {action && action}
    </div>
  );
}
