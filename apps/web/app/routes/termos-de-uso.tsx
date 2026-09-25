import { Container, Section } from "~/components/layout/section";
import { buildPageMeta } from "~/components/seo/meta";

export function meta() {
  return buildPageMeta({
    title: "Termos de uso",
    description: "Condições de uso do site institucional da Nuvio.",
    path: "/termos-de-uso",
  });
}

export default function TermosPage() {
  return (
    <Section>
      <Container className="max-w-3xl space-y-4 text-muted-foreground">
        <h1 className="text-3xl text-foreground">Termos de uso</h1>
        <p>
          Este site apresenta informações institucionais da Nuvio. O conteúdo
          pode ser atualizado sem aviso prévio.
        </p>
        <p>
          Orçamentos e propostas comerciais são válidos apenas quando enviados
          formalmente pela Nuvio, após análise do escopo.
        </p>
        <p>
          É proibido uso automatizado abusivo dos formulários ou tentativa de
          comprometer a disponibilidade do serviço.
        </p>
        <p className="text-sm">
          Documento-base — revisar juridicamente antes do go-live.
        </p>
      </Container>
    </Section>
  );
}
