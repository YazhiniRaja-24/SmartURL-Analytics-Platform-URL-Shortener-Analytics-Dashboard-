import { FiSearch, FiLink } from "react-icons/fi";

import UrlTable from "../url/UrlTable";
import { useUrls } from "../../context/UrlContext";

function RecentUrls({ searchTerm = "", setSearchTerm = () => {} }) {
  const { urls } = useUrls();

  const filteredUrls = urls.filter(
    (url) =>
      url.originalUrl
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasUrls = urls.length > 0;
  const hasResults = filteredUrls.length > 0;

  return (
    <section className="space-y-6">
      <div className="flex flex-col items-stretch justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-semibold text-white sm:text-2xl">
            Recent URLs
          </h3>
          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-violet-400">
            {filteredUrls.length}{" "}
            {filteredUrls.length === 1 ? "URL" : "URLs"}
          </span>
        </div>

        <div className="relative w-full md:w-96">
          <FiSearch
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            aria-hidden
          />
          <input
            type="text"
            placeholder="Search by Original URL or Short URL..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-700/80 bg-[#1d2026] py-3 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            aria-label="Search URLs"
          />
        </div>
      </div>

      {hasResults ? (
        <div className="overflow-hidden rounded-3xl border border-slate-700/80 bg-[#1d2026]">
          <UrlTable urls={filteredUrls} />

          <div className="flex flex-col gap-3 border-t border-slate-700/50 bg-[#272a31] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-white">
                {filteredUrls.length}
              </span>{" "}
              {filteredUrls.length === 1 ? "URL" : "URLs"}
              {searchTerm.trim() && hasUrls ? (
                <span className="text-slate-600">
                  {" "}
                  matching &ldquo;{searchTerm.trim()}&rdquo;
                </span>
              ) : null}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700/80 bg-[#1d2026]/50 px-6 py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400">
            <FiLink className="h-8 w-8" aria-hidden />
          </div>

          <h3 className="text-xl font-semibold text-white">
            {hasUrls ? "No URLs match your search" : "No URLs Found"}
          </h3>

          <p className="mt-2 max-w-md text-slate-400">
            {hasUrls
              ? "Try a different keyword or clear the search field."
              : "Create your first SmartURL above to start tracking analytics."}
          </p>

          {hasUrls && searchTerm.trim() ? (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="mt-6 rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-indigo-500/50 hover:bg-slate-800"
            >
              Clear search
            </button>
          ) : null}
        </div>
      )}
    </section>
  );
}

export default RecentUrls;
