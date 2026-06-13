"use client";

import { useEffect, useState } from "react";
import { Button, Modal, Input, TextArea } from "@heroui/react";
import { toast } from "react-toastify";

const times = [
  "08:00","09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00",
  "18:00","19:00","20:00"
];

export default function BookingModal({ room, user }) {
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    note: "",
  });

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const start = Number(form.startTime.split(":")[0]);
    const end = Number(form.endTime.split(":")[0]);

    if (end > start) {
      setTotalCost((end - start) * (room?.hourlyRate || 0));
    } else {
      setTotalCost(0);
    }
  }, [form.startTime, form.endTime, room]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    if (form.date < today) {
      return toast.error("Past date not allowed");
    }

    const payload = {
      roomId: room._id,
      userId: user._id,

      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,

      note: form.note,
      totalCost,
      status: "confirmed",
    };

    const res = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return toast.error(data.message);
    }

    toast.success("Room booked successfully!");
    setIsOpen(false);

    setForm({
      date: "",
      startTime: "",
      endTime: "",
      note: "",
    });
  };

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>Book Now</Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Content>
          <Modal.Header>
            <h2>Book Room</h2>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={handleSubmit} className="space-y-4">

              <Input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />

              <select
                name="startTime"
                value={form.startTime}
                onChange={handleChange}
                className="w-full border p-2"
              >
                <option value="">Start Time</option>
                {times.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <select
                name="endTime"
                value={form.endTime}
                onChange={handleChange}
                className="w-full border p-2"
              >
                <option value="">End Time</option>
                {times.filter(t => !form.startTime || t > form.startTime).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <div className="p-2 border rounded">
                Total: ${totalCost}
              </div>

              <TextArea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Note"
              />

              <Button type="submit" className="w-full">
                Confirm Booking
              </Button>

            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}