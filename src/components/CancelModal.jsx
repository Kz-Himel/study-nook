"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

export default function CancelModal({ bookingId, setBookings }) {
  const [open, setOpen] = useState(false);

  const handleCancel = async () => {
    const res = await fetch(`http://localhost:5000/my-bookings/${bookingId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
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
                <Button variant="light" onPress={() => setOpen(false)}>
                  Back
                </Button>

                <Button color="danger" onPress={handleCancel}>
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
