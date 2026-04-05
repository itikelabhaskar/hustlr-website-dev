import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 h-full w-64  bg-[#111]/95 backdrop-blur-lg z-50 p-6"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <nav className="flex flex-col gap-6 mt-12">
        <Link
          href="/"
          className="text-white/90 hover:text-white transition text-lg font-normal"
          onClick={onClose}
        >
          home
        </Link>
        <Link
          href="/top5"
          className="text-white/90 hover:text-white transition text-lg font-normal"
          onClick={onClose}
        >
          top 5<span style={{ fontFamily: "'Ovo', serif" }}>%</span>
        </Link>
        <Link
          href="/get-started"
          className="text-white/90 hover:text-white transition text-lg font-normal"
          onClick={onClose}
        >
          get started
        </Link>
      </nav>
    </motion.div>
  );
}

export default MobileMenu;
