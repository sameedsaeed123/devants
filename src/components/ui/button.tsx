import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 ease-[var(--ease-out-expo)] cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-teal-400 text-ink-950 hover:bg-teal-300 shadow-[0_0_0_0_rgba(47,207,201,0.4)] hover:shadow-[0_8px_30px_-6px_rgba(47,207,201,0.55)] hover:-translate-y-0.5",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:border-teal-400/60 hover:bg-teal-400/[0.06] hover:-translate-y-0.5",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-teal-400/[0.06]",
        subtle: "bg-surface-raised text-foreground border border-border hover:border-border-strong",
        destructive: "bg-destructive/15 text-destructive border border-destructive/30 hover:bg-destructive/25",
      },
      size: {
        sm: "h-9 px-4 text-sm [&_svg]:size-4",
        // 44px min touch target
        md: "h-11 px-6 text-sm [&_svg]:size-4",
        lg: "h-13 px-8 text-base [&_svg]:size-5",
        icon: "size-11 [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>;

/** Same visual language as Button, but renders a real anchor for navigation. */
export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
