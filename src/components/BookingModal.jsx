"use client";

import { useEffect, useState } from "react";
import { Button, Modal, Input, TextArea } from "@heroui/react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const times = [
  "08:00","09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00",
  "18:00","19:00","20:00"
];

export default function BookingModal({ room }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Debugging এর জন্য
  console.log("Session Data:", session);
  console.log("User Data:", user);

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

    if (end > start && room?.hourlyRate) {
      setTotalCost((end - start) * room.hourlyRate);
    } else {
      setTotalCost(0);
    }
  }, [form.startTime, form.endTime, room]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!room?._id) {
      return toast.error("Room information not found");
    }

    // Real user check with better debugging
    if (!user) {
      console.log("No user in session");
      return toast.error("Please login to book a room");
    }

    // যদি _id না থাকে তাহলে id বা অন্য ফিল্ড চেক করো
    const userId = user._id || user.id;

    if (!userId) {
      console.log("User found but no ID:", user);
      return toast.error("User ID not found. Please login again.");
    }

    if (!form.date || !form.startTime || !form.endTime) {
      return toast.error("Please fill all required fields");
    }

    const today = new Date().toISOString().split("T")[0];
    if (form.date < today) {
      return toast.error("Past date not allowed");
    }

    const payload = {
      roomId: room._id,
      userId: userId,
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      note: form.note,
      totalCost,
      status: "confirmed",
    };

    try {
      const res = await fetch("http://localhost:5000/my-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Booking failed");
      }

      toast.success("✅ Room booked successfully!");
      setIsOpen(false);
      setForm({ date: "", startTime: "", endTime: "", note: "" });
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      <Button 
        onPress={() => setIsOpen(true)} 
        color="primary"
        isDisabled={!room?._id || !user}
      >
        Book Now
      </Button>

      {/* Modal remains same */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-md max-h-[90vh] overflow-y-auto">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>Book Room</Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input type="date" name="date" value={form.date} onChange={handleChange} required />

                  <select name="startTime" value={form.startTime} onChange={handleChange} className="input-base w-full" required>
                    <option value="">Start Time</option>
                    {times.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>

                  <select name="endTime" value={form.endTime} onChange={handleChange} className="input-base w-full" required>
                    <option value="">End Time</option>
                    {times.filter(t => !form.startTime || t > form.startTime).map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>

                  <div className="p-3 border rounded bg-gray-100 dark:bg-gray-800">
                    Total: <span className="font-bold">${totalCost}</span>
                  </div>

                  <TextArea name="note" value={form.note} onChange={handleChange} placeholder="Note" />

                  <Button type="submit" color="primary" className="w-full">
                    Confirm Booking
                  </Button>
                </form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="light" onPress={() => setIsOpen(false)}>
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