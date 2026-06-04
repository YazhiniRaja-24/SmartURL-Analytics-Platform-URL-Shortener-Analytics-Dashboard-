import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiDownload,
  FiCopy,
  FiLink,
  FiActivity,
  FiGlobe,
  FiMonitor,
} from "react-icons/fi";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import StatsCard from "../components/analytics/StatsCard";
import ClickTrendChart from "../components/analytics/ClickTrendChart";

import {
  getSummary,
  getDailyTrends,
  getTopUrls,
} from "../services/analyticsService";

const TIME_RANGES = ["24H", "7D", "30D"];

function filterTrendsByRange(data, range) {
  if (!data?.length) return [];

  const days = range === "24H" ? 1 : range === "7D" ? 7 : 30;
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() - (days - 1));

  return data.filter((item) => {
    const pointDate = new Date(`${item._id}T00:00:00`);
    return pointDate >= cutoff;
  });
}

function KpiSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-700/50 bg-slate-900/40 p-6 backdrop-blur-xl">
      <div className="mb-4 flex justify-between">
        <div className="h-10 w-10 rounded-lg bg-slate-700/80" />
        <div className="h-3 w-12 rounded bg-slate-700/60" />
      </div>
      <div className="mb-2 h-3 w-24 rounded bg-slate-700/60" />
      <div className="h-8 w-16 rounded bg-slate-700/80" />
    </div>
  );
}

function Analytics() {
  const [summary, setSummary] = useState(null);
  const [dailyTrends, setDailyTrends] = useState([]);
  const [topUrls, setTopUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7D");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const summaryData = await getSummary();
      const trendsData = await getDailyTrends();
      const urlsData = await getTopUrls();

      setSummary(summaryData.summary);
      setDailyTrends(trendsData.data);
      setTopUrls(urlsData.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTrends = useMemo(
    () => filterTrendsByRange(dailyTrends, timeRange),
    [dailyTrends, timeRange]
  );

  const handleExport = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      timeRange,
      summary,
      dailyTrends: filteredTrends,
      topUrls,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `smarturl-analytics-${Date.now()}.json`;
    anchor.click();
    URL.revokeObjectURL(url);

    toast.success("Analytics exported successfully");
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const isUrlExpired = (url) =>
    url.expiryDate && new Date(url.expiryDate) < new Date();

  return (
    <div className="flex min-h-screen bg-[#0b0e14] text-slate-200">
      <Sidebar active="analytics" />

      <div className="ml-0 flex flex-1 flex-col md:ml-[260px]">
        <Navbar pageTitle="Analytics" />

        <main className="flex-1 px-4 py-6 sm:px-8 lg:px-12 lg:py-8">
          <div className="mx-auto max-w-[1440px] space-y-8 lg:space-y-10">
            {/* Page header */}
            <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1 w-8 rounded-full bg-indigo-500" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400">
                    Platform insights
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Analytics Dashboard 📊
                </h1>
                <p className="mt-2 max-w-2xl text-base text-slate-400 sm:text-lg">
                  Visualizing real-time traffic across your SmartURL ecosystem.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex rounded-lg border border-slate-700/80 bg-[#1d2026] p-1">
                  {TIME_RANGES.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => setTimeRange(range)}
                      className={`rounded-md px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                        timeRange === range
                          ? "bg-slate-700 text-white"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleExport}
                  disabled={loading || !summary}
                  className="flex items-center gap-2 rounded-lg border border-slate-700/80 bg-[#1d2026] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiDownload className="h-5 w-5" aria-hidden />
                  Export
                </button>
              </div>
            </header>

            {/* KPI cards */}
            <section className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <KpiSkeleton key={i} />
                ))
              ) : summary ? (
                <>
                  <StatsCard
                    title="Total URLs"
                    value={summary.totalUrls}
                    icon={FiLink}
                    iconBg="bg-indigo-500/10"
                    iconColor="text-indigo-400"
                    hoverBorder="hover:border-indigo-500/50"
                    accentColor="bg-indigo-500"
                  />
                  <StatsCard
                    title="Total Clicks"
                    value={summary.totalClicks}
                    icon={FiActivity}
                    iconBg="bg-violet-500/10"
                    iconColor="text-violet-400"
                    hoverBorder="hover:border-violet-500/50"
                    accentColor="bg-violet-500"
                  />
                  <StatsCard
                    title="Top Browser"
                    value={summary.topBrowser}
                    icon={FiGlobe}
                    iconBg="bg-cyan-500/10"
                    iconColor="text-cyan-400"
                    hoverBorder="hover:border-cyan-500/50"
                    accentColor="bg-cyan-500"
                    largeValue
                  />
                  <StatsCard
                    title="Top Device"
                    value={summary.topDevice}
                    icon={FiMonitor}
                    iconBg="bg-slate-500/10"
                    iconColor="text-slate-300"
                    hoverBorder="hover:border-slate-400/50"
                    accentColor="bg-slate-400"
                    largeValue
                  />
                </>
              ) : null}
            </section>

            {/* Daily trends */}
            <section>
              {loading ? (
                <div className="animate-pulse rounded-xl border border-slate-700/50 bg-slate-900/40 p-8 backdrop-blur-xl">
                  <div className="mb-6 h-6 w-48 rounded bg-slate-700/80" />
                  <div className="h-[320px] rounded-lg bg-slate-800/50 sm:h-[400px]" />
                </div>
              ) : (
                <ClickTrendChart data={filteredTrends} timeRange={timeRange} />
              )}
            </section>

            {/* Top URLs */}
            <section className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/40 backdrop-blur-xl">
              <div className="flex flex-col gap-4 border-b border-slate-700/50 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Top Performing URLs
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Deep-link destination performance analysis
                  </p>
                </div>
                <Link
                  to="/dashboard"
                  className="text-[11px] font-bold uppercase tracking-widest text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
                >
                  View all records
                </Link>
              </div>

              {loading ? (
                <div className="space-y-3 p-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-16 animate-pulse rounded-lg bg-slate-800/50"
                    />
                  ))}
                </div>
              ) : topUrls.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse text-left">
                    <thead>
                      <tr className="bg-[#272a31]">
                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                          Short URL
                        </th>
                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                          Destination
                        </th>
                        <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                          Status
                        </th>
                        <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-widest text-slate-500">
                          Click count
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/30">
                      {topUrls.map((url) => {
                        const expired = isUrlExpired(url);

                        return (
                          <tr
                            key={url._id}
                            className="transition-colors hover:bg-slate-800/40"
                          >
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCopy(url.shortUrl)
                                  }
                                  className="text-indigo-400 transition-colors hover:text-white"
                                  aria-label="Copy short URL"
                                >
                                  <FiCopy className="h-4 w-4" />
                                </button>
                                <span
                                  className="truncate font-mono text-sm text-indigo-400"
                                  title={url.shortUrl}
                                >
                                  {url.shortUrl}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <p
                                className="max-w-[300px] truncate text-sm text-slate-300"
                                title={url.originalUrl}
                              >
                                {url.originalUrl}
                              </p>
                            </td>
                            <td className="px-6 py-5">
                              {expired ? (
                                <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-400">
                                  Expired
                                </span>
                              ) : (
                                <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                                  Active
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-5 text-right font-mono text-sm font-bold text-white">
                              {url.clicks ?? 0}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
                    <FiLink className="h-7 w-7" aria-hidden />
                  </div>
                  <h4 className="text-lg font-semibold text-white">
                    No URL performance data yet
                  </h4>
                  <p className="mt-2 max-w-md text-sm text-slate-500">
                    Create and share short links from your dashboard to see top
                    performers here.
                  </p>
                  <Link
                    to="/dashboard"
                    className="mt-6 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Analytics;
