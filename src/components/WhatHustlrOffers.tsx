"use client";
import React, { useEffect, useRef, useState } from "react";

const clientCards = [
  {
    num: "01",
    title: "The Top 5%.\nNothing Less.",
    desc: "Every student cleared a rigorous 5-stage vetting process. You're not searching through noise — you're selecting from a curated shortlist of excellence.",
  },
  {
    num: "02",
    title: "Swipe.\nMatch. Done.",
    desc: "Our intelligent matching puts pre-vetted talent in your hands within minutes. No job boards, no endless scrolling — just the right people, fast.",
  },
  {
    num: "03",
    title: "Zero-Risk\nGuarantee.",
    desc: "If the work doesn't meet your standard, we replace — no questions, no friction, no cost. Every engagement is fully protected.",
  },
  {
    num: "04",
    title: "Your Next\nFull-Timer.",
    desc: "The student you hire today could be your best full-time hire tomorrow. Discover exceptional talent before the market does.",
  },
];

const studentCards = [
  {
    num: "01",
    title: "Earn Your\nSpot.",
    desc: "Not everyone gets in. Clear our AI interview and 5-stage vetting to claim your place among India's top 5% of student talent.",
  },
  {
    num: "02",
    title: "Real Work.\nReal Stakes.",
    desc: "Verified clients. Meaningful projects. No fake tasks, no unpaid exposure. Every gig is real, every client is accountable.",
  },
  {
    num: "03",
    title: "Paid.\nProtected.",
    desc: "Escrow-protected payments. Fair rates. Zero invoicing headaches. Your work is delivered — your money is guaranteed.",
  },
  {
    num: "04",
    title: "Build a\nLegacy.",
    desc: "Every gig is your portfolio. Every client is your reference. Every project is a stepping stone to who you're becoming.",
  },
];

type Tab = "clients" | "students";

const WhatHustlrOffers = () => {
  const [tab, setTab] = useState<Tab>("clients");
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const prevTab = useRef<Tab>("clients");

  // Animate cards in on scroll
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Parallax — heading travels slightly faster than cards
      if (sectionRef.current && headingRef.current) {
        gsap.to(headingRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".offer-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    };

    init();
  }, []);

  // Re-animate cards when tab changes
  useEffect(() => {
    if (prevTab.current === tab) return;
    prevTab.current = tab;

    const animate = async () => {
      const { gsap } = await import("gsap");
      if (!cardsRef.current) return;
      const cards = cardsRef.current.querySelectorAll(".offer-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    };

    animate();
  }, [tab]);

  const cards = tab === "clients" ? clientCards : studentCards;

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 lg:px-24"
    >
      {/* Section header */}
      <div ref={headingRef} className="mb-14 opacity-0 text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-7 h-px bg-[#A5BF52]" />
          <span
            className="text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase"
            style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", color: "#b8d45e" }}
          >
            What Hustlr Offers
          </span>
        </div>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-8"
          style={{
            fontFamily: "var(--font-the-seasons), 'The Seasons', serif",
            letterSpacing: "-0.02em",
          }}
        >
          Built for both sides
          <br />
          <span className="text-white/40">of the equation.</span>
        </h2>

        {/* Pill tabs */}
        <div className="flex justify-center">
        <div className="inline-flex gap-1 p-1 rounded-full border border-white/10 bg-white/[0.03]">
          {(["clients", "students"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                tab === t
                  ? "bg-white text-[#111]"
                  : "text-white/50 hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
            >
              For {t === "clients" ? "Clients" : "Students"}
            </button>
          ))}
        </div>
        </div>
      </div>

      {/* Cards grid */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
      >
        {cards.map((card) => (
          <div
            key={`${tab}-${card.num}`}
            className="offer-card group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500 cursor-default overflow-hidden"
            style={{ opacity: 0 }}
          >
            {/* Number */}
            <span
              className="text-[#62ABAC] text-xs font-medium tracking-widest mb-6 block"
              style={{ fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace" }}
            >
              {card.num}
            </span>

            {/* Title */}
            <h3
              className="text-xl sm:text-2xl font-normal text-white leading-tight mb-4 whitespace-pre-line"
              style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', serif" }}
            >
              {card.title}
            </h3>

            {/* Divider */}
            <div className="w-8 h-px bg-white/20 mb-4 group-hover:w-16 group-hover:bg-[#62ABAC] transition-all duration-500" />

            {/* Description */}
            <p
              className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300"
              style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
            >
              {card.desc}
            </p>

            {/* Subtle corner glow on hover */}
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#62ABAC] opacity-0 group-hover:opacity-[0.04] blur-2xl transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatHustlrOffers;
