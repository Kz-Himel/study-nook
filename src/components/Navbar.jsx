"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiLogOut,
  FiUser,
  FiBookOpen,
  FiPlusSquare,
} from "react-icons/fi";
import { MdOutlineLocalLibrary } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const isActive = (href) => pathname === href;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
  ];

  const privateLinks = user
    ? [
        { href: "/add-room", label: "Add Room", icon: FiPlusSquare },
        { href: "/my-bookings", label: "My Bookings", icon: MdOutlineLocalLibrary },
        { href: "/my-listings", label: "My Listings", icon: FiBookOpen },
      ]
    : [];

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  if (isPending) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-primary)]/90 backdrop-blur-xl shadow-sm border-b border-[var(--border-color)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "var(--brand)" }}
            >
              <MdOutlineLocalLibrary size={17} color="white" />
            </div>

            <span className="font-bold text-lg tracking-tight text-[var(--text-primary)]">
              Study<span style={{ color: "var(--brand)" }}>Nook</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[...navLinks, ...privateLinks].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors ${
                  isActive(href)
                    ? "bg-[var(--brand-light)] text-[var(--brand)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">

            <ThemeToggle />

            {/* USER */}
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[var(--bg-secondary)]"
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-[var(--brand-light)]">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={28}
                        height={28}
                        className="object-cover"
                      />
                    ) : (
                      <FiUser size={14} className="m-auto mt-1" />
                    )}
                  </div>

                  <span className="text-sm font-semibold">
                    {user.name?.split(" ")[0]}
                  </span>

                  <FiChevronDown
                    size={14}
                    className={`transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      className="absolute right-0 top-full mt-2 w-48 rounded-2xl p-1.5 bg-[var(--bg-card)] border border-[var(--border-color)]"
                    >
                      {privateLinks.map(({ href, label, icon: Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-[var(--bg-secondary)]"
                        >
                          <Icon size={15} />
                          {label}
                        </Link>
                      ))}

                      <hr className="my-1 border-[var(--border-color)]" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl"
                      >
                        <FiLogOut size={15} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Link href="/login" className="btn-outline text-sm px-4 py-2">
                  Log in
                </Link>
                <Link href="/register" className="btn-primary text-sm px-4 py-2">
                  Register
                </Link>
              </div>
            )}

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[var(--bg-secondary)]"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-16 left-0 w-full bg-[var(--bg-primary)] border-t border-[var(--border-color)] shadow-lg"
          >
            <div className="flex flex-col p-4 gap-2">
              {[...navLinks, ...privateLinks].map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-[var(--bg-secondary)]"
                >
                  {Icon && <Icon size={16} />}
                  {label}
                </Link>
              ))}

              {!user && (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 rounded-xl text-sm hover:bg-[var(--bg-secondary)]"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 rounded-xl text-sm bg-[var(--brand)] text-white"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}