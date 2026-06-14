import RoomEditModal from "@/components/RoomEditModal";
import BookingModal from "@/components/BookingModal";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import Link from "next/link";

import { FiMapPin, FiUsers, FiArrowLeft } from "react-icons/fi";

import { HiBookmarkAlt } from "react-icons/hi";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "StudyNook | Room Details",
};

const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;
  const token = await auth.api.getToken({
    headers: await headers()
  })

  const res = await fetch(`http://localhost:5000/rooms/${id}`, {
    cache: "no-store", 
    headers: {
      authorization : `Bearer ${token}`
    }
  });

  const room = await res.json();

  if (!room) {
    return <div className="pt-32 text-center">Room not found</div>;
  }

  return (
    <section
      className="pt-20 pb-20"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-sm font-semibold mb-8"
        >
          <FiArrowLeft />
          Back to Rooms
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* IMAGE SECTION */}
          <div>
            <Image
              src={room.image || "/placeholder.png"}
              alt={room.name}
              width={400}
              height={400}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>

          {/* DETAILS SECTION */}
          <div>
            <span className="brand-badge mb-4 inline-block">{room.floor}</span>

            <h1 className="text-3xl font-bold mb-3">{room.name}</h1>

            <p className="mb-6">{room.description}</p>

            <div className="flex gap-4 mb-6">
              <span className="flex items-center gap-1">
                <FiMapPin />
                {room.floor}
              </span>

              <span className="flex items-center gap-1">
                <FiUsers />
                {room.capacity}
              </span>

              <span className="flex items-center gap-1">
                <HiBookmarkAlt />
                {room.bookingCount || 0}
              </span>
            </div>

            <div className="text-3xl font-bold text-[var(--brand)] mb-6">
              ${room.hourlyRate}/hr
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {room.amenities?.map((a) => (
                <span
                  key={a}
                  className="px-3 py-1 text-xs rounded-lg bg-[var(--brand-light)]"
                >
                  {a}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {/* Booking modal button */}
              <BookingModal room={room} />

              {/* Edit modal button */}
              <RoomEditModal room={room} />

              {/* Delete modal button */}
              <DeleteAlertDialog room={room} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetailsPage;

