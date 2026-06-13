"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX,
  FiUser,
  FiMail,
  FiLock,
  FiImage,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { HiBookmarkAlt } from "react-icons/hi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";


function PasswordRule({ met, label }) {
  return (
    <div
      className={`flex items-center gap-2 text-xs ${
        met ? "text-green-500" : "text-[var(--text-muted)]"
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

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields required");
      return;
    }

    if (!pwValid) {
      toast.error("Weak password");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email: form.email,
        password: form.password,
        name: form.name,
        image: form.photoUrl,
      });

      if (error) {
        toast.error(error?.message || "Signup failed");
        return;
      }

      if (data) {
        toast.success("Account created!");
        router.push("/login");
      }
    } catch (err) {
      console.log("SIGNUP ERROR:", err);
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.log(err);
      toast.error("Google login failed");
    }
  };

  return (
    <>
      <title>StudyNook – Register</title>

      <section
        className="min-h-screen flex items-center justify-center py-20 px-4 dot-pattern"
        style={{ background: "var(--bg-primary)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div
            className="rounded-3xl p-8 sm:p-10"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: "var(--brand)" }}
              >
                <HiBookmarkAlt size={22} color="white" />
              </div>

              <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
                Create Account
              </h1>

              <p className="text-sm text-[var(--text-secondary)] mt-1">
                Join StudyNook and start today
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm font-semibold text-[var(--text-primary)] mb-2 block">
                  Full Name
                </label>

                <div className="relative">
                  <FiUser
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  />

                  <input
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="input-base pl-10"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold text-[var(--text-primary)] mb-2 block">
                  Email Address
                </label>

                <div className="relative">
                  <FiMail
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  />

                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="input-base pl-10"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="text-sm font-semibold text-[var(--text-primary)] mb-2 block">
                  Photo URL
                </label>

                <div className="relative">
                  <FiImage
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  />

                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={form.photoUrl}
                    onChange={(e) =>
                      setForm({ ...form, photoUrl: e.target.value })
                    }
                    className="input-base pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-semibold text-[var(--text-primary)] mb-2 block">
                  Password
                </label>

                <div className="relative">
                  <FiLock
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  />

                  <input
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="input-base pl-10 pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    {showPw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>

                {/* Password Rules */}
                {form.password && (
                  <div className="space-y-1 mt-3">
                    <PasswordRule
                      met={rules.length}
                      label="At least 6 characters"
                    />

                    <PasswordRule
                      met={rules.upper}
                      label="One uppercase letter"
                    />

                    <PasswordRule
                      met={rules.lower}
                      label="One lowercase letter"
                    />
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-60 py-3 flex items-center gap-2"
              >
                {loading && (
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                )}

                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3">
              <div
                className="flex-1 h-px"
                style={{ background: "var(--border-color)" }}
              />

              <span className="text-xs text-[var(--text-muted)] font-medium">
                OR
              </span>

              <div
                className="flex-1 h-px"
                style={{ background: "var(--border-color)" }}
              />
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-[var(--border-color)] text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <FcGoogle size={18} />
              Continue with Google
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-[var(--text-secondary)] mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[var(--brand)] font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </section>
    </>
  );
}