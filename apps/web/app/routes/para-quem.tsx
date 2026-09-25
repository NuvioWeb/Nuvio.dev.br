import { Container, Section } from "~/components/layout/section";
import { AudienceCard, FinalCta } from "~/components/marketing/cards";
import {
  breadcrumbJsonLd,
  buildPageMeta,
  JsonLd,
} from "~/components/seo/meta";
import { audiences } from "~/content/services";

export function meta() {
  return buildPageMeta({
    title: "Para quem",
    description:
      "A Nuvio atende dentistas, clínicas, barbearias, salões, hotéis, pousadas, turismo e profissionais liberais.",
    path: "/para-quem",
  });
}

export default function ParaQuemPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Para quem", path: "/para-quem" },
        ])}
      />
      <Section>
        <Container>
          <div className="mb-10 max-w-2xl text-left">
            <h1 className="text-3xl sm:text-4xl">Para quem é a Nuvio</h1>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Negócios locais que precisam de presença online profissional, sem
              complicação desnecessária.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {audiences.map((item) => (
              <AudienceCard key={item.title} {...item} />
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
            Cada cliente pode ter identidade visual própria. Não aplicamos a
            paleta institucional da Nuvio aos sites de clientes.
          </p>
          <FinalCta className="mt-16" />
        </Container>
      </Section>
    </>
  );
}
