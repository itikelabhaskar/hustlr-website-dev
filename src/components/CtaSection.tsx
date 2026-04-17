"use client";
import React, { useEffect, useRef } from "react";
import MagneticButton from "./MagneticButton";

const CtaSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll(".cta-word");
        tl.fromTo(
          words,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.75,
            ease: "power2.out",
          }
        );
      }

      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );
      }

      if (btnsRef.current) {
        const buttons = btnsRef.current.children;
        tl.fromTo(
          buttons,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.35"
        );
      }
    };

    init();
  }, []);

  const headline = "You are either in — or watching from the outside.";

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center text-center px-6 lg:px-24 py-20 sm:py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(98,171,172,0.06) 0%, transparent 65%)",
        }}
      />

      {/* Top border rule */}
      <div className="absolute top-0 left-6 lg:left-24 right-6 lg:right-24 h-px bg-white/[0.06]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-7 h-px bg-[#62ABAC]" />
          <span
            className="text-[#62ABAC] text-[10px] sm:text-xs font-medium tracking-[0.32em] uppercase"
            style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
          >
            Join the Network
          </span>
          <div className="w-7 h-px bg-[#62ABAC]" />
        </div>

        {/* Headline — word by word */}
        <div ref={headingRef} className="mb-6">
          <h2
            className="text-4xl sm:text-5xl md:text-[4.5rem] font-normal text-white leading-[1.08]"
            style={{
              fontFamily: "var(--font-the-seasons), 'The Seasons', serif",
              letterSpacing: "-0.025em",
            }}
          >
            {headline.split(" ").map((word, i) => (
              <span
                key={i}
                className="cta-word inline-block mr-[0.22em] last:mr-0 opacity-0"
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Subtext */}
        <p
          ref={subRef}
          className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto mb-12 leading-relaxed opacity-0"
          style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
        >
          Access a talent network so exclusive, so thoroughly vetted, so
          powerful — that once you're in, you never look elsewhere.
        </p>

        {/* Buttons */}
        <div
          ref={btnsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <MagneticButton strength={0.22}>
            <a
              href="/get-started?type=client"
              className="inline-block w-full sm:w-auto px-9 py-4 bg-white text-[#111] font-semibold rounded-full text-sm sm:text-base tracking-wide hover:bg-[#62ABAC] hover:text-white transition-colors duration-300 opacity-0"
              style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
            >
              Access Elite Talent
            </a>
          </MagneticButton>
          <MagneticButton strength={0.22}>
            <a
              href="/get-started?type=student"
              className="inline-block w-full sm:w-auto px-9 py-4 border border-white/25 text-white font-semibold rounded-full text-sm sm:text-base tracking-wide hover:border-white/60 hover:bg-white/5 transition-all duration-300 opacity-0"
              style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
            >
              Apply for the Top 5%
            </a>
          </MagneticButton>
        </div>

        {/* Bottom fine print */}
        <p
          className="mt-10 text-white/20 text-xs"
          style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
        >
          Limited access. Rigorous standards. Zero compromises.
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
