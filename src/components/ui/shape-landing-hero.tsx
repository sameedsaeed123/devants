"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating capsule shape with a two-stage animation:
 * entry (drop + settle into `rotate`) then an infinite vertical drift.
 * Re-themed from the original indigo/rose palette to the DevAnts teal ramp.
 */
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  y = 15,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  y?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
      aria-hidden="true"
    >
      <motion.div
        animate={{ y: [0, y, 0] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-teal-300/[0.14]",
            "shadow-[0_8px_32px_0_rgba(47,207,201,0.10)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(47,207,201,0.16),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function HeroGeometric({
  badge = "DevAnts — Product Engineering Studio",
  title1 = "We build software",
  title2 = "that carries weight",
  description = "Web platforms, mobile apps and automation for teams who need to ship something real — not a prototype that dies in staging.",
  rotate = 12,
  width = 600,
  height = 140,
  y = 15,
  children,
  className,
}: {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: string;
  rotate?: number;
  width?: number;
  height?: number;
  y?: number;
  /** Slot for CTAs / stats rendered under the description */
  children?: React.ReactNode;
  className?: string;
}) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  return (
    <div
      className={cn(
        "relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-ink-950",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/[0.07] via-transparent to-teal-800/[0.10] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={width}
          height={height}
          rotate={rotate}
          y={y}
          gradient="from-teal-500/[0.16]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          y={y}
          gradient="from-teal-700/[0.18]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          y={y}
          gradient="from-teal-300/[0.14]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          y={y}
          gradient="from-teal-400/[0.16]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          y={y}
          gradient="from-teal-200/[0.12]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container-page">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/[0.04] border border-teal-300/[0.12] mb-8 md:mb-12"
          >
            <Circle className="h-2 w-2 fill-teal-400/90 text-teal-400/90" aria-hidden="true" />
            <span className="text-sm text-teal-100/70 tracking-wide">{badge}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-display-xl font-bold mb-6 md:mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/75">
                {title1}
              </span>
              <br />
              <span className="text-gradient-brand">{title2}</span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed font-light tracking-wide max-w-2xl mx-auto">
              {description}
            </p>
          </motion.div>

          {children ? (
            <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible">
              {children}
            </motion.div>
          ) : null}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/80 pointer-events-none" />
    </div>
  );
}

export { HeroGeometric, ElegantShape };

export default HeroGeometric;
