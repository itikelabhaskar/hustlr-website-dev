"use client";
import React, { useEffect, useRef } from "react";

// ─── Three.js Particle Canvas ─────────────────────────────────────────────────

const ParticleCanvas = ({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let disposeFn: (() => void) | undefined;

    const init = async () => {
      const THREE = await import("three");
      const W = canvas.offsetWidth || window.innerWidth;
      const H = canvas.offsetHeight || window.innerHeight;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W / H, 1, 2000);
      camera.position.z = 650;

      const COUNT = 160;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(COUNT * 3);
      const col = new Float32Array(COUNT * 3);
      const origY: number[] = [];

      const palette: [number, number, number][] = [
        [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1],
        [0.384, 0.671, 0.675],
        [0.647, 0.749, 0.322],
        [0.8, 0.67, 0.3],
      ];

      for (let i = 0; i < COUNT; i++) {
        const x = (Math.random() - 0.5) * 1600;
        const y = (Math.random() - 0.5) * 1000;
        const z = (Math.random() - 0.5) * 600;
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
        origY.push(y);
        const c = palette[Math.floor(Math.random() * palette.length)];
        col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
      }

      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3));

      const mat = new THREE.PointsMaterial({
        size: 2.2, vertexColors: true, transparent: true,
        opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false,
      });

      const points = new THREE.Points(geo, mat);
      scene.add(points);

      const mouse = { x: 0, y: 0 };
      const onMouse = (e: MouseEvent) => {
        mouse.x = e.clientX / window.innerWidth - 0.5;
        mouse.y = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("mousemove", onMouse);

      const onResize = () => {
        const w = canvas.offsetWidth, h = canvas.offsetHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      // Particles fade in slowly with the reveal
      let targetOpacity = 0;
      setTimeout(() => { targetOpacity = 0.42; }, 1800);

      let t = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.0018;
        mat.opacity += (targetOpacity - mat.opacity) * 0.012;
        const arr = geo.attributes.position.array as Float32Array;
        for (let i = 0; i < COUNT; i++) {
          arr[i * 3 + 1] = origY[i] + Math.sin(t + i * 0.38) * 7;
        }
        geo.attributes.position.needsUpdate = true;
        points.rotation.y = t * 0.035;
        camera.position.x += (mouse.x * 55 - camera.position.x) * 0.04;
        camera.position.y += (-mouse.y * 30 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        renderer.dispose(); geo.dispose(); mat.dispose();
      };
    };

    init().then(fn => { disposeFn = fn; });
    return () => disposeFn?.();
  }, [canvasRef]);

  return null;
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HomepageHero = () => {
  const sectionRef   = useRef<HTMLElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const glowPrimaryRef   = useRef<HTMLDivElement>(null);
  const glowSecondaryRef = useRef<HTMLDivElement>(null);
  const tagRef       = useRef<HTMLDivElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const proofRef     = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const run = async () => {
      const { gsap } = await import("gsap");

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // ── 0. Atmospheric glow — fade in then breathe + drift ─
      if (glowPrimaryRef.current && glowSecondaryRef.current) {
        // Fade in on page load (starts at 0, arrives at full around t=1.8s)
        gsap.fromTo(
          [glowPrimaryRef.current, glowSecondaryRef.current],
          { opacity: 0 },
          { opacity: 1, duration: 2.8, ease: "power2.out", delay: 0.6 }
        );

        // Primary glow — slow breathe (opacity) + gentle drift (x/y)
        gsap.to(glowPrimaryRef.current, {
          opacity: 0.55,
          duration: 5.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 3.2,
        });
        gsap.to(glowPrimaryRef.current, {
          x: 38,
          y: -24,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0,
        });

        // Secondary glow — opposite phase so they orbit each other
        gsap.to(glowSecondaryRef.current, {
          opacity: 0.35,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 3.8,
        });
        gsap.to(glowSecondaryRef.current, {
          x: -28,
          y: 32,
          duration: 11,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0,
        });
      }

      // ── 1. Drawing line across screen ──────────────────────
      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.9, ease: "power3.inOut" },
          0.2
        ).to(
          lineRef.current,
          { opacity: 0, duration: 0.4, ease: "power2.in" },
          1.25
        );
      }

      // ── 2. Label ───────────────────────────────────────────
      if (tagRef.current) {
        tl.fromTo(
          tagRef.current,
          { clipPath: "inset(0 0 100% 0)", y: 8 },
          { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.55, ease: "power2.out" },
          1.05
        );
      }

      // ── 3. Headline words — clip-path curtain reveal ───────
      if (headingRef.current) {
        const wrappers = headingRef.current.querySelectorAll(".word-wrap");
        tl.fromTo(
          wrappers,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            stagger: 0.085,
            duration: 0.75,
            ease: "power3.out",
          },
          1.2
        );
      }

      // ── 4. Subtitle ────────────────────────────────────────
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          1.85
        );
      }

      // ── 5. CTA buttons ─────────────────────────────────────
      if (ctaRef.current) {
        const btns = ctaRef.current.querySelectorAll(".hero-btn");
        tl.fromTo(
          btns,
          { opacity: 0, y: 14, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6 },
          2.1
        );
      }

      // ── 6. Social proof ────────────────────────────────────
      if (proofRef.current) {
        tl.fromTo(
          proofRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          2.45
        );
      }

      // ── 7. Scroll cue ──────────────────────────────────────
      if (scrollCueRef.current) {
        tl.fromTo(
          scrollCueRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          2.7
        );
      }

      // ── 8. Parallax — pinned depth reveal ──────────────────
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      // Single pinned timeline: section stays fixed while scroll progress
      // drives each layer at a different rate — canvas zooms in (deepest),
      // glows drift and expand (mid), content rushes forward and fades (foreground).
      const parallaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: "+=90%",
          scrub: 0.9,
          anticipatePin: 1,
        },
      });

      // Deepest — canvas very slowly zooms in (sense of infinite depth)
      if (canvasRef.current) {
        parallaxTl.to(canvasRef.current, { scale: 1.09, ease: "none" }, 0);
      }
      // Mid — glow blobs drift upward and slightly expand (no opacity — breathing anim owns that)
      if (glowPrimaryRef.current) {
        parallaxTl.to(glowPrimaryRef.current, { y: -100, scale: 1.25, ease: "none" }, 0);
      }
      if (glowSecondaryRef.current) {
        parallaxTl.to(glowSecondaryRef.current, { y: -70, scale: 1.15, ease: "none" }, 0);
      }
      // Foreground — content accelerates upward and fades (strongest motion = closest)
      if (contentRef.current) {
        parallaxTl.to(contentRef.current, { y: -180, opacity: 0, ease: "none" }, 0);
      }
    };

    run();
  }, []);

  const renderLine = (text: string) =>
    text.split(" ").map((word, i) => (
      // Outer overflow:hidden mask, inner word slides up
      <span
        key={i}
        className="word-wrap inline-block overflow-hidden mr-[0.22em] last:mr-0 align-bottom"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <span className="inline-block">{word}</span>
      </span>
    ));

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center overflow-hidden bg-[#0e0e0e]">
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
      <ParticleCanvas canvasRef={canvasRef} />

      {/* ── Atmospheric glow blobs ── */}
      {/* Primary — large teal glow, left-center */}
      <div
        ref={glowPrimaryRef}
        className="absolute pointer-events-none"
        style={{
          width: "72vw",
          height: "65vh",
          left: "-8%",
          top: "12%",
          background:
            "radial-gradient(ellipse at 40% 50%, rgba(98,171,172,0.18) 0%, rgba(98,171,172,0.07) 45%, transparent 72%)",
          filter: "blur(72px)",
          borderRadius: "50%",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />
      {/* Secondary — smaller, slightly cooler blue offset */}
      <div
        ref={glowSecondaryRef}
        className="absolute pointer-events-none"
        style={{
          width: "40vw",
          height: "40vh",
          left: "18%",
          top: "35%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(80,140,200,0.10) 0%, rgba(98,171,172,0.05) 50%, transparent 75%)",
          filter: "blur(90px)",
          borderRadius: "50%",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />

      {/* Vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(14,14,14,0.7) 100%)",
        }}
      />
      {/* Right-side fade (prevents particles bleeding into content) */}
      <div
        className="absolute inset-y-0 right-0 w-1/3 pointer-events-none"
        style={{ background: "linear-gradient(to left, rgba(14,14,14,0.6), transparent)" }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0e0e0e)" }}
      />

      {/* ── Drawing line ── */}
      <div
        ref={lineRef}
        className="absolute left-0 right-0 top-1/2 h-px pointer-events-none z-20"
        style={{
          background: "linear-gradient(to right, transparent, rgba(98,171,172,0.6), rgba(165,191,82,0.4), transparent)",
          transform: "scaleX(0)",
          transformOrigin: "left center",
        }}
      />

      {/* ── Content ── */}
      <div ref={contentRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-24">

        {/* Label */}
        <div
          ref={tagRef}
          className="mb-8 flex items-center gap-3"
          style={{ clipPath: "inset(0 0 100% 0)" }}
        >
          <div className="w-7 h-px bg-[#62ABAC]" />
          <span
            className="text-[#62ABAC] text-[10px] sm:text-xs font-medium tracking-[0.32em] uppercase"
            style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
          >
            Freelancing for the top 5% of GenZ talent
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headingRef}
          className="mb-8 leading-[1.04]"
          style={{
            fontFamily: "var(--font-the-seasons), 'The Seasons', serif",
            fontSize: "clamp(2rem, 4.8vw, 4.6rem)",
            letterSpacing: "-0.025em",
            fontWeight: 300,
            color: "#fff",
          }}
        >
          {renderLine("The New Standard")}
          <br />
          {renderLine("For Hiring Student Talent")}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-white/55 max-w-lg mb-11 leading-relaxed"
          style={{
            fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
            fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
            opacity: 0,
          }}
        >
          The first freelance network built on actual standards — every student
          rigorously vetted, every client verified, every match made in hours,
          not days. <br /> Matched by AI, guaranteed by design.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <Link
            href="/get-started?type=client"
            className="hero-btn inline-block px-8 py-[14px] bg-white text-[#0e0e0e] font-semibold rounded-full text-sm tracking-wide hover:bg-[#62ABAC] hover:text-white hover:scale-[1.04] hover:shadow-[0_0_28px_rgba(98,171,172,0.4)] transition-all duration-300"
            style={{
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              opacity: 0,
            }}
          >
            Access Elite Talent
          </Link>
          <Link
            href="/get-started?type=student"
            className="hero-btn inline-block px-8 py-[14px] border border-white/25 text-white font-semibold rounded-full text-sm tracking-wide hover:border-white/60 hover:bg-white/[0.06] hover:scale-[1.04] hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all duration-300"
            style={{
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              opacity: 0,
            }}
          >
            Apply for the Top 5%
          </Link>
        </div>

        {/* Social proof dots */}
        <div
          ref={proofRef}
          className="mt-12 flex max-w-[22rem] flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center sm:max-w-none sm:justify-start sm:gap-5 sm:text-left"
          style={{ opacity: 0 }}
        >
          {["3,000+ students vetted", "Top 5% only", "48hr avg. match"].map((item, i) => (
            <React.Fragment key={item}>
              <span
                className="text-[11px] text-white/30 sm:text-xs"
                style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
              >
                {item}
              </span>
              {i < 2 && <span className="w-[3px] h-[3px] rounded-full bg-white/15 hidden sm:block" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-9 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        style={{ opacity: 0 }}
      >
        <span
          className="text-white/20 text-[9px] tracking-[0.4em] uppercase"
          style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
        >
          Scroll
        </span>
        <div className="w-px h-9 bg-gradient-to-b from-white/20 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default HomepageHero;
