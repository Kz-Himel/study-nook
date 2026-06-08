"use client";
import { motion } from "framer-motion";
import { FiSearch, FiCalendar, FiCheckCircle } from "react-icons/fi";

const steps = [
  {
    icon: FiSearch,
    number: "01",
    title: "Browse Rooms",
    description:
      "Search and filter available study rooms by amenities, floor, capacity, and hourly rate.",
    color: "var(--brand)",
    bg: "var(--brand-light)",
  },
  {
    icon: FiCalendar,
    number: "02",
    title: "Pick a Slot",
    description:
      "Choose your preferred date and time slot. The system automatically prevents double-booking.",
    color: "#f59e0b",
    bg: "#fef3c7",
  },
  {
    icon: FiCheckCircle,
    number: "03",
    title: "Confirm & Study",
    description:
      "Confirm your booking instantly, head to the room, and enjoy a productive study session.",
    color: "#16a34a",
    bg: "#dcfce7",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="brand-badge mb-4 inline-block">How It Works</span>
          <h2 className="section-heading">Book a Room in 3 Simple Steps</h2>
          <p className="text-[var(--text-secondary)] mt-2 max-w-md mx-auto text-sm">
            Getting your study space has never been easier. Just browse, pick,
            and go.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (visible on md+ screens) */}
          <div
            className="absolute top-10 left-1/4 right-1/4 h-0.5 hidden md:block"
            style={{
              background:
                "linear-gradient(to right, var(--brand), #a78bfa, #16a34a)",
              opacity: 0.2,
            }}
          />

          {steps.map(({ icon: Icon, number, title, description, color, bg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="card-base rounded-2xl p-7 text-center relative group"
            >
              <div className="relative inline-flex mb-5">
                {/* Icon Container */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110"
                  style={{ background: bg }}
                >
                  <Icon size={28} style={{ color }} />
                </div>

                {/* Step Number Badge */}
                <span
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-xs font-black flex items-center justify-center shadow-md"
                  style={{ background: color, fontSize: "0.65rem" }}
                >
                  {number}
                </span>
              </div>

              <h3 className="font-bold text-base text-[var(--text-primary)] mb-2">
                {title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}