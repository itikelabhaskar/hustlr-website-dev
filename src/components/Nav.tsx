"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const links = [
  { href: "/", label: "home" },
  { href: "/top5", label: "top 5%" },
  { href: "/get-started", label: "get started" },
];

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Track scroll for frosted glass intensity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      if (!navRef.current) return;
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -24 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power2.out", delay: 0.1 }
      );
    };
    init();
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 sm:px-8 lg:px-12 py-5 transition-all duration-300"
        style={{
          opacity: 0,
          background: scrolled
            ? "rgba(17,17,17,0.85)"
            : "rgba(17,17,17,0.35)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-lg sm:text-xl tracking-tight text-white hover:text-white/80 transition-colors duration-200"
          style={{ fontFamily: "var(--font-the-seasons), 'The Seasons', serif" }}
        >
          hustlr.
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <Link
              href={link.href}
              key={i}
              className="text-white/60 hover:text-white text-sm transition-colors duration-200 tracking-wide relative group"
              style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#62ABAC] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="/get-started"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-xs font-medium tracking-wide hover:border-white/50 hover:bg-white/5 transition-all duration-300"
          style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
        >
          Get Started
          <svg
            className="w-3 h-3 opacity-60"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden text-white/70 hover:text-white p-1 transition-colors"
          aria-label="Open menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Nav;
