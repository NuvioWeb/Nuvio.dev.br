import { Header } from "~/components/layout/header";
import { Footer } from "~/components/layout/footer";
import { PageMain } from "~/components/motion/page-main";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col brand-surface">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Ir para o conteúdo principal
      </a>
      <Header />
      <PageMain>{children}</PageMain>
      <Footer />
    </div>
  );
}
