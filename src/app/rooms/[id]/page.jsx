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

  if (!id || id === "undefined") {
    return <div className="pt-32 text-center">Invalid Room Identifier.</div>;
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="pt-32 text-center text-danger font-semibold">
        Failed to load room details. (Status: {res.status})
      </div>
    );
  }

  const room = await res.json();

  if (!room || room.error || room.message) {
    return <div className="pt-32 text-center">Room not found</div>;
  }

  const currentUserId = 
    session?.session?.userId || 
    session?.user?.id || 
    session?.user?.sub || 
    session?.user?._id;

  const roomOwnerId = room?.userId || room?.ownerId;

  let isOwner = false;
  if (currentUserId && roomOwnerId) {
    isOwner = String(roomOwnerId).trim() === String(currentUserId).trim();
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
              src={room?.image || "/placeholder.png"}
              alt={room?.name || "Room image"}
              width={400}
              height={300}
              className="w-full h-[400px] object-cover rounded-xl"
              priority
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

            {/* BUTTONS ACTION SECTION */}
            <div className="flex flex-wrap gap-3">
              {isOwner ? (
                <>
                  <BookingModal room={room} />
                  <RoomEditModal room={room} />
                  <DeleteAlertDialog room={room} />
                </>
              ) : (
                <BookingModal room={room} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetailsPage;