"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import CancelModal from "@/components/CancelModal";
import LoadingSpinner from "../LoadingSpinner";

export default function MyBookings() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // wait until user exists
        if (!user?.id) return;

        setLoading(true);

        // FIX: session token use safely
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        // console.log("TOKEN:", token);

        // console.log("TOKEN:", token);
        // console.log("SESSION:", session);
        // console.log("USER:", user);

        if (!token) {
          // console.log("No token found!");
          setBookings([]);
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5000/my-bookings", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("BOOKINGS:", data);

        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log("ERROR:", err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user?.id]);

  return (
    <section className="pt-24 pb-20"
        style={{
          background: "var(--bg-primary)",
        }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-xl font-bold pb-2">My Bookings</h1>

      {loading && <LoadingSpinner />}

      {!loading && bookings.length === 0 && <p>You have no bookings yet.</p>}

      {!loading &&
        bookings.map((b) => (
          <div key={b._id} className="border p-4 rounded-lg flex gap-4">
            <Image
              src={b.room?.image || "/placeholder.png"}
              alt={b.room?.name || "room"}
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
    </section>
  );
}
