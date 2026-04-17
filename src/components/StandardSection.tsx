"use client";
import React, { useEffect, useRef } from "react";

const stages = [
  {
    num: "01",
    title: "Discovered.",
    desc: "The most ambitious students from India's top colleges.",
  },
  {
    num: "02",
    title: "Tested.",
    desc: "Rigorous vetting process. High standards. No Exceptions.",
  },
  {
    num: "03",
    title: "Chosen.",
    desc: "Gen Z's top 5%. The talent pool that's guaranteed to deliver",
  },
];

const StandardSection = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const stagesRef   = useRef<HTMLDivElement>(null);
  const closingRef  = useRef<HTMLDivElement>(null);
  const quoteRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const tl = (trigger: HTMLElement, start = "top 84%") =>
        gsap.timeline({ scrollTrigger: { trigger, start } });

      if (labelRef.current) {
        tl(labelRef.current).fromTo(
          labelRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" }
        );
      }

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".std-word");
        tl(headlineRef.current).fromTo(
          words,
          { opacity: 0, y: 38 },
          { opacity: 1, y: 0, stagger: 0.065, duration: 0.75, ease: "power3.out" }
        );
      }

      if (stagesRef.current) {
        const items = stagesRef.current.querySelectorAll(".stage-item");
        tl(stagesRef.current).fromTo(
          items,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, stagger: 0.14, duration: 0.8, ease: "power2.out" }
        );
      }

      if (closingRef.current) {
        tl(closingRef.current).fromTo(
          closingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }
        );
      }

      if (quoteRef.current) {
        tl(quoteRef.current, "top 90%").fromTo(
          quoteRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.1, ease: "power2.out" }
        );
      }
    };

    init();
  }, []);

  const headline = ["This is where exceptional", "students are recognised."];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#111] px-6 lg:px-24 pt-28 pb-32"
    >
      {/* Accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 5% 45%, rgba(98,171,172,0.055) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-5xl">
        {/* Section label */}
        <div ref={labelRef} className="flex items-center gap-3 mb-10 opacity-0">
          <div className="w-7 h-px bg-[#62ABAC]" />
          <span
            className="text-[#62ABAC] text-xs sm:text-sm font-semibold tracking-[0.28em] uppercase"
            style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
          >
            The Hustlr Standard
          </span>
        </div>

        {/* Headline — word-by-word reveal */}
        <h2
          ref={headlineRef}
          className="mb-16 leading-[1.08]"
          style={{
            fontFamily: "var(--font-the-seasons), 'The Seasons', serif",
            fontSize: "clamp(2.4rem, 5vw, 5rem)",
            letterSpacing: "-0.025em",
            fontWeight: 300,
            color: "#fff",
          }}
        >
          {headline.map((line, li) => (
            <span key={li} className="block">
              {line.split(" ").map((word, wi) => (
                <span
                  key={wi}
                  className="std-word inline-block mr-[0.22em] last:mr-0 opacity-0"
                >
                  {word}
                </span>
              ))}
            </span>
          ))}
        </h2>

        {/* Three stages */}
        <div
          ref={stagesRef}
          className="flex flex-col sm:flex-row gap-10 sm:gap-16 mb-24"
        >
          {stages.map((stage) => (
            <div key={stage.num} className="stage-item flex-1 opacity-0">
              <span
                className="text-[#62ABAC] text-sm sm:text-base font-semibold tracking-widest block mb-4"
                style={{
                  fontFamily:
                    "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
                }}
              >
                {stage.num}
              </span>
              <h3
                className="text-2xl sm:text-3xl font-normal text-white mb-3"
                style={{
                  fontFamily:
                    "var(--font-the-seasons), 'The Seasons', serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {stage.title}
              </h3>
              <div className="w-8 h-px bg-white/20 mb-4" />
              <p
                className="text-white/50 text-sm sm:text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                }}
              >
                {stage.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <div ref={closingRef} className="opacity-0 mb-14">
          <p
            className="text-xl sm:text-2xl font-normal leading-snug max-w-3xl whitespace-nowrap"
            style={{
              fontFamily: "var(--font-the-seasons), 'The Seasons', serif",
              letterSpacing: "-0.01em",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            Built for the ones who were always destined for greatness.{" "}
            <br />
            <em className="text-white">We just give them the stage.</em> 
            {/* <span className="text-white">you&apos;re probably right.</span> */}
          </p>
        </div>

        {/* Pull quote
        <div
          ref={quoteRef}
          className="opacity-0 border-l-2 border-[#62ABAC]/35 pl-6"
        >
          <p
            className="text-white/30 text-sm sm:text-base leading-relaxed italic"
            style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
          >
            &ldquo;Built for the ones who were always going to be great.
            <br className="hidden sm:block" />
            We just give them the stage.&rdquo;
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default StandardSection;
