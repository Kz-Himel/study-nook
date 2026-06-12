"use client";

import { useState } from "react";
import { Button, Modal } from "@heroui/react";
import {
  FiEdit,
  FiImage,
  FiDollarSign,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";

import { AMENITIES } from "@/lib/utils";
import { toast } from "react-toastify";

export default function RoomEditModal({ room }) {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedAmenities, setSelectedAmenities] = useState(
    room?.amenities || []
  );

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedRoom = Object.fromEntries(formData.entries());

    updatedRoom.amenities = selectedAmenities;
    updatedRoom.capacity = Number(updatedRoom.capacity);
    updatedRoom.hourlyRate = Number(updatedRoom.hourlyRate);

    try {
      const res = await fetch(
        `http://localhost:5000/rooms/${room._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRoom),
        }
      );

      if (!res.ok) throw new Error("Failed to update room");

      toast("Room updated successfully!");
      setIsOpen(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast(err.message);
    }
  };

  return (
    <>
      {/* OPEN BUTTON */}
      <Button
        color="primary"
        startContent={<FiEdit />}
        onPress={() => setIsOpen(true)}
      >
        <FiEdit />
        Edit
      </Button>

      {/* MODAL (HeroUI v3 style) */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
              <Modal.CloseTrigger />

              {/* HEADER */}
              <Modal.Header>
                <Modal.Heading>Edit Room</Modal.Heading>
              </Modal.Header>

              {/* BODY */}
              <Modal.Body>
                <form onSubmit={onSubmit} className="space-y-5">
                  {/* Room Name */}
                  <div>
                    <label className="text-sm font-semibold block mb-2">
                      Room Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={room.name}
                      className="input-base"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-sm font-semibold block mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      defaultValue={room.description}
                      rows={4}
                      className="input-base resize-none"
                      required
                    />
                  </div>

                  {/* Image */}
                  <div>
                    <label className="text-sm font-semibold flex items-center gap-2 mb-2">
                      <FiImage size={14} />
                      Image URL *
                    </label>
                    <input
                      type="url"
                      name="image"
                      defaultValue={room.image}
                      className="input-base"
                      required
                    />
                  </div>

                  {/* Floor / Capacity / Rate */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-semibold flex items-center gap-1 mb-2">
                        <FiMapPin size={12} />
                        Floor
                      </label>
                      <input
                        name="floor"
                        defaultValue={room.floor}
                        className="input-base"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold flex items-center gap-1 mb-2">
                        <FiUsers size={12} />
                        Capacity
                      </label>
                      <input
                        type="number"
                        name="capacity"
                        defaultValue={room.capacity}
                        className="input-base"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold flex items-center gap-1 mb-2">
                        <FiDollarSign size={12} />
                        Rate/hr
                      </label>
                      <input
                        type="number"
                        name="hourlyRate"
                        defaultValue={room.hourlyRate}
                        className="input-base"
                      />
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="text-sm font-semibold block mb-3">
                      Amenities
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {AMENITIES.map((a) => (
                        <button
                          type="button"
                          key={a}
                          onClick={() => toggleAmenity(a)}
                          className={`px-3 py-2 text-xs rounded-xl border ${
                            selectedAmenities.includes(a)
                              ? "bg-black text-white"
                              : ""
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    className="btn-primary w-full py-3"
                  >
                    Update Room
                  </button>
                </form>
              </Modal.Body>

              {/* FOOTER */}
              <Modal.Footer>
                <Button
                  variant="light"
                  onPress={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}