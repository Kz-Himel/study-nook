"use client";

import { useState, useEffect } from "react";

export default function MyBookings({ user }) {
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    const res = await fetch(
      `http://localhost:5000/bookings/${user._id}`
    );
    const data = await res.json();
    setBookings(data);
  };

  // only 1 time load
  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <div className="p-5 space-y-4 mt-16 md:mt-20">
      <h1 className="text-xl font-bold">My Bookings</h1>

      {bookings.map((b) => (
        <div key={b._id} className="border p-4 rounded-lg">

          {/* <img
            src={b.room.image}
            className="w-24 h-24 object-cover"
          /> */}

          <h2 className="font-semibold">
            {b.room.title}
          </h2>

          <p>{b.room.category}</p>

          <p>
            {b.date} | {b.startTime} - {b.endTime}
          </p>

          <p>Total: ${b.totalCost}</p>

          <p
            className={
              b.status === "confirmed"
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {b.status}
          </p>

        </div>
      ))}
    </div>
  );
}