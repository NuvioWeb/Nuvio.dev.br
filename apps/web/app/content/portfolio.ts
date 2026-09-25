export type PortfolioStatus = "published" | "demo" | "needsContent";

export type PortfolioProject = {
  slug: string;
  title: string;
  segment: string;
  summary: string;
  status: PortfolioStatus;
  /** Conteúdo demonstrativo — não é cliente real */
  isDemo: boolean;
  highlights: string[];
};

/**
 * Portfólio oculto até existirem cases reais.
 * Quando houver projetos publicados, defina `portfolioVisible = true`
 * e adicione itens com `status: "published"` e `isDemo: false`.
 */
export const portfolioVisible = false;

export const portfolioProjects: PortfolioProject[] = [
  // Cases reais entram aqui. Não publicar peças inventadas.
];

export function getPortfolioBySlug(slug: string) {
  if (!portfolioVisible) return undefined;
  return portfolioProjects.find((p) => p.slug === slug);
}

export function getPublishedPortfolio() {
  if (!portfolioVisible) return [];
  return portfolioProjects.filter((p) => p.status === "published");
}
