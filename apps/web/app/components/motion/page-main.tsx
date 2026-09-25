import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { cn } from "~/lib/cn";

/**
 * Main content region with View Transition name.
 * Fallback: remount + enter animation when VT API is unavailable.
 */
export function PageMain({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [supportsVt, setSupportsVt] = useState(true);

  useEffect(() => {
    setSupportsVt(
      typeof document !== "undefined" && "startViewTransition" in document,
    );
  }, []);

  return (
    <main
      id="conteudo-principal"
      key={supportsVt ? "vt" : location.pathname}
      className={cn("page-main flex-1", !supportsVt && "page-fallback-enter")}
    >
      {children}
    </main>
  );
}
