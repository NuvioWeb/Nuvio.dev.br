import { getSiteUrl } from "~/lib/env";
import { site } from "~/content/site";

export function buildPageMeta({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}) {
  const url = `${getSiteUrl()}${path === "/" ? "" : path}`;
  const fullTitle = path === "/" ? `${site.name} - ${title}` : `${title} | ${site.name}`;

  return [
    { title: fullTitle },
    { name: "description", content: description },
    { name: "robots", content: noindex ? "noindex,nofollow" : "index,follow" },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:site_name", content: site.name },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: `${getSiteUrl()}/brand/nuvio-social-post.svg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Conteúdo gerado pelo app a partir de objetos tipados — sem HTML do usuário.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description: site.description,
    url: getSiteUrl(),
    logo: `${getSiteUrl()}/brand/nuvio-symbol.svg`,
    ...(site.social.length
      ? { sameAs: site.social.map((s) => s.url) }
      : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: getSiteUrl(),
    inLanguage: "pt-BR",
    description: site.description,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${getSiteUrl()}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
