import { cn } from "@/lib/utils"

export function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition",
        variant === "secondary" &&
          "bg-indigo-100 text-indigo-700",
        variant === "default" &&
          "bg-gray-100 text-gray-700",
        className
      )}
      {...props}
    />
  )
}
