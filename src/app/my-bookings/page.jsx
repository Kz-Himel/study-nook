"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function MyBookings() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);

  const userId = user?.id; // most likely correct

  useEffect(() => {
    console.log("USER:", user);

    if (!userId) return;

    const load = async () => {
      console.log("FETCHING FOR:", userId);

      const res = await fetch(
        `http://localhost:5000/my-bookings/${userId}`,
        { cache: "no-store" }
      );

      const data = await res.json();

      console.log("DATA:", data);

      setBookings(data);
    };

    load();
  }, [userId]);

  return (
    <div className="p-5 space-y-4 mt-16 md:mt-20">
      <h1 className="text-xl font-bold">My Bookings</h1>

      {bookings.length === 0 && <p>No bookings found</p>}

      {bookings.map((b) => (
        <div key={b._id} className="border p-4 rounded-lg flex gap-4">

          <Image
            src={b.room?.image || "/placeholder.png"}
            alt="room"
            width={96}
            height={96}
            className="w-24 h-24 object-cover rounded"
          />

          <div>
            <h2 className="font-semibold">
              {b.room?.name || "No Room Name"}
            </h2>

            <p>{b.room?.description || "No Description"}</p>

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
        </div>
      ))}
    </div>
  );
}