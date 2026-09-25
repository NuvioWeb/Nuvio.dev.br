import { Container, Section } from "~/components/layout/section";
import { ServiceCard, FinalCta } from "~/components/marketing/cards";
import {
  breadcrumbJsonLd,
  buildPageMeta,
  JsonLd,
} from "~/components/seo/meta";
import { services } from "~/content/services";

export function meta() {
  return buildPageMeta({
    title: "Serviços",
    description:
      "Criação de site, landing page, redesign, manutenção, SEO técnico e evolução com a Nuvio.",
    path: "/servicos",
  });
}

export default function ServicosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Serviços", path: "/servicos" },
        ])}
      />
      <Section>
        <Container>
          <div className="mb-10 max-w-2xl text-left">
            <h1 className="text-3xl sm:text-4xl">Serviços da Nuvio</h1>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Soluções focadas no resultado do negócio, com identidade própria do
              cliente quando houver evidência.
            </p>
          </div>
          <div className="border-t border-border">
            {services.map((service, index) => (
              <ServiceCard key={service.id} {...service} index={index} />
            ))}
          </div>
          <FinalCta className="mt-16" />
        </Container>
      </Section>
    </>
  );
}
