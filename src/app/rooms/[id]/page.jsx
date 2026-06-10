import Image from "next/image";
import Link from "next/link";

import {
  FiMapPin,
  FiUsers,
  FiBookOpen,
  FiEdit2,
  FiTrash2,
  FiArrowLeft,
} from "react-icons/fi";

import { HiBookmarkAlt } from "react-icons/hi";

const RoomDetailsPage = async ({ params }) => {
  const res = await fetch(
    `http://localhost:5000/rooms/${params.id}`,
    { cache: "no-store" }
  );

  const room = await res.json();

  if (!room) {
    return (
      <div className="pt-32 text-center">
        Room not found
      </div>
    );
  }

  return (
    <>
      <title>{`StudyNook – ${room.name}`}</title>

      <section className="pt-20 pb-20" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-sm font-semibold mb-8"
          >
            <FiArrowLeft size={15} />
            Back to Rooms
          </Link>

          <div className="grid lg:grid-cols-2 gap-10">

            <Image
              src={room.image}
              alt={room.name}
              width={600}
              height={400}
              className="rounded-2xl object-cover"
            />

            <div>

              <span className="brand-badge mb-4 inline-block">
                {room.floor}
              </span>

              <h1 className="text-3xl font-bold mb-3">
                {room.name}
              </h1>

              <p className="mb-6">
                {room.description}
              </p>

              <div className="flex gap-4 mb-6">
                <span>
                  <FiMapPin /> {room.floor}
                </span>

                <span>
                  <FiUsers /> {room.capacity}
                </span>

                <span>
                  <HiBookmarkAlt /> {room.bookingCount || 0}
                </span>
              </div>

              <div className="text-3xl font-bold text-[var(--brand)] mb-6">
                ${room.hourlyRate}/hr
              </div>

              <div className="flex flex-wrap gap-2">
                {room.amenities?.map((a) => (
                  <span
                    key={a}
                    className="px-3 py-1 text-xs rounded-lg bg-[var(--brand-light)]"
                  >
                    {a}
                  </span>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}
export default RoomDetailsPage;