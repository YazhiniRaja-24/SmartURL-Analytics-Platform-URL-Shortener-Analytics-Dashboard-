function UrlSearch({ searchTerm, setSearchTerm }) {
  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl">
      <h3 className="mb-4 text-xl font-semibold text-white">
        Search URLs
      </h3>

      <input
        type="text"
        placeholder="Search by Original URL or Short URL..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-sky-500"
      />
    </div>
  );
}

export default UrlSearch;