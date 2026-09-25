import { Navigate } from "react-router";
import { Container, Section } from "~/components/layout/section";
import { PortfolioCard } from "~/components/marketing/cards";
import {
  breadcrumbJsonLd,
  buildPageMeta,
  JsonLd,
} from "~/components/seo/meta";
import {
  getPublishedPortfolio,
  portfolioVisible,
} from "~/content/portfolio";

export function meta() {
  return buildPageMeta({
    title: "Portfólio",
    description:
      "Projetos reais da Nuvio. Sem clientes inventados.",
    path: "/portfolio",
  });
}

export default function PortfolioPage() {
  if (!portfolioVisible) {
    return <Navigate to="/" replace />;
  }

  const published = getPublishedPortfolio();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfólio", path: "/portfolio" },
        ])}
      />
      <Section>
        <Container>
          <div className="mb-10 max-w-2xl text-left">
            <h1 className="text-3xl sm:text-4xl">Portfólio</h1>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Exibimos apenas projetos reais.
            </p>
          </div>
          {published.length === 0 ? (
            <p className="text-muted-foreground">
              Em breve: projetos reais serão adicionados aqui.
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {published.map((project) => (
                <PortfolioCard
                  key={project.slug}
                  title={project.title}
                  summary={project.summary}
                  slug={project.slug}
                  isDemo={project.isDemo}
                />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
