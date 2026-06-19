"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MyListingsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        const res = await fetch("http://localhost:5000/my-listings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        setRooms(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log(err);
        setRooms([]);
      } finally {
        setLoading(false); // 🔥 IMPORTANT FIX
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-15">
      <h1 className="text-3xl font-bold mb-6">My Listings</h1>

      {rooms.length === 0 ? (
        <p className="text-gray-500">You didnt create any rooms yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={room.image}
                alt={room.name}
                className="h-40 w-full object-cover rounded-lg"
              />

              <h2 className="text-xl font-semibold mt-2">{room.name}</h2>

              <p className="text-sm text-gray-600">{room.description}</p>

              <div className="mt-2 text-sm text-gray-500">
                Floor: {room.floor}
              </div>

              <div className="mt-2 font-bold">${room.hourlyRate}/hr</div>
              {room.amenities && room.amenities.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {room.amenities.map((a, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
