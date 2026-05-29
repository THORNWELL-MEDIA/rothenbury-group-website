/**
 * Numbered section mark — Rothenbury.
 *
 * Renders "§ 01 · LABEL" with the section glyph + number in burgundy/bronze
 * italic, the label in tracked small caps, and a thin burgundy rule above.
 *
 * Replaces the prior "Chapter 01" treatment for a thesis / shareholder letter
 * register that distinguishes Rothenbury from sibling holding brands.
 */
type Tone = "burgundy" | "ivory";

type Props = {
  /** 1-based number (1, 2, 3 ...) — rendered as "01", "02" ... */
  num: number;
  label: string;
  tone?: Tone;
  className?: string;
};

export default function SectionMark({
  num,
  label,
  tone = "burgundy",
  className = "",
}: Props) {
  const padded = String(num).padStart(2, "0");
  const isInverse = tone === "ivory";
  const ruleClass = isInverse ? "bg-bronze-200/60" : "bg-burgundy/60";
  const glyphClass = isInverse ? "text-bronze-200" : "text-burgundy";
  const labelClass = isInverse ? "text-bronze-200" : "text-burgundy";

  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      <span className={`h-px w-12 ${ruleClass} translate-y-[-2px]`} aria-hidden="true" />
      <span
        className={`font-serif italic text-[18px] leading-none ${glyphClass}`}
        aria-hidden="true"
      >
        §&nbsp;{padded}
      </span>
      <span
        className={`text-[10.5px] uppercase tracking-[0.32em] font-medium ${labelClass}`}
      >
        {label}
      </span>
    </div>
  );
}
