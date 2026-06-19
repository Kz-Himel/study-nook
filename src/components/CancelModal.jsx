"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function CancelModal({ bookingId, setBookings }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    try {
      setLoading(true);
      const { data: tokenData } = await authClient.token();

      if (!tokenData?.token) {
        toast.error("Please login first!");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${tokenData.token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok && data.deletedCount > 0) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
        toast.success("Booking cancelled successfully!");
        setOpen(false);
      } else {
        toast.error(data.message || "Failed to cancel booking.");
      }
    } catch (err) {
      // console.error("Cancellation error:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="danger" onPress={() => setOpen(true)}>
        Cancel Booking
      </Button>

      <AlertDialog isOpen={open} onOpenChange={setOpen}>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.Header>
                <AlertDialog.Heading>Cancel this booking?</AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body>This action cannot be undone.</AlertDialog.Body>

              <AlertDialog.Footer>
                <Button variant="light" onPress={() => setOpen(false)} disabled={loading}>
                  Back
                </Button>

                <Button variant="danger" onPress={handleCancel} isLoading={loading}>
                  Confirm Cancel
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </>
  );
}