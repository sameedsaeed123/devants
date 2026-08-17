"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: a small dot with a lagging teal ring, plus a label when
 * hovering an element carrying data-cursor="…".
 * Canvas-free (two DOM nodes on transforms) and mouse-only — touch devices
 * keep the native behaviour, and reduced-motion skips it entirely.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduceMotion) return;

    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    function onMove(event: MouseEvent) {
      mouseX = event.clientX;
      mouseY = event.clientY;

      const target = (event.target as HTMLElement | null)?.closest?.(
        "[data-cursor], a, button",
      ) as HTMLElement | null;

      if (!target) {
        setActive(false);
        setLabel("");
        return;
      }
      setActive(true);
      setLabel(target.dataset.cursor ?? "");
    }

    let frame = 0;
    function tick() {
      // Ring trails the dot — the lag is what makes it feel physical
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={dotRef}
        className="absolute size-1.5 rounded-full bg-teal-300 transition-opacity duration-200"
      />
      <div
        ref={ringRef}
        className="absolute flex items-center justify-center rounded-full border border-teal-300/50 transition-[width,height,background-color,border-color] duration-300 ease-[var(--ease-out-expo)]"
        style={{
          width: active ? (label ? 84 : 52) : 30,
          height: active ? (label ? 84 : 52) : 30,
          backgroundColor: active ? "rgba(47,207,201,0.10)" : "transparent",
        }}
      >
        {label ? (
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-teal-100">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default Cursor;
