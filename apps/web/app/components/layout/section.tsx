import * as React from "react";
import { Reveal } from "~/components/motion/reveal";
import { cn } from "~/lib/cn";

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

export function Section({
  className,
  children,
  reveal = true,
  ...props
}: React.ComponentProps<"section"> & { reveal?: boolean }) {
  return (
    <section className={cn("py-20 sm:py-24", className)} {...props}>
      {reveal ? <Reveal>{children}</Reveal> : children}
    </section>
  );
}

export function SectionHeading({
  title,
  description,
  align = "center",
  tone = "default",
}: {
  /** @deprecated Eyebrows removed — craft floor ban. Kept optional for call-site cleanup. */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  /** `inverse` for seções sobre fundo Azul-ardósia. */
  tone?: "default" | "inverse";
}) {
  const inverse = tone === "inverse";
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <h2
        className={cn(
          "text-3xl leading-tight sm:text-4xl",
          inverse && "text-white",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            inverse ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
