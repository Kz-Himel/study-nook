"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import RoomCard from "@/components/RoomCard";

export default function RoomsSection() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("http://localhost:5000/rooms");
        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const firstSixRooms = rooms.slice(0, 6);

  return (
    <section className="py-20" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-heading flex items-center gap-2"
            >
              Popular Study Rooms{" "}
              <span style={{ color: "var(--brand)" }}>✦</span>
            </motion.h2>

            <p className="text-[var(--text-secondary)] text-sm mt-1">
              Explore our latest and most booked study rooms.
            </p>
          </div>

          <Link
            href="/rooms"
            className="flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:opacity-80 transition-opacity flex-shrink-0 border border-[var(--border-color)] px-4 py-2 rounded-xl hover:bg-[var(--brand-light)]"
          >
            View all rooms <FiArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <p className="text-[var(--text-secondary)]">Loading rooms...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {firstSixRooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}