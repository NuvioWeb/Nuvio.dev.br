import { Container, Section, SectionHeading } from "~/components/layout/section";
import { HeroSection } from "~/components/marketing/hero-section";
import {
  AudienceCard,
  FaqAccordion,
  FinalCta,
  ProcessTimeline,
  ServiceCard,
} from "~/components/marketing/cards";
import { Reveal } from "~/components/motion/reveal";
import {
  buildPageMeta,
  faqJsonLd,
  JsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "~/components/seo/meta";
import { AppLink } from "~/components/ui/app-link";
import {
  audiences,
  differentials,
  faqs,
  processSteps,
  services,
} from "~/content/services";
import { site } from "~/content/site";

export function meta() {
  return buildPageMeta({
    title: site.tagline,
    description: site.description,
    path: "/",
  });
}

export default function Home() {
  const mosaicPillars = differentials.slice(0, 4);

  return (
    <>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(), faqJsonLd(faqs)]} />
      <HeroSection />

      <Section reveal={false} className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              title="Feito para negócios locais que querem crescer"
              description="Dentistas, clínicas, barbearias, salões, hotéis, pousadas, turismo e profissionais liberais."
              align="left"
            />
            <div className="fillet-rule mb-8" aria-hidden />
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {audiences.map((item, index) => (
              <Reveal key={item.title} delay={index * 45}>
                <AudienceCard {...item} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={180}>
            <p className="mt-8 text-sm">
              <AppLink
                to="/para-quem"
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                Ver todos os segmentos
              </AppLink>
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section reveal={false} className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="calendar-board">
              <div className="calendar-plate px-6 py-8 sm:px-10">
                <h2 className="text-3xl text-white sm:text-4xl">
                  Quatro peças. Uma presença completa.
                </h2>
                <p className="mt-4 max-w-[50ch] text-white/70">
                  Estratégia, design, tecnologia e crescimento, conectados com
                  clareza.
                </p>
              </div>
              <div className="calendar-fillet" aria-hidden />
              <div className="calendar-pad grid gap-0 sm:grid-cols-2">
                {mosaicPillars.map((item) => (
                  <article
                    key={item.title}
                    className="pad-row border-border p-6 last:border-b-0 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
                  >
                    <h3 className="text-xl">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section reveal={false} className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              title="Do diagnóstico à evolução contínua"
              description="Escopo claro para cada etapa do seu site."
              align="left"
            />
            <div className="fillet-rule mb-2" aria-hidden />
          </Reveal>
          <div className="mt-6 border-t border-border">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 40}>
                <ServiceCard {...service} index={index} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={160}>
            <p className="mt-8 text-sm">
              <AppLink
                to="/servicos"
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                Conhecer serviços
              </AppLink>
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section reveal={false} className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              title="Como trabalhamos"
              description="Etapas objetivas, com validação antes da publicação."
              align="left"
            />
            <div className="fillet-rule mb-8" aria-hidden />
          </Reveal>
          <Reveal delay={70}>
            <ProcessTimeline steps={processSteps} />
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-10 text-sm">
              <AppLink
                to="/processo"
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                Ver como funciona
              </AppLink>
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title="Perguntas frequentes" align="left" />
          <FaqAccordion items={faqs} />
        </Container>
      </Section>

      <Section className="pb-20 pt-4 sm:pb-24">
        <Container>
          <FinalCta />
        </Container>
      </Section>
    </>
  );
}
