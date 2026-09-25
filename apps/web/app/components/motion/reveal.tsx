import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "~/lib/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms when used inside a staggered group */
  delay?: number;
  /** Start visible (above-the-fold / hero). Default: wait for scroll. */
  instant?: boolean;
};

/**
 * Scroll-triggered enter: opacity + slight rise, strong ease-out.
 * Disconnects after first reveal. Honors prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  instant = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(instant);

  useEffect(() => {
    if (instant || visible) return;
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [instant, visible]);

  const style: CSSProperties | undefined =
    delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "reveal-in", className)}
      style={style}
    >
      {children}
    </div>
  );
}

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  /** Gap between sibling reveals in ms */
  step?: number;
};

/** Wraps a list/grid and staggers each direct child on scroll. */
export function RevealStagger({
  children,
  className,
  step = 60,
}: RevealStaggerProps) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {items.map((child, index) => (
        <Reveal key={index} delay={index * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
