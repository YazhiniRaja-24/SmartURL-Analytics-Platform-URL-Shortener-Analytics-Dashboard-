import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdSearch,
  MdNotifications,
  MdKeyboardArrowDown,
  MdSettings,
  MdLogout,
  MdPerson,
} from "react-icons/md";

const Navbar = ({ pageTitle = "Dashboard" }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: "New link click spike detected", time: "2m ago", unread: true },
    { id: 2, text: "Monthly analytics report ready", time: "1h ago", unread: true },
    { id: 3, text: "Campaign 'Summer25' hit 10k clicks", time: "3h ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6"
      style={{ height: "70px" }}
    >
      {/* Glassmorphism background layer */}
      <div className="pointer-events-none absolute inset-0 border-b border-white/5 bg-slate-950/60 backdrop-blur-2xl" />

      {/* ── Left: Page title ── */}
      <div className="relative flex flex-col">
        <motion.h1
          key={pageTitle}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="text-lg font-semibold tracking-tight text-white"
        >
          {pageTitle}
        </motion.h1>
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
          SmartURL Analytics
        </span>
      </div>

      {/* ── Right: Actions ── */}
      <div className="relative flex items-center gap-2">

        {/* Search */}
        <div className="flex items-center">
          <AnimatePresence>
            {searchOpen && (
              <motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                autoFocus
                onBlur={() => setSearchOpen(false)}
                placeholder="Search..."
                className="mr-2 h-9 rounded-xl border border-slate-700/70 bg-slate-900/80 px-3 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/40"
              />
            )}
          </AnimatePresence>
          <NavIconBtn
            icon={<MdSearch />}
            label="Search"
            onClick={() => setSearchOpen((p) => !p)}
            active={searchOpen}
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <NavIconBtn
            icon={<MdNotifications />}
            label="Notifications"
            onClick={() => {
              setNotifOpen((p) => !p);
              setDropdownOpen(false);
            }}
            active={notifOpen}
            badge={unreadCount}
          />
          <AnimatePresence>
            {notifOpen && (
              <Dropdown onClose={() => setNotifOpen(false)} alignRight width="w-80">
                <div className="px-4 pt-3 pb-2 border-b border-white/5">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Notifications
                  </span>
                </div>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer ${
                      n.unread ? "bg-sky-500/5" : ""
                    }`}
                  >
                    {n.unread && (
                      <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-sky-400" />
                    )}
                    {!n.unread && <span className="mt-1.5 h-2 w-2 flex-shrink-0" />}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-slate-200">{n.text}</span>
                      <span className="text-[11px] text-slate-500">{n.time}</span>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-2 border-t border-white/5 text-center">
                  <button className="text-xs font-medium text-sky-400 hover:text-sky-300 transition-colors">
                    View all notifications
                  </button>
                </div>
              </Dropdown>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-slate-700/60" />

        {/* User avatar + dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setDropdownOpen((p) => !p);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2.5 rounded-2xl border border-slate-700/50 bg-slate-900/70 px-3 py-1.5 transition-all hover:border-sky-500/40 hover:bg-slate-800/80"
          >
            {/* Avatar */}
            <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-xl">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 via-indigo-500 to-sky-400" />
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                JD
              </span>
            </div>
            <div className="hidden flex-col text-left sm:flex">
              <span className="text-[13px] font-semibold leading-tight text-slate-100">
                John Doe
              </span>
              <span className="text-[10px] font-medium text-slate-400">
                Admin
              </span>
            </div>
            <motion.span
              animate={{ rotate: dropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.22 }}
              className="text-slate-400"
            >
              <MdKeyboardArrowDown size={18} />
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {dropdownOpen && (
              <Dropdown onClose={() => setDropdownOpen(false)} alignRight width="w-52">
                {/* User info header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                  <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-indigo-500 to-sky-400" />
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                      JD
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">John Doe</span>
                    <span className="text-[11px] text-slate-400">john@smarturl.io</span>
                  </div>
                </div>
                {/* Menu items */}
                <DropdownItem icon={<MdPerson />} label="Profile" />
                <DropdownItem icon={<MdSettings />} label="Settings" />
                <div className="my-1 mx-3 h-px bg-white/5" />
                <DropdownItem
                  icon={<MdLogout />}
                  label="Sign out"
                  danger
                />
              </Dropdown>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

/* ─── Sub-components ─── */

const NavIconBtn = ({ icon, label, onClick, active = false, badge }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.93 }}
    onClick={onClick}
    aria-label={label}
    className={[
      "relative flex h-9 w-9 items-center justify-center rounded-xl border text-lg transition-all",
      active
        ? "border-sky-500/50 bg-sky-500/15 text-sky-300"
        : "border-slate-700/50 bg-slate-900/70 text-slate-300 hover:border-sky-500/40 hover:bg-slate-800/80 hover:text-sky-200",
    ].join(" ")}
  >
    {icon}
    {badge > 0 && (
      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-[9px] font-bold text-white shadow-[0_0_8px_rgba(56,189,248,0.6)]">
        {badge}
      </span>
    )}
  </motion.button>
);

const Dropdown = ({ children, onClose, alignRight = false, width = "w-56" }) => (
  <>
    <div className="fixed inset-0 z-10" onClick={onClose} />
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className={[
        "absolute top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-white/10",
        "bg-slate-900/90 shadow-[0_12px_48px_rgba(0,0,0,0.7)] backdrop-blur-2xl",
        width,
        alignRight ? "right-0" : "left-0",
      ].join(" ")}
    >
      {children}
    </motion.div>
  </>
);

const DropdownItem = ({ icon, label, danger = false }) => (
  <motion.button
    whileHover={{ x: 3 }}
    className={[
      "flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5",
      danger ? "text-rose-400 hover:text-rose-300" : "text-slate-300 hover:text-white",
    ].join(" ")}
  >
    <span className="text-base">{icon}</span>
    {label}
  </motion.button>
);

export default Navbar;