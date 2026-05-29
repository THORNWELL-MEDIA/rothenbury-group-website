/**
 * Editorial pull-quote treatment — Rothenbury.
 *
 * Annual-letter / thesis pacing. Heavy whitespace. Burgundy left rule line
 * supports the quote (no oversized opening glyph competing with copy). Italic
 * Cormorant body tracks tight.
 */
type Props = {
  children: React.ReactNode;
  attribution?: string;
  inverse?: boolean;
  className?: string;
};

export default function PullQuote({
  children,
  attribution,
  inverse = false,
  className = "",
}: Props) {
  const quoteTone = inverse ? "text-ivory" : "text-burgundy";
  const meta = inverse ? "text-ivory/70" : "text-charcoal-500";
  const ruleColor = inverse ? "border-bronze-200/70" : "border-burgundy/70";
  const bar = inverse ? "bg-bronze-200/70" : "bg-burgundy/70";

  return (
    <figure className={`my-16 lg:my-24 max-w-3xl mx-auto ${className}`}>
      <blockquote
        className={`font-serif italic ${quoteTone} text-2xl sm:text-3xl lg:text-[40px] leading-[1.22] tracking-[-0.012em] text-balance border-l-2 ${ruleColor} pl-6 sm:pl-8`}
      >
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="mt-8 flex items-center gap-4 pl-6 sm:pl-8">
          <span className={`h-px w-10 ${bar}`} />
          <span
            className={`text-[11px] uppercase tracking-[0.28em] ${meta} font-medium`}
          >
            {attribution}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
