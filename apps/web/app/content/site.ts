export const site = {
  name: "Nuvio",
  legalName: "Nuvio",
  tagline: "Seu negócio online, do jeito certo.",
  description:
    "A Nuvio cria sites profissionais para pequenas empresas e negócios locais — com estratégia, design e tecnologia claros.",
  locale: "pt-BR",
  defaultUrl: "https://nuvio.dev.br",
  email: {
    label: "E-mail",
    value: "nuvioweb.enterprise@gmail.com",
    needsContent: false,
  },
  whatsapp: {
    /** Exibição */
    value: "(62) 98104-6068",
    /** Link wa.me com DDI 55 + DDD 62 */
    e164: "5562981046068",
    needsContent: false,
  },
  region:
    "Atendimento remoto para negócios locais no Brasil, com foco em clareza e acompanhamento.",
  social: [
    {
      name: "Instagram",
      url: "https://www.instagram.com/nuvioweb_/",
      handle: "@nuvioweb_",
    },
  ],
} as const;

export const navItems = [
  { to: "/servicos", label: "Serviços" },
  { to: "/processo", label: "Processo" },
  { to: "/para-quem", label: "Para quem" },
  // Portfólio oculto até existirem cases reais (ver content/portfolio.ts)
  { to: "/blog", label: "Blog" },
  { to: "/contato", label: "Contato" },
] as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${site.whatsapp.e164}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
