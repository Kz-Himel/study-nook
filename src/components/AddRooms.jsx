"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { AMENITIES } from "@/lib/utils";

import {
  FiImage,
  FiDollarSign,
  FiUsers,
  FiMapPin,
} from "react-icons/fi";

export default function AddRooms() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    floor: "",
    capacity: "",
    hourlyRate: "",
    amenities: [],
  });

  const [loading, setLoading] = useState(false);

  const toggleAmenity = (a) => {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a)
        ? f.amenities.filter((x) => x !== a)
        : [...f.amenities, a],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.description ||
      !form.image ||
      !form.floor ||
      !form.capacity ||
      !form.hourlyRate
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      await new Promise((r) =>
        setTimeout(r, 1200)
      );

      toast.success(
        "Room added successfully! 🎉"
      );

      router.push("/my-listings");
    } catch {
      toast.error(
        "Failed to add room. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>StudyNook – Add Room</title>

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
            <span className="brand-badge mb-4 inline-block">
              Add Listing
            </span>

            <h1 className="section-heading mb-2">
              List Your Study Room
            </h1>

            <p className="text-[var(--text-secondary)] text-sm mb-8">
              Fill in the details below to list your
              room on StudyNook.
            </p>

            <div
              className="rounded-3xl p-8"
              style={{
                background: "var(--bg-card)",
                border:
                  "1px solid var(--border-color)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Room Name */}
                <div>
                  <label className="text-sm font-semibold text-[var(--text-primary)] mb-2 block">
                    Room Name *
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Quiet Corner Room"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="input-base"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-semibold text-[var(--text-primary)] mb-2 block">
                    Description *
                  </label>

                  <textarea
                    placeholder="Describe your room..."
                    value={form.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        description:
                          e.target.value,
                      })
                    }
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
                    placeholder="https://example.com/room.jpg"
                    value={form.image}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        image: e.target.value,
                      })
                    }
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
                      placeholder="e.g. 3rd Floor"
                      value={form.floor}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          floor: e.target.value,
                        })
                      }
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
                      min={1}
                      placeholder="e.g. 4"
                      value={form.capacity}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          capacity:
                            e.target.value,
                        })
                      }
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
                      min={1}
                      placeholder="e.g. 5"
                      value={form.hourlyRate}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          hourlyRate:
                            e.target.value,
                        })
                      }
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
                        onClick={() =>
                          toggleAmenity(a)
                        }
                        className={`text-xs font-semibold px-3 py-2 rounded-xl border transition-colors ${
                          form.amenities.includes(a)
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
                  disabled={loading}
                  className="btn-primary w-full justify-center py-3 disabled:opacity-60 flex items-center gap-2"
                >
                  {loading && (
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  )}

                  {loading
                    ? "Adding Room..."
                    : "Add Room"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}