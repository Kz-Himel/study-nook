"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

import RoomCard from "@/components/RoomCard";
import { MOCK_ROOMS, AMENITIES } from "@/lib/utils";

export default function RoomsPage() {
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [maxRate, setMaxRate] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const toggleAmenity = (a) => {
    setSelectedAmenities((prev) =>
      prev.includes(a)
        ? prev.filter((x) => x !== a)
        : [...prev, a]
    );
  };

  const filtered = MOCK_ROOMS.filter((room) => {
    const matchSearch = room.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((a) =>
        room.amenities.includes(a)
      );

    const matchRate =
      maxRate === "" ||
      room.hourlyRate <= Number(maxRate);

    return (
      matchSearch &&
      matchAmenities &&
      matchRate
    );
  });

  return (
    <>
      <title>StudyNook – Available Rooms</title>

      <section
        className="pt-24 pb-20"
        style={{
          background: "var(--bg-primary)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="brand-badge mb-3 inline-block">
              All Rooms
            </span>

            <h1 className="section-heading mb-2">
              Available Study Rooms
            </h1>

            <p className="text-[var(--text-secondary)] text-sm">
              {filtered.length} rooms available · Filter by your
              preferences
            </p>
          </div>

          {/* Search & Filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <FiSearch
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search rooms by name..."
                className="input-base pl-10"
              />
            </div>

            <button
              onClick={() =>
                setShowFilters((v) => !v)
              }
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-colors ${
                showFilters
                  ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                  : "text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
              }`}
            >
              <FiFilter size={15} />

              Filters

              {selectedAmenities.length > 0 && (
                <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {selectedAmenities.length}
                </span>
              )}
            </button>

            {(selectedAmenities.length > 0 ||
              maxRate !== "") && (
              <button
                onClick={() => {
                  setSelectedAmenities([]);
                  setMaxRate("");
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 border border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30 transition-colors"
              >
                <FiX size={14} />
                Clear
              </button>
            )}
          </div>

          {/* Filter panel */}
          {showFilters && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              className="mb-8 p-5 rounded-2xl overflow-hidden"
              style={{
                background: "var(--bg-secondary)",
                border:
                  "1px solid var(--border-color)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">
                    Amenities
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {AMENITIES.map((a) => (
                      <button
                        key={a}
                        onClick={() =>
                          toggleAmenity(a)
                        }
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                          selectedAmenities.includes(a)
                            ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                            : "text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--brand)]"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">
                    Max Hourly Rate ($)
                  </h3>

                  <input
                    type="number"
                    min={1}
                    value={maxRate}
                    onChange={(e) =>
                      setMaxRate(
                        e.target.value
                          ? Number(e.target.value)
                          : ""
                      )
                    }
                    placeholder="e.g. 15"
                    className="input-base max-w-xs"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Rooms grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((room, i) => (
                <RoomCard
                  key={room._id}
                  room={room}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background:
                    "var(--brand-light)",
                }}
              >
                <FiSearch
                  size={28}
                  style={{
                    color: "var(--brand)",
                  }}
                />
              </div>

              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                No rooms found
              </h3>

              <p className="text-[var(--text-secondary)] text-sm">
                Try adjusting your search or filters to find
                what you need.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}