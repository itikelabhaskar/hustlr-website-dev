"use client";
import React, { useEffect, useRef } from "react";

const headline = "We didnt build another marketplace.";

const paragraphs = [
  "We built Hustlr because the $1.5 trillion freelancing industry had a dirty secret — mediocre talent, unverified clients, and platforms designed to exploit both.",
  "We fixed that. Every student is vetted. Every client is verified. Every transaction is protected.",
];

const VisionSection = () => {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const watermarkRef  = useRef<HTMLDivElement>(null);
  const labelRef      = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);
  const sigRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      const makeTimeline = (trigger: HTMLElement) =>
        gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top 82%",
          },
        });

      // Label
      if (labelRef.current) {
        makeTimeline(labelRef.current).fromTo(
          labelRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" }
        );
      }

      // Heading words
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".vis-word");
        makeTimeline(headingRef.current).fromTo(
          words,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.055,
            duration: 0.7,
            ease: "power2.out",
          }
        );
      }

      // Quote block
      if (quoteRef.current) {
        const paras = quoteRef.current.querySelectorAll(".vis-para");
        makeTimeline(quoteRef.current).fromTo(
          paras,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.18,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }

      // Callout
      if (calloutRef.current) {
        makeTimeline(calloutRef.current).fromTo(
          calloutRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }

      // Signature
      if (sigRef.current) {
        makeTimeline(sigRef.current).fromTo(
          sigRef.current,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
        );
      }

      // Parallax — watermark drifts slower than content (depth illusion)
      if (watermarkRef.current && sectionRef.current) {
        gsap.to(watermarkRef.current, {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        });
      }
    };

    init();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center px-6 lg:px-24 py-20 sm:py-28"
    >
      {/* Ghost watermark — parallaxes slower than content */}
      <div
        ref={watermarkRef}
        className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="text-[18vw] font-bold leading-none"
          style={{
            fontFamily: "var(--font-the-seasons), 'The Seasons', serif",
            color: "rgba(255,255,255,0.016)",
          }}
        >
          HUSTLR
        </span>
      </div>

      {/* Subtle gradient accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 20% 50%, rgba(165,191,82,0.04) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl">
        {/* Label */}
        <div
          ref={labelRef}
          className="flex items-center gap-3 mb-8 opacity-0"
        >
          <div className="w-7 h-px bg-[#62ABAC]" />
          <span
            className="text-[#62ABAC] text-[10px] sm:text-xs font-medium tracking-[0.32em] uppercase"
            style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
          >
            The Hustlr Standard
          </span>
        </div>

        {/* Word-by-word headline */}
        <div ref={headingRef} className="mb-10">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-normal text-white leading-[1.06]"
            style={{
              fontFamily: "var(--font-the-seasons), 'The Seasons', serif",
              letterSpacing: "-0.025em",
            }}
          >
            {headline.split(" ").map((word, i) => (
              <span
                key={i}
                className="vis-word inline-block mr-[0.22em] last:mr-0 opacity-0"
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Quote paragraphs */}
        <div
          ref={quoteRef}
          className="border-l-2 border-[#62ABAC]/60 pl-8 mb-12 space-y-5"
        >
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="vis-para text-white/60 text-lg sm:text-xl leading-relaxed opacity-0"
              style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Bold callout */}
        <div
          ref={calloutRef}
          className="opacity-0 mb-10"
        >
          <p
            className="text-2xl sm:text-3xl font-normal text-white leading-snug"
            style={{ fontFamily: "var(--font-the-seasons), 'The Seasons', serif" }}
          >
            This is freelancing —
            <br />
            <span style={{ color: "#A5BF52" }}>the way it was always meant to work.</span>
          </p>
        </div>

        {/* Signature */}
        <div
          ref={sigRef}
          className="opacity-0 flex items-center gap-4"
        >
          <div className="w-10 h-px bg-white/20" />
          <span
            className="text-white/35 text-sm tracking-wide"
            style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
          >
            — The Hustlr Promise
          </span>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
