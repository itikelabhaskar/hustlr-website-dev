"use client";
import React, { useEffect, useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const clientSteps = [
  {
    num: "01",
    title: "Get Verified",
    desc: "Submit your business credentials. We verify every client so students know they're working with the real deal — building trust from day one.",
    accent: "#62ABAC",
  },
  {
    num: "02",
    title: "Post Your Brief",
    desc: "Define the scope, timeline, and budget. Think of it as a casting call — for brilliance. Be specific, attract the best.",
    accent: "#A5BF52",
  },
  {
    num: "03",
    title: "Discover & Match",
    desc: "Swipe through pre-vetted, top 5% talent. Shortlist your favourites in minutes — not after days of filtering irrelevant CVs.",
    accent: "#62ABAC",
  },
  {
    num: "04",
    title: "Connect & Commit",
    desc: "Chat directly, align on expectations, and fund via secure escrow. Zero upfront risk, total peace of mind.",
    accent: "#A5BF52",
  },
  {
    num: "05",
    title: "Approve & Unlock",
    desc: "Review the delivery. Approve it. Release payment. Guaranteed quality — or we replace at no cost, no questions.",
    accent: "#62ABAC",
  },
];

const studentSteps = [
  {
    num: "01",
    title: "Apply",
    desc: "Submit your resume, portfolio, and profile. We look at everything — so be honest, be thorough, be yourself.",
    accent: "#62ABAC",
  },
  {
    num: "02",
    title: "Clear the Shortlist",
    desc: "Skill tests, portfolio deep-dive, and a test project. This is where average falls off and top 5% steps forward.",
    accent: "#A5BF52",
  },
  {
    num: "03",
    title: "Ace the Interview",
    desc: "Our proprietary AI interview tests clarity of thought, problem-solving, and real-world readiness. No fluff — just excellence.",
    accent: "#62ABAC",
  },
  {
    num: "04",
    title: "Swipe Into Gigs",
    desc: "Match with verified clients and real paid projects. Swipe right, get matched, start working on things that actually matter.",
    accent: "#A5BF52",
  },
  {
    num: "05",
    title: "Deliver & Earn",
    desc: "Submit your work. Earn your rating. Unlock escrow-protected payment in 48 hours or less. No chasing. No waiting.",
    accent: "#62ABAC",
  },
];

type Tab = "clients" | "students";

// ─── Component ────────────────────────────────────────────────────────────────

const HowHustlrWorks = () => {
  const [tab, setTab] = useState<Tab>("clients");
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef(0);

  const steps = tab === "clients" ? clientSteps : studentSteps;

  // Scroll-driven step advancement
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      const stepIdx = Math.min(
        Math.floor(progress * steps.length * 1.02),
        steps.length - 1
      );
      setActiveStep(stepIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tab, steps.length]);

  // Animate content transition on step change
  useEffect(() => {
    if (prevStepRef.current === activeStep) return;
    prevStepRef.current = activeStep;

    const animate = async () => {
      const { gsap } = await import("gsap");
      if (!contentRef.current) return;
      const els = contentRef.current.querySelectorAll(".step-animate");
      gsap.fromTo(
        els,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: "power2.out" }
      );
    };

    animate();
  }, [activeStep]);

  // Reset on tab switch
  const handleTabChange = (t: Tab) => {
    setTab(t);
    setActiveStep(0);
    prevStepRef.current = -1;
  };

  const step = steps[activeStep];

  return (
    /* Outer wrapper: exactly steps.length × 100vh so no dead space */
    <div ref={sectionRef} style={{ height: `${steps.length * 100}vh` }}>
      {/* Sticky panel */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden bg-[#111] px-6 lg:px-24">

        {/* Top label */}
        <div className="mb-4 flex items-center gap-3">
          <div className="w-7 h-px bg-[#62ABAC]" />
          <span
            className="text-[#62ABAC] text-[10px] sm:text-xs font-medium tracking-[0.32em] uppercase"
            style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
          >
            How It Works
          </span>
        </div>

        {/* Tab toggle */}
        <div className="inline-flex gap-1 p-1 rounded-full border border-white/10 bg-white/[0.03] mb-14 sm:mb-16">
          {(["clients", "students"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => handleTabChange(t)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
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

        {/* Main step content */}
        <div className="w-full max-w-5xl flex items-start gap-16 lg:gap-24">

          {/* Left: text content */}
          <div ref={contentRef} className="flex-1 min-w-0">
            <div
              className="step-animate text-xs font-medium tracking-widest mb-4"
              style={{
                color: step.accent,
                fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
              }}
            >
              Step {step.num}
            </div>

            <h3
              className="step-animate text-4xl sm:text-5xl md:text-6xl font-normal text-white mb-6 leading-[1.05]"
              style={{
                fontFamily: "var(--font-dm-sans), 'DM Sans', serif",
                letterSpacing: "-0.02em",
              }}
            >
              {step.title}
            </h3>

            <p
              className="step-animate text-white/55 text-base sm:text-lg leading-relaxed max-w-lg"
              style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
            >
              {step.desc}
            </p>
          </div>

          {/* Right: progress indicator */}
          <div className="hidden lg:flex flex-col gap-5 flex-shrink-0">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className="flex items-center gap-3 group"
              >
                <div
                  className="transition-all duration-500"
                  style={{
                    width: i === activeStep ? "32px" : "16px",
                    height: "1px",
                    background:
                      i === activeStep
                        ? "#fff"
                        : i < activeStep
                        ? step.accent
                        : "rgba(255,255,255,0.15)",
                  }}
                />
                <div
                  className="w-[7px] h-[7px] rounded-full transition-all duration-500"
                  style={{
                    background:
                      i === activeStep
                        ? "#fff"
                        : i < activeStep
                        ? step.accent
                        : "rgba(255,255,255,0.2)",
                    transform:
                      i === activeStep ? "scale(1.3)" : "scale(1)",
                  }}
                />
                <span
                  className="text-xs transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                    color:
                      i === activeStep
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.2)",
                  }}
                >
                  {s.num}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 sm:w-72">
          <div className="w-full h-px bg-white/10 relative overflow-hidden rounded-full">
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
              style={{
                width: `${((activeStep + 1) / steps.length) * 100}%`,
                background: step.accent,
              }}
            />
          </div>
          <div
            className="text-center mt-3 text-white/25 text-[10px] tracking-widest"
            style={{ fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace" }}
          >
            {activeStep + 1} / {steps.length}
          </div>
        </div>

        {/* Large background step number */}
        <div
          className="absolute right-0 bottom-0 text-[25vw] font-bold leading-none select-none pointer-events-none overflow-hidden"
          style={{
            fontFamily: "var(--font-dm-sans), 'DM Sans', serif",
            color: "rgba(223, 223, 223, 0.07)",
          }}
          aria-hidden
        >
          {step.num}
        </div>
      </div>
    </div>
  );
};

export default HowHustlrWorks;
