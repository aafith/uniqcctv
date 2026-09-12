"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import "./Hero.css";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Shield, Eye, Wifi, Smartphone, ChevronDown } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   FRAME CONFIGURATION
   Replace these paths with your actual frame image paths.
   Images should be sequential frames (frame- (1).webp, frame- (2).webp, etc.)
   ───────────────────────────────────────────────────────────── */
const TOTAL_FRAMES = 102;

/**
 * Generate the path for a given frame index.
 * Matches naming: frame- (1).webp, frame- (2).webp, ... frame- (102).webp
 */
function getFramePath(index: number): string {
  return `/frames/frame- (${index + 1}).webp`;
}

/* ─── Feature cards data ──────────────────────────────────── */
const FEATURES = [
  {
    icon: Shield,
    title: "24/7 Protection",
    description: "Round-the-clock surveillance with intelligent alerts",
  },
  {
    icon: Eye,
    title: "4K Ultra HD",
    description: "Crystal clear footage, day and night vision",
  },
  {
    icon: Wifi,
    title: "Smart Connect",
    description: "Seamless wireless setup with cloud storage",
  },
  {
    icon: Smartphone,
    title: "Remote Access",
    description: "Monitor your property from anywhere in the world",
  },
];

/* ═══════════════════════════════════════════════════════════════
   HERO COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [usePlaceholder, setUsePlaceholder] = useState(false);
  const currentFrameRef = useRef(0);

  /* ─── Scroll tracking ──────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to frame index
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Content opacity transforms for staggered reveals
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 1]);
  const headlineY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.92]);

  // Feature cards fade in as you scroll deeper
  const featuresOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const featuresY = useTransform(scrollYProgress, [0.25, 0.4], [80, 0]);

  // Bottom CTA
  const ctaOpacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.6, 0.75], [40, 0]);

  // Scroll indicator fades out
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  /* ─── Preload images / fallback to placeholder ─────────── */
  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loaded = 0;
    let failed = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);

      img.onload = () => {
        if (cancelled) return;
        loaded++;
        images[i] = img;
        if (loaded + failed === TOTAL_FRAMES) {
          if (failed > TOTAL_FRAMES * 0.5) {
            // More than half failed — use placeholder gradient
            setUsePlaceholder(true);
          }
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        if (cancelled) return;
        failed++;
        if (loaded + failed === TOTAL_FRAMES) {
          if (failed > TOTAL_FRAMES * 0.5) {
            setUsePlaceholder(true);
          }
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
    }

    return () => {
      cancelled = true;
    };
  }, []);

  /* ─── Draw current frame on canvas ────────────────────── */
  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (usePlaceholder) {
        // Draw animated gradient placeholder
        const hue1 = (index / TOTAL_FRAMES) * 60 + 200; // blue to purple range
        const hue2 = hue1 + 40;
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, `hsl(${hue1}, 35%, 8%)`);
        gradient.addColorStop(0.5, `hsl(${(hue1 + hue2) / 2}, 30%, 12%)`);
        gradient.addColorStop(1, `hsl(${hue2}, 40%, 6%)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw subtle grid pattern
        ctx.strokeStyle = `rgba(255, 255, 255, 0.03)`;
        ctx.lineWidth = 1;
        const gridSize = 60;
        const offsetX = (index * 2) % gridSize;
        const offsetY = (index * 1.5) % gridSize;
        for (let x = -gridSize + offsetX; x < canvas.width + gridSize; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = -gridSize + offsetY; y < canvas.height + gridSize; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        // Draw radial glow
        const glowX = canvas.width * (0.3 + 0.4 * (index / TOTAL_FRAMES));
        const glowY = canvas.height * 0.4;
        const glowGrad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, canvas.width * 0.5);
        glowGrad.addColorStop(0, `hsla(${hue1 + 20}, 60%, 30%, 0.15)`);
        glowGrad.addColorStop(1, `hsla(${hue1 + 20}, 60%, 30%, 0)`);
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        return;
      }

      const img = imagesRef.current[index];
      if (!img) return;

      // Cover-fit the image
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (imgRatio > canvasRatio) {
        drawH = canvas.height;
        drawW = drawH * imgRatio;
        drawX = (canvas.width - drawW) / 2;
        drawY = 0;
      } else {
        drawW = canvas.width;
        drawH = drawW / imgRatio;
        drawX = 0;
        drawY = (canvas.height - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    },
    [usePlaceholder]
  );

  /* ─── Resize canvas to match viewport ─────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      // Adjust canvas dimensions for drawing (use CSS dimensions)
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderFrame]);

  /* ─── Update frame on scroll ──────────────────────────── */
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.min(Math.round(latest), TOTAL_FRAMES - 1);
    if (index !== currentFrameRef.current) {
      currentFrameRef.current = index;
      renderFrame(index);
    }
  });

  // Initial render
  useEffect(() => {
    if (imagesLoaded || usePlaceholder) {
      renderFrame(0);
    }
  }, [imagesLoaded, usePlaceholder, renderFrame]);

  // Draw placeholder immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!imagesLoaded) {
        setUsePlaceholder(true);
        setImagesLoaded(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [imagesLoaded]);

  return (
    <>
      {/* Scroll container — tall enough for the scroll-driven animation */}
      <div ref={containerRef} className="hero-scroll-container">
        {/* Sticky viewport — pinned while scrolling through the container */}
        <div className="hero-sticky">
          {/* Canvas for frame sequence */}
          <canvas
            ref={canvasRef}
            className="hero-canvas"
            aria-hidden="true"
          />

          {/* Dark overlay for text readability */}
          <div className="hero-overlay" />

          {/* ─── Headline section (glassmorphism) ─────────── */}
          <motion.div
            className="hero-content"
            style={{
              opacity: headlineOpacity,
              y: headlineY,
              scale: headlineScale,
            }}
          >
            <div className="hero-glass-card hero-glass-card--headline">
              <motion.span
                className="hero-badge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="hero-badge__dot" />
                Sainthamaruthu&apos;s Trusted CCTV Partner
              </motion.span>

              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                See Everything.
                <br />
                <span className="hero-title--accent">Secure Everything.</span>
              </motion.h1>

              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Professional CCTV installation, smart surveillance solutions,
                and 24/7 monitoring for your home and business.
              </motion.p>

              <motion.div
                className="hero-cta-group"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <a href="#contact" className="hero-btn hero-btn--primary">
                  Get a Free Quote
                </a>
                <a href="#services" className="hero-btn hero-btn--glass">
                  Our Services
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* ─── Feature cards (glassmorphism, appear on scroll) ── */}
          <motion.div
            className="hero-features"
            style={{ opacity: featuresOpacity, y: featuresY }}
          >
            <div className="hero-features__grid">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  className="hero-feature-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  <div className="hero-feature-card__icon">
                    <feature.icon size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="hero-feature-card__title">{feature.title}</h3>
                  <p className="hero-feature-card__desc">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ─── Bottom CTA (appears near end) ───────────── */}
          <motion.div
            className="hero-bottom-cta"
            style={{ opacity: ctaOpacity, y: ctaY }}
          >
            <div className="hero-glass-card hero-glass-card--bottom">
              <p className="hero-bottom-cta__text">
                Ready to upgrade your security?
              </p>
              <a href="#contact" className="hero-btn hero-btn--primary hero-btn--lg">
                Talk to an Expert
              </a>
            </div>
          </motion.div>

          {/* ─── Scroll indicator ────────────────────────── */}
          <motion.div
            className="hero-scroll-indicator"
            style={{ opacity: scrollIndicatorOpacity }}
          >
            <span className="hero-scroll-indicator__text">Scroll to explore</span>
            <ChevronDown size={18} className="hero-scroll-indicator__icon" />
          </motion.div>
        </div>
      </div>
    </>
  );
}