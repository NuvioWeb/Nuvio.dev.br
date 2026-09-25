import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("nuvio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = stored === "dark" || (!stored && prefersDark);
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("nuvio-theme", next ? "dark" : "light");
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
      className={cn("text-foreground hover:bg-muted hover:text-foreground", className)}
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
