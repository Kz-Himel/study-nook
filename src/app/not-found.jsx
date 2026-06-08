"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { HiBookmarkAlt } from "react-icons/hi";

const NotFound = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center text-center px-4"
      style={{ background: "var(--bg-primary)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        {/* Logo/Icon */}
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "var(--brand-light)" }}
        >
          <HiBookmarkAlt size={36} style={{ color: "var(--brand)" }} />
        </div>

        {/* 404 Number */}
        <h1 className="text-8xl font-black text-[var(--text-primary)] mb-3 tracking-tighter">
          4<span style={{ color: "var(--brand)" }}>0</span>4
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-[var(--text-secondary)] mb-8 text-sm leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="btn-primary inline-flex items-center gap-2"
        >
          <FiArrowLeft size={16} />
          Back to Home
        </Link>
      </motion.div>
    </section>
  );
}
export default NotFound;