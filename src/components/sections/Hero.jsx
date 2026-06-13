"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight, FiStar, FiZap } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";

const stats = [
  { icon: HiOutlineHome, value: "120+", label: "Rooms" },
  { icon: FiStar, value: "4.9/5", label: "User Rating" },
  { icon: FiZap, value: "Instant", label: "Booking" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden dot-pattern">
      {/* Background decorative blobs */}
      <div
        className="absolute top-1/4 left-[-10%] w-80 h-80 blob opacity-20 pointer-events-none"
        style={{ background: "var(--brand)" }}
      />
      <div
        className="absolute bottom-1/4 right-[-5%] w-64 h-64 blob opacity-10 pointer-events-none"
        style={{ background: "#a78bfa" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="brand-badge mb-5 inline-block">
                ✦ Library Study Rooms
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-5"
              style={{ color: "var(--text-primary)" }}
            >
              Find Your{" "}
              <span className="block">
                Perfect{" "}
                <span className="gradient-text">Study Space</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-md"
            >
              Book quiet and modern study rooms designed for focus,
              collaboration, and productivity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link
                href="/rooms"
                className="btn-primary text-base px-6 py-3 flex items-center gap-2"
              >
                Explore Rooms <FiArrowRight size={16} />
              </Link>
              <Link
                href="/register"
                className="btn-outline text-base px-6 py-3"
              >
                Become a Host
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "var(--brand-light)" }}
                  >
                    <Icon size={17} style={{ color: "var(--brand)" }} />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[var(--text-primary)]">
                      {value}
                    </div>
                    <div className="text-xs text-[var(--text-muted)]">{label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Hero Image + Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative ring */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                border: "1.5px dashed var(--border-color)",
                transform: "rotate(3deg) scale(1.04)",
              }}
            />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                alt="Modern study room with comfortable seating and natural light"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "var(--brand-light)" }}
              >
                <HiOutlineHome size={18} style={{ color: "var(--brand)" }} />
              </div>
              <div>
                <div className="font-bold text-sm text-[var(--text-primary)]">
                  120+
                </div>
                <div className="text-xs text-[var(--text-muted)]">Study Rooms</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-4 -right-6 rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "#fef3c7" }}
              >
                <FiStar size={18} color="#f59e0b" />
              </div>
              <div>
                <div className="font-bold text-sm text-[var(--text-primary)]">
                  4.9/5
                </div>
                <div className="text-xs text-[var(--text-muted)]">User Rating</div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -left-6 top-1/2 -translate-y-1/2 rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "#dcfce7" }}
              >
                <FiZap size={18} color="#16a34a" />
              </div>
              <div>
                <div className="font-bold text-sm text-[var(--text-primary)]">
                  Instant
                </div>
                <div className="text-xs text-[var(--text-muted)]">Book in 30s</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}