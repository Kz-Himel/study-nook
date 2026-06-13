"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    const res = await fetch(
      `http://localhost:5000/my-bookings/${user._id}`
    );

    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    if (user?._id) {
      loadBookings();
    }
  }, [user]);

  return (
    <div className="p-5 space-y-4 mt-16 md:mt-20">
      <h1 className="text-xl font-bold">My Bookings</h1>

      {bookings.length === 0 && (
        <p>No bookings found</p>
      )}

      {bookings.map((b) => (
        <div key={b._id} className="border p-4 rounded-lg flex gap-4">

          <Image
            src={b.room?.image}
            className="w-24 h-24 object-cover rounded"
          />

          <div>

            <h2 className="font-semibold">
              {b.room?.title || "No Title"}
            </h2>

            <p>{b.room?.category || "No Category"}</p>

            <p>
              {b.date} | {b.startTime} - {b.endTime}
            </p>

            <p>Total: ${b.totalCost}</p>

            <p className={
              b.status === "confirmed"
                ? "text-green-600"
                : "text-red-600"
            }>
              {b.status}
            </p>

          </div>
        </div>
      ))}
    </div>
  );
}