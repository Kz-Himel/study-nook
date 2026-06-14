"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import CancelModal from "@/components/CancelModal";

export default function MyBookings() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);

  const userId = user?.id;

  useEffect(() => {
  if (!userId) return;

  const load = async () => {
    try {
      const token = await authClient.getToken();

      const res = await fetch("http://localhost:5000/my-bookings", {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.log(error);
    }
  };

  load();
}, [userId]);

  return (
    <div className="p-5 space-y-4 mt-16 md:mt-20">
      <h1 className="text-xl font-bold">My Bookings</h1>

      {bookings.length === 0 && <p>You have no bookings yet.</p>}

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
            <h2 className="font-semibold">{b.room?.name || "No Room Name"}</h2>

            <p>{b.room?.description || "No Description"}</p>

            <p>
              {b.date} | {b.startTime} - {b.endTime}
            </p>

            <p>Total: ${b.totalCost}</p>

            <p
              className={
                b.status === "confirmed" ? "text-green-600" : "text-red-600"
              }
            >
              {b.status}
            </p>

            <CancelModal bookingId={b._id} setBookings={setBookings} />
          </div>
        </div>
      ))}
    </div>
  );
}
