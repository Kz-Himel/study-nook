"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { AMENITIES } from "@/lib/utils";

import { FiImage, FiDollarSign, FiUsers, FiMapPin } from "react-icons/fi";


export default function AddRooms() {
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const room = Object.fromEntries(formData.entries());
    room.amenities = selectedAmenities;
    room.capacity = Number(room.capacity);
    room.hourlyRate = Number(room.hourlyRate);
    try {
      const res = await fetch("http://localhost:5000/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
      });
      if (!res.ok) {
        throw new Error("Failed to add room");
      }
      const data = await res.json();
      console.log(data);
      if (data.insertedId) {
        alert("Room added successfully!");
        e.target.reset();
        setSelectedAmenities([]);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <>

      <section
        className="pt-24 pb-20"
        style={{
          background: "var(--bg-primary)",
        }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <span className="brand-badge mb-4 inline-block">Add Listing</span>

            <h1 className="section-heading mb-2">List Your Study Room</h1>

            <p className="text-[var(--text-secondary)] text-sm mb-8">
              Fill in the details below to list your room on StudyNook.
            </p>

            <div
              className="rounded-3xl p-8"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Room Name */}
                <div>
                  <label className="text-sm font-semibold text-[var(--text-primary)] mb-2 block">
                    Room Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Quiet Corner Room"
                    className="input-base"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-semibold text-[var(--text-primary)] mb-2 block">
                    Description *
                  </label>

                  <textarea
                    name="description"
                    required
                    placeholder="Describe your room..."
                    rows={4}
                    className="input-base resize-none"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="text-sm font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                    <FiImage size={13} />
                    Image URL *
                  </label>

                  <input
                    type="url"
                    name="image"
                    required
                    placeholder="https://example.com/room.jpg"
                    className="input-base"
                  />
                </div>

                {/* Floor + Capacity + Rate */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-1">
                      <FiMapPin size={12} />
                      Floor *
                    </label>

                    <input
                      type="text"
                      name="floor"
                      required
                      placeholder="e.g. 3rd Floor"
                      className="input-base"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-1">
                      <FiUsers size={12} />
                      Capacity *
                    </label>

                    <input
                      type="number"
                      name="capacity"
                      required
                      min={1}
                      placeholder="e.g. 4"
                      className="input-base"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-1">
                      <FiDollarSign size={12} />
                      Rate/hr *
                    </label>

                    <input
                      type="number"
                      name="hourlyRate"
                      required
                      min={1}
                      placeholder="e.g. 5"
                      className="input-base"
                    />
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="text-sm font-semibold text-[var(--text-primary)] mb-3 block">
                    Amenities
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {AMENITIES.map((a) => (
                      <button
                        type="button"
                        key={a}
                        onClick={() => toggleAmenity(a)}
                        className={`text-xs font-semibold px-3 py-2 rounded-xl border transition-colors ${
                          selectedAmenities.includes(a)
                            ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                            : "border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--brand)]"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-3 flex items-center gap-2"
                >
                  Add Room
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
