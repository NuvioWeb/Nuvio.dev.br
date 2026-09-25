import { AppLink } from "~/components/ui/app-link";
import { cn } from "~/lib/cn";

type NuvioLogoProps = {
  /** Força uma variante; por padrão acompanha o tema (primary no light, negative no dark). */
  variant?: "primary" | "negative" | "auto";
  className?: string;
  withLink?: boolean;
};

export function NuvioLogo({
  variant = "auto",
  className,
  withLink = true,
}: NuvioLogoProps) {
  const image =
    variant === "auto" ? (
      <>
        <img
          src="/brand/nuvio-logo-primary.svg"
          alt="Nuvio"
          width={132}
          height={36}
          className={cn("h-9 w-auto dark:hidden", className)}
        />
        <img
          src="/brand/nuvio-logo-negative.svg"
          alt=""
          width={132}
          height={36}
          aria-hidden
          className={cn("hidden h-9 w-auto dark:block", className)}
        />
      </>
    ) : (
      <img
        src={
          variant === "negative"
            ? "/brand/nuvio-logo-negative.svg"
            : "/brand/nuvio-logo-primary.svg"
        }
        alt="Nuvio"
        width={132}
        height={36}
        className={cn("h-9 w-auto", className)}
      />
    );

  if (!withLink) return <span className="inline-flex items-center">{image}</span>;

  return (
    <AppLink
      to="/"
      className="inline-flex items-center"
      aria-label="Nuvio - página inicial"
    >
      {image}
    </AppLink>
  );
}
