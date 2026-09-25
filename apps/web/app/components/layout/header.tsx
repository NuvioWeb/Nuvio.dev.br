import { Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { NuvioLogo } from "~/components/layout/nuvio-logo";
import { ThemeToggle } from "~/components/layout/theme-toggle";
import { Container } from "~/components/layout/section";
import { AppLink, AppNavLink } from "~/components/ui/app-link";
import { Button } from "~/components/ui/button";
import { navItems } from "~/content/site";
import { cn } from "~/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="site-header sticky top-0 z-40 border-b border-border bg-[color-mix(in_oklab,var(--background)_92%,transparent)] text-foreground backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
        <NuvioLogo />
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Principal"
        >
          {navItems.map((item) => (
            <AppNavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "cursor-pointer rounded-[var(--nuvio-radius-sm)] px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground",
                  isActive &&
                    "bg-muted text-foreground underline decoration-[var(--nuvio-gold)] decoration-2 underline-offset-8",
                )
              }
            >
              {item.label}
            </AppNavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex">
            <AppLink to="/contato">Solicitar orçamento</AppLink>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </Container>

      {open ? (
        <div
          id={panelId}
          className="border-t border-border bg-background lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <AppLink
                key={item.to}
                to={item.to}
                className="cursor-pointer rounded-[var(--nuvio-radius-sm)] px-3 py-3 text-base font-medium text-foreground transition-colors duration-200 hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </AppLink>
            ))}
            <Button asChild className="mt-3">
              <AppLink to="/contato" onClick={() => setOpen(false)}>
                Solicitar orçamento
              </AppLink>
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
