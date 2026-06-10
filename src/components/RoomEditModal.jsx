"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Input,
  TextArea,
} from "@heroui/react";

export default function RoomEditModal({ room, onUpdated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    hourlyRate: "",
    capacity: "",
    floor: "",
  });

  useEffect(() => {
    if (room) {
      setForm({
        name: room.name || "",
        description: room.description || "",
        hourlyRate: room.hourlyRate || "",
        capacity: room.capacity || "",
        floor: room.floor || "",
      });
    }
  }, [room]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/rooms/${room._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();

      onUpdated?.(data);
      setIsOpen(false);
    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* MODAL */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <div className="p-6 space-y-4">

          <h2 className="text-lg font-bold">Edit Room</h2>

          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Room name"
          />

          <TextArea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <Input
            name="hourlyRate"
            type="number"
            value={form.hourlyRate}
            onChange={handleChange}
            placeholder="Hourly rate"
          />

          <Input
            name="capacity"
            type="number"
            value={form.capacity}
            onChange={handleChange}
            placeholder="Capacity"
          />

          <Input
            name="floor"
            value={form.floor}
            onChange={handleChange}
            placeholder="Floor"
          />

          <div className="flex justify-end gap-3 pt-2">

            <Button variant="light" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>

            <Button
              color="primary"
              isLoading={loading}
              onPress={handleUpdate}
            >
              Save
            </Button>

          </div>
        </div>
      </Modal>
    </>
  );
}