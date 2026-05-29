/**
 * Bronze art-deco style flourish for major section boundaries.
 *
 * Geometric line work referencing private-bank stationery and old-world
 * heritage marks. Renders as decorative SVG centered on a horizontal rule.
 */
type Props = {
  className?: string;
  tone?: "bronze" | "ivory";
};

export default function Flourish({ className = "", tone = "bronze" }: Props) {
  const stroke = tone === "ivory" ? "#E9DBC2" : "#8C6A3F";
  const strokeSoft = tone === "ivory" ? "rgba(233, 219, 194, 0.45)" : "rgba(140, 106, 63, 0.45)";

  return (
    <div
      className={`flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        width="220"
        height="22"
        viewBox="0 0 220 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="11" x2="80" y2="11" stroke={strokeSoft} strokeWidth="0.75" />
        <line x1="140" y1="11" x2="220" y2="11" stroke={strokeSoft} strokeWidth="0.75" />
        {/* Center diamond + flanking dots */}
        <circle cx="92" cy="11" r="1.2" fill={stroke} />
        <circle cx="128" cy="11" r="1.2" fill={stroke} />
        <g transform="translate(110 11)">
          <path d="M0 -7 L7 0 L0 7 L-7 0 Z" fill="none" stroke={stroke} strokeWidth="0.9" />
          <path d="M0 -3.2 L3.2 0 L0 3.2 L-3.2 0 Z" fill="none" stroke={stroke} strokeWidth="0.7" />
          <circle cx="0" cy="0" r="0.9" fill={stroke} />
        </g>
      </svg>
    </div>
  );
}
