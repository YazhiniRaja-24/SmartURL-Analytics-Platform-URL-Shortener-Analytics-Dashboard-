import { useEffect, useState } from "react";
import {
  FiActivity,
  FiLink,
  FiGlobe,
  FiMonitor,
  FiTrendingUp,
  FiMinus,
} from "react-icons/fi";

import { getSummary } from "../../services/analyticsService";

const CARDS = [
  {
    key: "totalClicks",
    label: "Total Clicks",
    icon: FiActivity,
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
    hoverBorder: "hover:border-indigo-500/50",
    valueClass: "font-mono text-4xl font-bold leading-none",
    badge: (summary) =>
      summary.totalClicks > 0 ? (
        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-cyan-400">
          Active
          <FiTrendingUp className="h-3.5 w-3.5" />
        </span>
      ) : (
        <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          No clicks
          <FiMinus className="h-3.5 w-3.5" />
        </span>
      ),
  },
  {
    key: "totalUrls",
    label: "Total URLs",
    icon: FiLink,
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    hoverBorder: "hover:border-violet-500/50",
    valueClass: "font-mono text-4xl font-bold leading-none",
    badge: (summary) => (
      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
        {summary.totalUrls === 1 ? "1 link" : `${summary.totalUrls} links`}
      </span>
    ),
  },
  {
    key: "topBrowser",
    label: "Top Browser",
    icon: FiGlobe,
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    hoverBorder: "hover:border-cyan-500/50",
    valueClass: "text-2xl font-bold leading-tight sm:text-3xl",
    badge: () => (
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
        Top pick
      </span>
    ),
  },
  {
    key: "topDevice",
    label: "Top Device",
    icon: FiMonitor,
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-300",
    hoverBorder: "hover:border-sky-400/50",
    valueClass: "text-2xl font-bold leading-tight sm:text-3xl",
    badge: () => (
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
        Most active
      </span>
    ),
  },
];

function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-700/80 bg-[#1d2026] p-5 sm:p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="h-10 w-10 rounded-lg bg-slate-700/80" />
        <div className="h-3 w-16 rounded bg-slate-700/80" />
      </div>
      <div className="mb-2 h-3 w-24 rounded bg-slate-700/60" />
      <div className="h-9 w-20 rounded bg-slate-700/80" />
    </div>
  );
}

function OverviewCards() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getSummary();
        setSummary(data.summary);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSummary();
  }, []);

  if (!summary) {
    return (
      <section className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
      {CARDS.map((card) => {
        const Icon = card.icon;
        const value = summary[card.key];

        return (
          <div
            key={card.key}
            className={`group rounded-2xl border border-slate-700/80 bg-[#1d2026] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#23262e] hover:shadow-lg hover:shadow-indigo-950/20 sm:p-6 ${card.hoverBorder}`}
          >
            <div className="mb-4 flex items-start justify-between gap-2">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-white/5 to-transparent ${card.iconBg} ${card.iconColor} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              {card.badge(summary)}
            </div>

            <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-500">
              {card.label}
            </p>

            <p className={`text-white ${card.valueClass}`}>{value}</p>
          </div>
        );
      })}
    </section>
  );
}

export default OverviewCards;
