import { useState } from "react";
import toast from "react-hot-toast";
import { FiLink, FiPlusCircle, FiZap } from "react-icons/fi";
import { MdLinkOff } from "react-icons/md";

import { createUrl } from "../../services/urlService";
import { useUrls } from "../../context/UrlContext";

const inputClass =
  "w-full rounded-xl border border-slate-700/80 bg-[#1d2026] py-4 text-base text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500";

const labelClass =
  "ml-1 text-[11px] font-bold uppercase tracking-widest text-slate-500";

function UrlForm() {
  const { addUrl, fetchUrls } = useUrls();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    originalUrl: "",
    customAlias: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await createUrl(formData);

      addUrl(response.data);

      await fetchUrls();

      toast.success("Short URL Created 🚀");

      setFormData({
        originalUrl: "",
        customAlias: "",
        expiryDate: "",
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create URL"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-700/80 bg-[#272a31] p-6 shadow-2xl shadow-black/20 sm:p-8">
      <MdLinkOff
        className="pointer-events-none absolute right-6 top-6 rotate-12 text-6xl text-slate-600/20 sm:right-8 sm:top-8 sm:text-7xl"
        aria-hidden
      />

      <h3 className="relative z-10 mb-6 flex items-center gap-2 text-xl font-semibold text-white sm:mb-8 sm:text-2xl">
        <FiPlusCircle className="h-6 w-6 text-indigo-400" aria-hidden />
        Create Short URL
      </h3>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 max-w-5xl space-y-6"
      >
        <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-end">
          <div className="w-full flex-grow space-y-2">
            <label htmlFor="originalUrl" className={labelClass}>
              Original Destination URL
            </label>
            <div className="group relative">
              <FiLink
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-400"
                aria-hidden
              />
              <input
                id="originalUrl"
                type="url"
                name="originalUrl"
                placeholder="https://example.com/your-long-url"
                value={formData.originalUrl}
                onChange={handleChange}
                required
                className={`${inputClass} pl-12 pr-4`}
              />
            </div>
          </div>

          <div className="w-full space-y-2 lg:w-48 lg:shrink-0">
            <label htmlFor="customAlias" className={labelClass}>
              Custom Alias
            </label>
            <input
              id="customAlias"
              type="text"
              name="customAlias"
              placeholder="q3-report"
              value={formData.customAlias}
              onChange={handleChange}
              className={`${inputClass} px-4`}
            />
          </div>

          <div className="w-full space-y-2 lg:w-56 lg:shrink-0">
            <label htmlFor="expiryDate" className={labelClass}>
              Expiry Date
            </label>
            <input
              id="expiryDate"
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className={`${inputClass} px-4 text-slate-300 [color-scheme:dark]`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex h-[52px] w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_100%] px-8 text-sm font-bold text-white shadow-lg shadow-indigo-900/40 transition-all duration-500 hover:bg-right active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 lg:h-[60px] lg:w-auto"
          >
            <FiZap className="h-5 w-5" aria-hidden />
            {loading ? "Creating..." : "Create Short URL"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default UrlForm;
