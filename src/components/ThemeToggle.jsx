"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-12 h-6 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] flex items-center px-0.5 cursor-pointer transition-colors duration-300"
    >
      <motion.span
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="w-5 h-5 rounded-full bg-[var(--brand)] flex items-center justify-center"
        style={{
          marginLeft:
            theme === "dark"
              ? "calc(100% - 20px)"
              : "0",
        }}
      >
        <AnimatePresence mode="wait">
          {theme === "dark" ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiMoon size={11} color="white" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiSun size={11} color="white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  );
}