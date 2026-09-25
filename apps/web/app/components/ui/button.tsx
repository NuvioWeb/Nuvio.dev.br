import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "~/lib/cn";

const buttonVariants = cva(
  [
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[var(--nuvio-radius-sm)] text-sm font-semibold",
    "transition-[color,background-color,border-color,box-shadow,transform,filter] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "motion-safe:active:scale-[0.97]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--nuvio-gold)] text-[var(--nuvio-ink)]",
          "shadow-[inset_0_1px_0_color-mix(in_oklab,white_35%,transparent)]",
          "hover:brightness-105",
        ].join(" "),
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/80",
        ].join(" "),
        outline: [
          "border border-border bg-transparent text-foreground",
          "hover:border-[var(--nuvio-gold)] hover:bg-[var(--nuvio-gold)]/10",
        ].join(" "),
        ghost: ["text-foreground", "hover:bg-muted hover:text-foreground"].join(
          " ",
        ),
        link: [
          "text-foreground underline-offset-4 dark:text-[var(--nuvio-gold)]",
          "hover:underline hover:opacity-90",
        ].join(" "),
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10 hover:bg-muted hover:text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
