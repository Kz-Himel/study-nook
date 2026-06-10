"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import {
  FiMapPin,
  FiUsers,
  FiArrowRight,
  FiHeart,
} from "react-icons/fi";

import { truncate } from "@/lib/utils";

export default function RoomCard({
  room,
  index = 0,
}) {
  const visibleAmenities =
    room.amenities.slice(0, 3);

  const extraCount =
    room.amenities.length - 3;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
      }}
      className="card-base rounded-2xl overflow-hidden flex flex-col group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {/* <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        /> */}

        {/* Heart */}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
          <FiHeart size={15} />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-800 text-[var(--text-primary)] text-base font-bold mb-1.5 leading-tight">
          {room.name}
        </h3>

        <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-3">
          {truncate(room.description, 100)}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-3">
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium">
            <FiMapPin size={12} />

            {room.floor}
          </span>

          <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium">
            <FiUsers size={12} />

            {room.capacity === 1
              ? "1 person"
              : `2–${room.capacity} people`}
          </span>
        </div>

        {/* Price */}
        <div className="text-xl font-bold text-[var(--brand)] mb-3">
          ${room.hourlyRate}

          <span className="text-sm font-medium text-[var(--text-muted)]">
            /hr
          </span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {visibleAmenities.map((a) => (
            <span
              key={a}
              className="text-[0.7rem] font-600 font-semibold px-2 py-0.5 rounded-md"
              style={{
                background:
                  "var(--brand-light)",
                color: "var(--brand)",
              }}
            >
              {a}
            </span>
          ))}

          {extraCount > 0 && (
            <span className="text-[0.7rem] font-semibold px-2 py-0.5 rounded-md bg-[var(--bg-secondary)] text-[var(--text-muted)]">
              +{extraCount} more
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/rooms/${room._id}`}
          className="btn-outline text-sm justify-center mt-auto"
        >
          View Details

          <FiArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}