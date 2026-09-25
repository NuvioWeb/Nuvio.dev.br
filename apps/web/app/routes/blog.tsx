import { Container, Section } from "~/components/layout/section";
import {
  breadcrumbJsonLd,
  buildPageMeta,
  JsonLd,
} from "~/components/seo/meta";
import { AppLink } from "~/components/ui/app-link";
import { blogPosts } from "~/content/blog";

export function meta() {
  return buildPageMeta({
    title: "Blog",
    description:
      "Conteúdos educativos da Nuvio sobre sites para negócios locais.",
    path: "/blog",
  });
}

export default function BlogPage() {
  const posts = blogPosts.filter((p) => p.status === "published");

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <Section>
        <Container>
          <div className="mb-10 max-w-2xl text-left">
            <h1 className="text-3xl sm:text-4xl">Blog</h1>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Orientações práticas para quem quer presença online clara.
            </p>
          </div>
          <ul className="border-t border-border">
            {posts.map((post) => (
              <li key={post.slug} className="pad-row px-4 py-6 sm:px-5">
                <article>
                  <h2 className="text-xl">
                    <AppLink
                      to={`/blog/${post.slug}`}
                      className="hover:underline"
                    >
                      {post.title}
                    </AppLink>
                  </h2>
                  <p className="mt-2 max-w-[65ch] text-sm text-muted-foreground">
                    {post.description}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Publicado em {post.publishedAt}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
