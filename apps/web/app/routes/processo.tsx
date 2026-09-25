import { Container, Section } from "~/components/layout/section";
import { FinalCta, ProcessTimeline } from "~/components/marketing/cards";
import {
  breadcrumbJsonLd,
  buildPageMeta,
  JsonLd,
} from "~/components/seo/meta";
import { processSteps } from "~/content/services";

export function meta() {
  return buildPageMeta({
    title: "Processo",
    description:
      "Diagnóstico, direção visual, desenvolvimento, validação e publicação: o processo da Nuvio.",
    path: "/processo",
  });
}

export default function ProcessoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Processo", path: "/processo" },
        ])}
      />
      <Section>
        <Container>
          <div className="mb-10 max-w-2xl text-left">
            <h1 className="text-3xl sm:text-4xl">Como funciona o trabalho</h1>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Etapas claras para reduzir surpresas e validar cada entrega.
            </p>
            <div className="fillet-rule mt-6" aria-hidden />
          </div>
          <ProcessTimeline steps={processSteps} />
          <FinalCta className="mt-16" />
        </Container>
      </Section>
    </>
  );
}
