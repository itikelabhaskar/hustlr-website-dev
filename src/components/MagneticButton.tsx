"use client";
import React, { useEffect, useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
}

/**
 * Wraps any child and makes it "magnetically" attract to the cursor.
 * Uses GSAP quickTo for spring-like elasticity.
 */
const MagneticButton = ({ children, strength = 0.28 }: MagneticButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const xToRef = useRef<(v: number) => void>(() => {});
  const yToRef = useRef<(v: number) => void>(() => {});

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const init = async () => {
      const { gsap } = await import("gsap");
      if (!containerRef.current) return;

      xToRef.current = gsap.quickTo(containerRef.current, "x", {
        duration: 0.9,
        ease: "elastic.out(1, 0.35)",
      }) as (v: number) => void;

      yToRef.current = gsap.quickTo(containerRef.current, "y", {
        duration: 0.9,
        ease: "elastic.out(1, 0.35)",
      }) as (v: number) => void;
    };

    init();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    xToRef.current((e.clientX - cx) * strength);
    yToRef.current((e.clientY - cy) * strength);
  };

  const handleMouseLeave = () => {
    xToRef.current(0);
    yToRef.current(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
    >
      {children}
    </div>
  );
};

export default MagneticButton;
