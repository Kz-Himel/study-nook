"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiBookOpen, FiTrendingUp } from "react-icons/fi";

export default function Features() {
  return (
    <section className="py-20" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* For Students */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden p-8 flex flex-col justify-between min-h-[280px]"
            style={{
              background:
                "linear-gradient(135deg, var(--brand-light) 0%, #e8e8ff 100%)",
              border: "1px solid var(--border-color)",
            }}
          >
            <div className="relative z-10">
              <span className="brand-badge mb-4 inline-block">
                For Students
              </span>
              <h3 className="text-3xl font-extrabold text-[var(--text-primary)] leading-tight mb-3">
                Find. Book. Focus.
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xs">
                Find the perfect study environment that helps you stay productive
                and achieve more.
              </p>
              <Link
                href="/rooms"
                className="btn-primary text-sm flex items-center gap-2"
              >
                Explore Rooms <FiArrowRight size={14} />
              </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute right-6 bottom-6 flex gap-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: "var(--brand)", opacity: 0.15 }}
              />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mt-4"
                style={{ background: "var(--brand)", opacity: 0.1 }}
              />
            </div>

            <div className="absolute right-8 bottom-8 opacity-30">
              <FiBookOpen size={64} style={{ color: "var(--brand)" }} />
            </div>
          </motion.div>

          {/* For Room Owners */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden p-8 flex flex-col justify-between min-h-[280px]"
            style={{
              background:
                "linear-gradient(135deg, #e8f4ff 0%, #f0f8ff 100%)",
              border: "1px solid var(--border-color)",
            }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 80% 80%, #3b82f6, transparent 60%)",
              }}
            />

            <div className="relative z-10">
              <span
                className="inline-block text-[0.7rem] font-bold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
                style={{ background: "#dbeafe", color: "#2563eb" }}
              >
                For Room Owners
              </span>
              <h3 className="text-3xl font-extrabold text-[var(--text-primary)] leading-tight mb-3">
                List Your Room <br />
                & Earn
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 max-w-xs">
                Share your space with students and earn money on your available
                rooms.
              </p>
              <Link
                href="/add-room"
                className="btn-primary text-sm flex items-center gap-2"
                style={{ background: "#2563eb", borderColor: "#2563eb" }}
              >
                Become a Host <FiArrowRight size={14} />
              </Link>
            </div>

            <div className="absolute right-8 bottom-8 opacity-20">
              <FiTrendingUp size={64} color="#2563eb" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}