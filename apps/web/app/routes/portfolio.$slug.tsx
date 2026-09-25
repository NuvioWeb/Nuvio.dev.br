import { Navigate } from "react-router";
import { AppLink } from "~/components/ui/app-link";
import type { Route } from "./+types/portfolio.$slug";
import { Container, Section } from "~/components/layout/section";
import {
  breadcrumbJsonLd,
  buildPageMeta,
  JsonLd,
} from "~/components/seo/meta";
import {
  getPortfolioBySlug,
  portfolioVisible,
} from "~/content/portfolio";

export function meta({ params }: Route.MetaArgs) {
  const project = getPortfolioBySlug(params.slug);
  if (!project) {
    return buildPageMeta({
      title: "Projeto não encontrado",
      description: "O projeto solicitado não existe.",
      path: `/portfolio/${params.slug}`,
      noindex: true,
    });
  }
  return buildPageMeta({
    title: project.title,
    description: project.summary,
    path: `/portfolio/${project.slug}`,
  });
}

export default function PortfolioDetailPage({ params }: Route.ComponentProps) {
  if (!portfolioVisible) {
    return <Navigate to="/" replace />;
  }

  const project = getPortfolioBySlug(params.slug);

  if (!project || project.status !== "published") {
    return (
      <Section>
        <Container className="text-center">
          <h1 className="text-3xl">Projeto não encontrado</h1>
          <AppLink to="/" className="mt-6 inline-block text-primary underline">
            Voltar ao início
          </AppLink>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfólio", path: "/portfolio" },
          { name: project.title, path: `/portfolio/${project.slug}` },
        ])}
      />
      <Section>
        <Container className="max-w-3xl">
          <div className="calendar-board">
            <div className="calendar-plate px-6 py-6 sm:px-10">
              {project.isDemo ? (
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--nuvio-gold)]">
                  Conteúdo demonstrativo — não é um cliente real
                </p>
              ) : null}
              <p className="text-sm text-white/60">{project.segment}</p>
              <h1 className="mt-2 text-3xl text-white sm:text-4xl">
                {project.title}
              </h1>
            </div>
            <div className="calendar-fillet" aria-hidden />
            <div className="calendar-pad px-6 py-8 sm:px-10">
              <p className="text-lg text-muted-foreground">{project.summary}</p>
              <h2 className="mt-8 text-2xl">Destaques</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
