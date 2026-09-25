import { X } from "lucide-react";
import { AppLink } from "~/components/ui/app-link";
import type { Route } from "./+types/blog.$slug";
import { Container, Section } from "~/components/layout/section";
import {
  breadcrumbJsonLd,
  buildPageMeta,
  JsonLd,
} from "~/components/seo/meta";
import { getPostBySlug } from "~/content/blog";

export function meta({ params }: Route.MetaArgs) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return buildPageMeta({
      title: "Artigo não encontrado",
      description: "O artigo solicitado não existe.",
      path: `/blog/${params.slug}`,
      noindex: true,
    });
  }
  return buildPageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default function BlogPostPage({ params }: Route.ComponentProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <Section>
        <Container className="text-center">
          <h1 className="text-3xl">Artigo não encontrado</h1>
          <AppLink to="/blog" className="mt-6 inline-block text-primary underline">
            Voltar ao blog
          </AppLink>
        </Container>
      </Section>
    );
  }

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            author: { "@type": "Organization", name: post.author },
            inLanguage: "pt-BR",
          },
        ]}
      />
      <Section>
        <Container className="relative max-w-3xl">
          <AppLink
            to="/blog"
            aria-label="Fechar e voltar à listagem do blog"
            className="absolute right-2 top-2 z-10 inline-flex size-10 items-center justify-center rounded-xl border border-white/15 bg-[var(--nuvio-ink)]/80 text-white shadow-sm backdrop-blur-sm transition-colors hover:border-[var(--nuvio-gold)]/50 hover:bg-[var(--nuvio-ink)] hover:text-[var(--nuvio-gold)] sm:right-3 sm:top-3"
          >
            <X className="size-5" aria-hidden />
          </AppLink>
          <div className="calendar-board">
            <div className="calendar-plate px-6 py-6 sm:px-10">
              <p className="text-sm text-white/60">
                {post.publishedAt} · {post.author}
              </p>
              <h1 className="mt-3 pr-10 text-3xl text-white sm:text-4xl">
                {post.title}
              </h1>
            </div>
            <div className="calendar-fillet" aria-hidden />
            <div className="calendar-pad px-6 py-8 sm:px-10">
              <p className="text-lg text-muted-foreground">{post.description}</p>
              <div className="mt-8 space-y-4 text-base leading-relaxed text-foreground">
                {post.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
