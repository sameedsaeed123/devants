import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * DevAnts lockup. `mark` is the ant-chevron glyph alone (nav, favicon-ish uses);
 * `horizontal` is the glyph plus wordmark.
 */
export function Logo({
  variant = "horizontal",
  className,
  priority = false,
  href = "/",
}: {
  variant?: "horizontal" | "mark" | "stacked";
  className?: string;
  priority?: boolean;
  href?: string | null;
}) {
  const sources = {
    horizontal: { src: "/brand/devants-horizontal.png", width: 2000, height: 594 },
    mark: { src: "/brand/devants-mark.png", width: 1646, height: 2568 },
    stacked: { src: "/brand/devants-stacked.png", width: 3760, height: 2588 },
  } as const;

  const source = sources[variant];

  const image = (
    <Image
      src={source.src}
      alt="DevAnts"
      width={source.width}
      height={source.height}
      priority={priority}
      className={cn("h-full w-auto object-contain", className)}
    />
  );

  if (!href) return image;

  return (
    <Link
      href={href}
      aria-label="DevAnts — home"
      className="group flex h-full items-center transition-opacity duration-200 hover:opacity-80"
      data-cursor="Home"
    >
      {image}
    </Link>
  );
}
