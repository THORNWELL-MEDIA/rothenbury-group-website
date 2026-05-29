"use client";

import { useState } from "react";
import { MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import CareersApplyModal from "@/components/CareersApplyModal";

const JOBS = [
  {
    title: "Chief of Staff to CEO",
    location: "Toronto, ON",
    type: "Full-time",
    summary:
      "You will work directly with the CEO on corporate strategy, operating company oversight, and priority initiatives across the Rothenbury portfolio. This is not a traditional chief of staff role. You will run strategic workstreams, own cross-portfolio projects, manage the CEO's time and priorities, and be in the room for high-stakes decisions. The right person has sharp analytical instincts, excellent written communication, and the operational discipline to execute without hand-holding.",
    requirements: [
      "5 or more years of experience in strategy, investment banking, consulting, or a high-growth operating role",
      "Demonstrated ability to manage complex, multi-stakeholder projects with minimal supervision",
      "Excellent writing skills: you produce board-level memos, not status updates",
      "Comfort with ambiguity and the ability to switch between strategic and tactical work in the same day",
    ],
    compensation: "$130,000 to $175,000 base plus bonus and equity consideration",
  },
  {
    title: "Corporate Development Associate",
    location: "Toronto, ON",
    type: "Full-time",
    summary:
      "You will support M&A, partnership, and investment activity across the Rothenbury portfolio. That means market screening, deal sourcing, financial modeling, due diligence coordination, and preparation of investment memos for principal review. You work closely with the Chief of Staff and will present your own analysis to senior leadership.",
    requirements: [
      "2 to 4 years in investment banking, private equity, or corporate development",
      "Strong financial modeling skills: you build LBO and DCF models from scratch",
      "CFA progress or completion is an asset",
      "Intellectual curiosity across industries: property, technology, staffing, and professional services are all in scope",
    ],
    compensation: "$95,000 to $130,000 base plus discretionary bonus",
  },
  {
    title: "Portfolio Operations Manager",
    location: "Toronto, ON",
    type: "Full-time",
    summary:
      "You will own operating performance reporting, process improvement, and cross-portfolio operational initiatives for Rothenbury. That means working with operating company leaders to understand their priorities, identifying where shared infrastructure or process can accelerate growth, and building the dashboards and systems the holding company needs to manage a growing portfolio effectively.",
    requirements: [
      "5 or more years in operations, management consulting, or a COO-level function in a multi-unit business",
      "Track record of improving operational performance across distributed teams",
      "Strong data skills: SQL or advanced spreadsheet modeling plus ability to build executive dashboards",
      "Experience working in or with a portfolio company structure is a meaningful advantage",
    ],
    compensation: "$105,000 to $140,000 base plus bonus",
  },
  {
    title: "Executive Assistant to CEO",
    location: "Toronto, ON",
    type: "Full-time",
    summary:
      "You will manage the CEO's schedule, communications, and executive logistics. This is a high-trust role that requires strong judgment, the ability to anticipate needs, and the discretion to handle confidential matters. You will interact with investors, operating company leaders, and external stakeholders on behalf of the principal. The right person is proactive, precise, and takes this work seriously as a professional function.",
    requirements: [
      "3 or more years of executive assistant or chief of staff experience, supporting a C-suite principal",
      "Exceptional written communication: you draft correspondence on the CEO's behalf",
      "Strong calendar and travel management skills in a fast-moving environment",
      "Discretion, reliability, and sound judgment under pressure",
    ],
    compensation: "$70,000 to $95,000 base",
  },
];

export default function JobBoard() {
  const [activeRole, setActiveRole] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-600 mb-2">Open positions</p>
          <h2 className="font-serif text-3xl text-navy text-balance">
            Four roles at the holding company level.
          </h2>
          <p className="mt-3 text-base text-ink max-w-xl">
            These are Rothenbury Group corporate roles, not operating company positions.
          </p>
        </div>

        <div className="space-y-4">
          {JOBS.map((job) => (
            <div
              key={job.title}
              className="border border-ink/10 bg-white p-6 md:p-8 hover:border-gold-500/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-navy">{job.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-ink/60 uppercase tracking-[0.14em]">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" />
                      {job.type}
                    </span>
                    <span className="text-gold-600 font-bold">{job.compensation}</span>
                  </div>
                  <p className="mt-4 text-sm text-ink leading-relaxed max-w-2xl">{job.summary}</p>
                  <ul className="mt-4 space-y-1.5">
                    {job.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2 text-xs text-ink">
                        <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-gold-500 flex-none" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sm:ml-6 flex-none">
                  <button
                    onClick={() => setActiveRole(job.title)}
                    className="btn-primary whitespace-nowrap inline-flex items-center gap-2"
                  >
                    Apply
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeRole && (
        <CareersApplyModal
          role={activeRole}
          onClose={() => setActiveRole(null)}
        />
      )}
    </section>
  );
}
