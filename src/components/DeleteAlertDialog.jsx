"use client";

import { useRouter } from "next/navigation";
import { AlertDialog, Button } from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";

export default function DeleteAlertDialog({ room }) {
  const router = useRouter();

  if (!room) return null;

  const { _id, name } = room;

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/rooms/${_id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      router.refresh(); // or router.push("/rooms")
    }
  };

  return (
    <AlertDialog>
      <Button variant="danger">
        <FiTrash2 /> Delete Room
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.Header>
              <AlertDialog.Heading>Delete {name}?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>This action cannot be undone.</AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="outline">Cancel</Button>

              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
