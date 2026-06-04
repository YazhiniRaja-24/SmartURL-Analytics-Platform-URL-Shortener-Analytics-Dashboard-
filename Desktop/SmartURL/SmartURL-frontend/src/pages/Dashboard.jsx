import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import OverviewCards from "../components/dashboard/OverviewCards";
import RecentUrls from "../components/dashboard/RecentUrls";

import UrlForm from "../components/url/UrlForm";

function Dashboard() {
  const [active, setActive] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex min-h-screen bg-[#0b0e14] text-slate-200">
      <Sidebar active={active} onNavigate={setActive} />

      <div className="ml-0 flex flex-1 flex-col md:ml-[260px]">
        <Navbar pageTitle="Dashboard" />

        <main className="flex-1 px-4 py-6 sm:px-8 lg:px-12 lg:py-8">
          <div className="mx-auto max-w-[1440px] space-y-8 lg:space-y-10">
            {/* Welcome Hero */}
            <section className="relative overflow-hidden rounded-3xl border border-slate-700/30 bg-slate-900/60 p-8 backdrop-blur-xl sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-indigo-600/10 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-violet-600/10 blur-[100px]" />

              <div className="relative z-10">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Welcome to SmartURL{" "}
                  <span className="inline-block animate-bounce">🚀</span>
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
                  Manage your shortened URLs and monitor analytics from one
                  place.
                </p>
              </div>
            </section>

            <OverviewCards />

            <UrlForm />

            <RecentUrls
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
