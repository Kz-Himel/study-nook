"use client";

import { useRouter } from "next/navigation";
import { AlertDialog, Button } from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { authClient } from "@/lib/auth-client"; 
import { toast } from "react-toastify";

export default function DeleteAlertDialog({ room }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!room) return null;

  const { _id, name } = room;

  const handleDelete = async () => {
    try {
      setLoading(true);

      // ২. Better Auth token
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      if (!token) {
        toast("Please login first!");
        return;
      }

      // 
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${_id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, 
        },
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/rooms");   
        router.refresh(); 
      } else {
        toast.error(data.message || "Delete failed");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
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
              <AlertDialog.Heading>
                Delete {name}?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              This action cannot be undone.
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="outline">
                Cancel
              </Button>

              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}