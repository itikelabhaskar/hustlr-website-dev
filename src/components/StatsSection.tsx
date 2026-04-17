"use client";
import React, { useEffect, useRef } from "react";

const stats = [
  { value: 3000, suffix: "+", label: "Students Vetted" },
  { value: 5, prefix: "Top ", suffix: "%", label: "Acceptance Rate" },
  { value: 48, suffix: "hr", label: "Average Match Time" },
  { value: 1.5, prefix: "$", suffix: "T", label: "Industry We're Disrupting" },
];

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      // Animate the whole row in
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".stat-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // Count up numbers
      numbersRef.current.forEach((el, i) => {
        if (!el) return;
        const stat = stats[i];
        const isDecimal = stat.value % 1 !== 0;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              { val: 0 },
              {
                val: stat.value,
                duration: 1.6,
                ease: "power2.out",
                delay: i * 0.12,
                onUpdate: function () {
                  if (el) {
                    el.textContent = isDecimal
                      ? (this as any)._targets[0].val.toFixed(1)
                      : Math.floor((this as any)._targets[0].val).toString();
                  }
                },
              }
            );
          },
          once: true,
        });
      });
    };

    init();
  }, []);

  return (
    <div ref={sectionRef} className="w-full border-y border-white/[0.06] py-8 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="stat-item opacity-0 flex flex-col items-center lg:items-start group"
          >
            <div
              className="text-3xl sm:text-4xl font-normal text-white mb-1"
              style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.02em" }}
            >
              {stat.prefix && (
                <span className="text-[#62ABAC]">{stat.prefix}</span>
              )}
              <span
                ref={(el) => {
                  numbersRef.current[i] = el;
                }}
              >
                {stat.value % 1 !== 0
                  ? stat.value.toFixed(1)
                  : stat.value.toString()}
              </span>
              {stat.suffix && (
                <span className="text-[#62ABAC]">{stat.suffix}</span>
              )}
            </div>
            <div
              className="text-white/40 text-xs sm:text-sm tracking-wide"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
