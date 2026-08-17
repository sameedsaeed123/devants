"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Magnetic hover: the element leans toward the cursor and springs back on exit.
 * GSAP's "Hover Micro-interaction" preset, expressed with framer-motion springs.
 * Pointer listeners are skipped entirely on touch devices.
 */
export function Magnetic({
  children,
  className,
  strength = 0.32,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  /** 0 = no pull, 1 = element tracks the cursor exactly */
  strength?: number;
  as?: "div" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  // Slight counter-rotation sells the depth
  const rotateX = useTransform(springY, [-40, 40], [7, -7]);
  const rotateY = useTransform(springX, [-40, 40], [-7, 7]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const MotionTag = as === "span" ? motion.span : motion.div;

  return (
    <MotionTag
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY, rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("inline-block", className)}
    >
      {children}
    </MotionTag>
  );
}

/**
 * 3D card that tilts under the cursor. Used for service and stat cards —
 * gives the page real depth response without a WebGL context per card.
 */
export function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees */
  intensity?: number;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springX = useSpring(rotateX, { stiffness: 220, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 20 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * intensity * 2);
    rotateX.set((0.5 - py) * intensity * 2);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  const background = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(420px circle at ${gx}% ${gy}%, rgba(47,207,201,0.14), transparent 65%)`,
  );

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      className={cn("relative [perspective:1000px]", className)}
    >
      <motion.div
        aria-hidden="true"
        style={{ background }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  );
}
