"use client";
import { useEffect, useRef } from "react";

/**
 * Premium custom cursor: a lagging ring + instant dot.
 * mix-blend-mode: difference so it inverts on light elements.
 */
const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);

  useEffect(() => {
    // Only desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let gsapModule: typeof import("gsap") | undefined;

    const init = async () => {
      gsapModule = await import("gsap");
      const { gsap } = gsapModule;

      // Start off-screen
      gsap.set([ring, dot], { xPercent: -50, yPercent: -50, opacity: 0 });

      const xTo = gsap.quickTo(ring, "x", {
        duration: 0.55,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(ring, "y", {
        duration: 0.55,
        ease: "power3.out",
      });

      const onMove = (e: MouseEvent) => {
        if (!visibleRef.current) {
          visibleRef.current = true;
          gsap.to([ring, dot], { opacity: 1, duration: 0.3 });
        }
        gsap.set(dot, { x: e.clientX, y: e.clientY });
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const onEnterLink = () => {
        gsap.to(ring, {
          scale: 1.6,
          borderColor: "rgba(98,171,172,0.9)",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, { scale: 0.4, duration: 0.2 });
      };

      const onLeaveLink = () => {
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(255,255,255,0.7)",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      };

      const attachLinkListeners = () => {
        document.querySelectorAll("a, button").forEach((el) => {
          el.addEventListener("mouseenter", onEnterLink);
          el.addEventListener("mouseleave", onLeaveLink);
        });
      };

      window.addEventListener("mousemove", onMove);
      attachLinkListeners();

      // Re-attach on route change
      const observer = new MutationObserver(attachLinkListeners);
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        window.removeEventListener("mousemove", onMove);
        observer.disconnect();
      };
    };

    let cleanupInner: (() => void) | undefined;
    init().then((fn) => {
      cleanupInner = fn;
    });
    return () => cleanupInner?.();
  }, []);

  return (
    <>
      {/* Ring — lags behind cursor */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-9 h-9 rounded-full border border-white/70"
        style={{ willChange: "transform" }}
      />
      {/* Dot — instant */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-[5px] h-[5px] rounded-full bg-white"
        style={{ willChange: "transform" }}
      />
    </>
  );
};

export default CustomCursor;
