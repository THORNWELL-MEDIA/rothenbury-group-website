"use client";

import {
  Building2,
  Briefcase,
  Megaphone,
  Cpu,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type Entry = {
  Icon: LucideIcon;
  name: string;
  note: string;
  micro: string;
};

const SECTORS: Entry[] = [
  {
    Icon: Building2,
    name: "Real Estate",
    note: "Residential leasing & boutique property management",
    micro: "Long-duration income · conservative leverage",
  },
  {
    Icon: Briefcase,
    name: "Property Services",
    note: "Leasing operations, owner relations, asset oversight",
    micro: "Operator-led · recurring revenue",
  },
  {
    Icon: Wrench,
    name: "Maintenance",
    note: "Contracting, trades, and on-site facilities work",
    micro: "Service density across the GTA",
  },
  {
    Icon: Users,
    name: "Staffing",
    note: "Talent placement and workforce services",
    micro: "Cross-border deployment capability",
  },
  {
    Icon: Megaphone,
    name: "Media",
    note: "Marketing & creative services",
    micro: "Internal & external client mandates",
  },
  {
    Icon: Cpu,
    name: "Technology",
    note: "SaaS & platform technology",
    micro: "Held for compounding, not exits",
  },
];

export default function SectorGrid() {
  return (
    <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 border border-line">
      {SECTORS.map(({ Icon, name, note, micro }) => (
        <div
          key={name}
          className="relative bg-bone p-6 lg:p-7 group overflow-hidden transition-colors duration-500 hover:bg-cream/60"
        >
          <div className="flex items-center justify-between">
            <Icon
              className="w-7 h-7 text-bronze-700 transition-colors duration-300 group-hover:text-burgundy"
              strokeWidth={1.25}
            />
            <span className="text-[10px] uppercase tracking-[0.22em] text-ink-mute font-medium">
              Sector
            </span>
          </div>
          <h3 className="mt-5 font-serif text-2xl text-navy relative inline-block">
            {name}
            {/* Bronze underline animation */}
            <span
              className="absolute left-0 -bottom-1 h-px bg-bronze-600 w-0 group-hover:w-full transition-all duration-500 ease-out"
              aria-hidden="true"
            />
          </h3>
          <p className="mt-3 text-sm text-ink-soft leading-relaxed">{note}</p>

          {/* Microcopy reveal */}
          <div className="mt-5 overflow-hidden">
            <p className="text-[11px] uppercase tracking-[0.22em] text-bronze-700 font-medium opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
              <span className="inline-block h-px w-6 bg-bronze-600 mr-3 align-middle" />
              {micro}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
