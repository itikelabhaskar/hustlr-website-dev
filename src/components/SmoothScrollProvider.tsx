"use client";
import { useEffect } from "react";

/**
 * Sets up Lenis smooth scroll + GSAP ScrollTrigger sync.
 * Renders nothing — pure side-effect provider.
 */
const SmoothScrollProvider = () => {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const { default: Lenis } = await import("lenis");
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
      });

      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      return () => {
        lenis.destroy();
        gsap.ticker.remove(tick);
      };
    };

    init().then((fn) => {
      cleanup = fn;
    });

    return () => {
      cleanup?.();
    };
  }, []);

  return null;
};

export default SmoothScrollProvider;
