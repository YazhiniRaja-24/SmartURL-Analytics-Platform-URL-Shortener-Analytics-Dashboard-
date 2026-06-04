import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  MdDashboard,
  MdAnalytics,
  MdPerson,
} from "react-icons/md";

const MENU_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: MdDashboard,
    path: "/dashboard",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: MdAnalytics,
    path: "/analytics",
  },
  {
    id: "profile",
    label: "Profile",
    icon: MdPerson,
    path: "/profile",
  },
];

function Sidebar({
  active = "dashboard",
}) {
  return (
    <motion.aside
      initial={{
        x: -40,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 18,
      }}
      className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-slate-800/60 bg-slate-950/80 text-slate-100 shadow-2xl backdrop-blur-xl"
    >
      {/* Logo */}
      <div className="border-b border-white/5 bg-gradient-to-r from-violet-700 via-indigo-600 to-sky-500 px-6 pb-5 pt-6">
        <h1 className="text-2xl font-bold text-white">
          SmartURL 🚀
        </h1>

        <p className="text-xs text-sky-100">
          Analytics Platform
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;

            const isActive =
              active === item.id;

            return (
              <Link
                key={item.id}
                to={item.path}
              >
                <motion.div
                  whileHover={{
                    x: 4,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600 to-sky-500 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Icon size={22} />

                  <span>
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4 text-center text-xs text-slate-500">
        SmartURL © 2026
      </div>
    </motion.aside>
  );
}

export default Sidebar;