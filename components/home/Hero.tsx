"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Shield, Eye, Wifi, Smartphone, ChevronDown } from "lucide-react";
import { WHATSAPP_LINKS } from "@/lib/constants";

const TOTAL_FRAMES = 102;

function getFramePath(index: number): string {
  return `/frames/frame- (${index + 1}).webp`;
}

const FEATURES = [
  { icon: Shield, label: "24/7 Protection" },
  { icon: Eye, label: "4K Ultra HD" },
  { icon: Wifi, label: "Smart Connect" },
  { icon: Smartphone, label: "Remote Access" },
];

const BTN_PRIMARY =
  "inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-red-700 hover:scale-[1.02] active:scale-95 focus-visible:outline-2 focus-visible:outline-white";

const BTN_OUTLINE =
  "inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-white";

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
) {
  const imgRatio = img.width / img.height;
  const canvasRatio = width / height;
  let dw = width;
  let dh = height;
  let dx = 0;
  let dy = 0;

  if (imgRatio > canvasRatio) {
    dw = height * imgRatio;
    dx = (width - dw) / 2;
  } else {
    dh = width / imgRatio;
    dy = (height - dh) / 2;
  }

  ctx.drawImage(img, dx, dy, dw, dh);
}

function HeroSection({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute inset-0 z-10 flex items-center justify-center pt-17 sm:pt-19 transition-all duration-700 ease-out ${
        active
          ? "opacity-100 visible pointer-events-auto translate-y-0"
          : "opacity-0 invisible pointer-events-none translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const lastImgRef = useRef<HTMLImageElement | null>(null);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Active section: 0=gap, 1=headline, 2=tagline, 3=features, 4=cta
  const [activeSection, setActiveSection] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Update active section based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    let next = 0;
    if (progress < 0.25) next = 1;
    else if (progress >= 0.30 && progress < 0.53) next = 2;
    else if (progress >= 0.58 && progress < 0.78) next = 3;
    else if (progress >= 0.83) next = 4;

    setActiveSection((prev) => (prev !== next ? next : prev));
  });

  /* ─── Render Canvas Frame ─────────────────────────────── */
  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index] ?? lastImgRef.current;
    if (!img) return;
    lastImgRef.current = img;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    drawCover(ctx, img, canvas.width, canvas.height);
  }, []);

  /* ─── Progressive Frame Preload ────────────────────────── */
  useEffect(() => {
    let cancelled = false;

    // Load initial frame with top priority
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      if (cancelled) return;
      imagesRef.current[0] = firstImg;
      renderFrame(0);
    };

    // Preload remaining frames in background
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (!cancelled) imagesRef.current[i] = img;
      };
    }

    return () => {
      cancelled = true;
    };
  }, [renderFrame]);

  /* ─── HiDPI Resize Handler ─────────────────────────────── */
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  /* ─── Scroll to Frame (RAF Throttled) ──────────────────── */
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.min(Math.round(latest), TOTAL_FRAMES - 1);
    if (idx !== currentFrameRef.current) {
      currentFrameRef.current = idx;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => renderFrame(idx));
    }
  });

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative z-1 h-[500vh] -mt-17 sm:-mt-19">
      {/* Scroll navigation targets */}
      <div id="top" className="absolute left-0 top-0 h-px w-px pointer-events-none invisible" />
      <div id="gallery" className="absolute left-0 top-[34%] h-px w-px pointer-events-none invisible" />
      <div id="services" className="absolute left-0 top-[66%] h-px w-px pointer-events-none invisible" />
      <div id="upgrade" className="absolute left-0 top-[88%] h-px w-px pointer-events-none invisible" />

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />

        {/* ── Section 1: Headline ───────────────────────── */}
        <HeroSection active={activeSection === 1}>
          <div className="max-w-200 px-6 text-center">
            <div className="mb-7 inline-flex items-center gap-2 font-mono text-xs font-medium tracking-widest text-white/70 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-sm shadow-red-500 animate-pulse" />
              Uniq CCTV
            </div>

            <h1 className="font-space mb-6 text-4xl sm:text-6xl md:text-7xl font-bold leading-none tracking-tight text-white">
              See Everything.
              <br />
              <span className="bg-gradient-to-br from-red-500 via-red-400 to-rose-300 bg-clip-text text-transparent">
                Secure Everything.
              </span>
            </h1>

            <p className="text-xs font-medium tracking-widest text-white/60 uppercase">
              Scroll to explore
            </p>
          </div>
        </HeroSection>

        {/* ── Section 2: Tagline & CTAs ─────────────────── */}
        <HeroSection active={activeSection === 2}>
          <div className="max-w-145 px-6 text-center">
            <p className="font-space mb-9 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed text-white/90">
              Professional CCTV installation &amp; smart surveillance
              <br />
              for homes and businesses in Sainthamaruthu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WHATSAPP_LINKS.quote}
                target="_blank"
                rel="noopener noreferrer"
                className={BTN_PRIMARY}
              >
                Get a Free Quote
              </a>
              <a href="#services" className={BTN_OUTLINE}>
                Our Services
              </a>
            </div>
          </div>
        </HeroSection>

        {/* ── Section 3: Feature Strip ──────────────────── */}
        <HeroSection active={activeSection === 3}>
          <div className="w-full max-w-3xl px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden bg-white/10 shadow-2xl">
              {FEATURES.map((feature) => (
                <div
                  key={feature.label}
                  className="group flex flex-col items-center gap-3 p-5 sm:p-6 bg-black/40 backdrop-blur-md transition-colors hover:bg-black/20"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-red-400 transition-transform group-hover:scale-110 group-hover:bg-primary/20">
                    <feature.icon size={20} />
                  </div>
                  <span className="font-space text-xs sm:text-sm font-semibold text-white/80 text-center">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </HeroSection>

        {/* ── Section 4: Final CTA ──────────────────────── */}
        <HeroSection active={activeSection === 4}>
          <div className="px-6 text-center">
            <h2 className="font-space mb-7 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
              Ready to upgrade your security?
            </h2>
            <a
              href={WHATSAPP_LINKS.consultation}
              target="_blank"
              rel="noopener noreferrer"
              className={`${BTN_PRIMARY} px-10 py-3.5 text-base`}
            >
              Talk to an Expert
            </a>
          </div>
        </HeroSection>

        {/* ── Scroll Hint ───────────────────────────────── */}
        <a
          href="#gallery"
          aria-label="Scroll to explore features"
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-white/60 transition-all hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white ${
            activeSection === 1 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>
    </div>
  );
}
