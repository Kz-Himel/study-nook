"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiCheck, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

function PasswordRule({ met, label }) {
  return (
    <div
      className={`flex items-center gap-2 text-xs ${
        met ? "text-green-600" : "text-gray-400"
      }`}
    >
      {met ? <FiCheck size={12} /> : <FiX size={12} />}
      {label}
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });

  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const rules = {
    length: form.password.length >= 6,
    upper: /[A-Z]/.test(form.password),
    lower: /[a-z]/.test(form.password),
  };

  const pwValid = Object.values(rules).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.photoUrl || !form.password) {
      toast.error("All fields required");
      return;
    }

    if (!pwValid) {
      toast.error("Weak password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Account created!");
      router.push("/login");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="url"
          placeholder="Photo URL"
          value={form.photoUrl}
          onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
        />

        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
          >
            {showPw ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {form.password && (
          <div className="space-y-1">
            <PasswordRule met={rules.length} label="At least 6 characters" />
            <PasswordRule met={rules.upper} label="One uppercase letter" />
            <PasswordRule met={rules.lower} label="One lowercase letter" />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>

        <p>
          Already have an account?{" "}
          <Link href="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}