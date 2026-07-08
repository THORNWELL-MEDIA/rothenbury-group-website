import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  variant?: "navy" | "bone";
  monogramOnly?: boolean;
};

export default function Logo({ className, variant = "navy", monogramOnly = false }: Props) {
  const ink = variant === "navy" ? "text-navy" : "text-bone";

  return (
    <Link
      href="/"
      aria-label="Rothenbury Group - Home"
      className={cn("inline-flex items-center gap-3 no-underline group", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative grid place-items-center w-9 h-9 border",
          variant === "navy" ? "border-navy/70" : "border-bone/70",
        )}
      >
        <span className={cn("font-serif text-lg leading-none -mt-0.5", ink)}>R</span>
        <span
          className={cn(
            "absolute -top-1 -right-1 w-1.5 h-1.5",
            variant === "navy" ? "bg-gold" : "bg-gold-300",
          )}
        />
      </span>
      {!monogramOnly && (
        <span className="leading-none">
          <span className={cn("block font-serif text-[18px] tracking-tight", ink)}>
            Rothenbury <span className={ink}>Group</span>
          </span>
          <span
            className={cn(
              "mt-1 block text-[9px] uppercase tracking-[0.28em]",
              variant === "navy" ? "text-ink-soft" : "text-ivory/80",
            )}
          >
            Holding Company
          </span>
        </span>
      )}
    </Link>
  );
}
