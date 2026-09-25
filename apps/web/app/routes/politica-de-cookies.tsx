import { Container, Section } from "~/components/layout/section";
import { buildPageMeta } from "~/components/seo/meta";

export function meta() {
  return buildPageMeta({
    title: "Política de cookies",
    description: "Uso de cookies no site da Nuvio.",
    path: "/politica-de-cookies",
  });
}

export default function CookiesPage() {
  return (
    <Section>
      <Container className="max-w-3xl space-y-4 text-muted-foreground">
        <h1 className="text-3xl text-foreground">Política de cookies</h1>
        <p>
          Utilizamos cookies essenciais para funcionamento do site (por exemplo,
          preferência de tema armazenada localmente). Cookies de analytics ou
          marketing só serão ativados após consentimento, quando configurados.
        </p>
        <p>
          Hoje, a preferência de tema é salva em <code>localStorage</code> e não
          depende de cookie de rastreamento.
        </p>
        <p className="text-sm">
          Atualize este documento ao habilitar ferramentas de medição.
        </p>
      </Container>
    </Section>
  );
}
