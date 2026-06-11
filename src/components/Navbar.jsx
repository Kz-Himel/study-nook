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
import { HiBookmarkAlt } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pathname = usePathname();

  // ✅ Real session
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
        { href: "/my-listings", label: "My Listings", icon: FiBookOpen },
        { href: "/my-bookings", label: "My Bookings", icon: HiBookmarkAlt },
      ]
    : [];

  //  Logout function
  const handleLogout = async () => {
    await authClient.signOut();

    window.location.href = "/";
  };

  if (isPending) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-primary)]/90 backdrop-blur-xl shadow-sm border-b border-[var(--border-color)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "var(--brand)" }}
            >
              <HiBookmarkAlt size={17} color="white" />
            </div>

            <span className="font-bold text-[var(--text-primary)] text-lg tracking-tight">
              Study<span style={{ color: "var(--brand)" }}>Nook</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[...navLinks, ...privateLinks].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 ${
                  isActive(href)
                    ? "bg-[var(--brand-light)] text-[var(--brand)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>


          {/* Right controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors"
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
                      <div className="w-full h-full flex items-center justify-center text-[var(--brand)]">
                        <FiUser size={14} />
                      </div>
                    )}
                  </div>

                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {user.name?.split(" ")[0]}
                  </span>

                  <FiChevronDown
                    size={14}
                    className={`text-[var(--text-muted)] transition-transform ${
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
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 rounded-2xl p-1.5 z-50"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-color)",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                      }}
                    >
                      {privateLinks.map(({ href, label, icon: Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors font-medium"
                        >
                          <Icon size={15} />
                          {label}
                        </Link>
                      ))}

                      <hr className="my-1 border-[var(--border-color)]" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors font-medium"
                      >
                        <FiLogOut size={15} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login" className="btn-outline text-sm py-2 px-4">
                  Log in
                </Link>

                <Link
                  href="/register"
                  className="btn-primary text-sm py-2 px-4"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-primary)]"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}