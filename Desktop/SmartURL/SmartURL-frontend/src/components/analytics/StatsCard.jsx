function StatsCard({
  title,
  value,
  icon: Icon,
  iconBg = "bg-indigo-500/10",
  iconColor = "text-indigo-400",
  hoverBorder = "hover:border-indigo-500/50",
  accentColor = "bg-indigo-500",
  largeValue = false,
  badge = null,
}) {
  const displayValue =
    value === null || value === undefined ? "—" : value;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/40 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-950/20 sm:p-6 ${hoverBorder}`}
    >
      <div className="mb-4 flex items-start justify-between gap-2">
        {Icon ? (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-white/5 to-transparent transition-transform duration-300 group-hover:scale-110 ${iconBg} ${iconColor}`}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </div>
        ) : (
          <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-800/80" />
        )}

        {badge ? (
          <span className="text-right text-[10px] font-medium uppercase tracking-widest text-slate-500">
            {badge}
          </span>
        ) : null}
      </div>

      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-500">
        {title}
      </p>

      <h3
        className={`font-bold text-white ${
          largeValue
            ? "text-2xl leading-tight sm:text-3xl"
            : "font-mono text-3xl leading-none sm:text-4xl"
        }`}
      >
        {displayValue}
      </h3>

      <div
        className={`absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full ${accentColor}`}
        aria-hidden
      />
    </div>
  );
}

export default StatsCard;
