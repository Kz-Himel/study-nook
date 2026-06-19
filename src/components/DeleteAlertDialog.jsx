"use client";

import { useRouter } from "next/navigation";
import { AlertDialog, Button } from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { authClient } from "@/lib/auth-client"; // 👈 ১. ইম্পোর্ট ঠিক করা হলো

export default function DeleteAlertDialog({ room }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!room) return null;

  const { _id, name } = room;

  const handleDelete = async () => {
    try {
      setLoading(true);

      // ২. Better Auth থেকে টোকেন নেওয়া
      const tokenRes = await authClient.token?.();
      const token = tokenRes?.data?.token;

      if (!token) {
        alert("Please login first!");
        return;
      }

      // ৩. হেডার-এ টোকেনসহ ডিলিট রিকোয়েস্ট পাঠানো
      const res = await fetch(`http://localhost:5000/rooms/${_id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, // Authorization ক্যাপিটাল করা হলো স্ট্যান্ডার্ড অনুযায়ী
        },
      });

      const data = await res.json();

      if (res.ok) {
        // HeroUI-তে রুট চেঞ্জ এবং রিফ্রেশ করলেই ওল্ড মডাল অটো ক্লিয়ার হয়ে যাবে
        router.push("/rooms");   
        router.refresh(); 
      } else {
        alert(data.message || "Delete failed");
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