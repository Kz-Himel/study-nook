"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiFilter,
  FiX,
} from "react-icons/fi";

import RoomCard from "@/components/RoomCard";
import { AMENITIES } from "@/lib/utils";
import LoadingSpinner from "../LoadingSpinner";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [
    selectedAmenities,
    setSelectedAmenities,
  ] = useState([]);

  const [maxRate, setMaxRate] =
    useState("");

  const [showFilters, setShowFilters] =
    useState(false);

  // FETCH DATA
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/rooms"
        );

        const data = await res.json();

        // console.log(data);

        setRooms(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const toggleAmenity = (a) => {
    setSelectedAmenities((prev) =>
      prev.includes(a)
        ? prev.filter((x) => x !== a)
        : [...prev, a]
    );
  };

  // FILTERED DATA
  const filtered = rooms.filter((room) => {
    const matchSearch = room.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchAmenities =
      selectedAmenities.length === 0 ||
      selectedAmenities.every((a) =>
        room.amenities?.includes(a)
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
              {filtered.length} rooms available
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <FiSearch
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search rooms..."
                className="input-base pl-10"
              />
            </div>

            <button
              onClick={() =>
                setShowFilters((v) => !v)
              }
              className="px-4 py-3 rounded-xl border text-sm font-semibold"
            >
              <FiFilter size={15} />
            </button>

            {(selectedAmenities.length >
              0 ||
              maxRate !== "") && (
              <button
                onClick={() => {
                  setSelectedAmenities([]);
                  setMaxRate("");
                }}
                className="px-4 py-3 rounded-xl border text-sm font-semibold"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          {/* Filters */}
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
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="mb-3 font-bold">
                    Amenities
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {AMENITIES.map((a) => (
                      <button
                        key={a}
                        onClick={() =>
                          toggleAmenity(a)
                        }
                        className={`px-3 py-2 rounded-xl border text-xs ${
                          selectedAmenities.includes(
                            a
                          )
                            ? "bg-black text-white"
                            : ""
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-bold">
                    Max Rate
                  </h3>

                  <input
                    type="number"
                    value={maxRate}
                    onChange={(e) =>
                      setMaxRate(
                        e.target.value
                      )
                    }
                    placeholder="e.g. 10"
                    className="input-base"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Loading */}
          {loading ? (
            <LoadingSpinner />
          ) : filtered.length > 0 ? (
            // ROOMS
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
            // EMPTY
            <div className="text-center py-20">
              No rooms found
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AllRooms;