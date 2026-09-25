import { Container } from "~/components/layout/section";
import { MosaicMark } from "~/components/marketing/mosaic-mark";
import { AppLink } from "~/components/ui/app-link";
import { Button } from "~/components/ui/button";
import { site } from "~/content/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <Container className="relative py-10 sm:py-12 lg:flex lg:min-h-[100dvh] lg:items-center lg:py-14">
        <div className="calendar-board fade-up mx-auto w-full max-w-5xl">
          {/* Placa superior */}
          <div className="calendar-plate relative px-6 pb-10 pt-8 sm:px-10 sm:pb-12 sm:pt-10 lg:px-14 lg:pb-14 lg:pt-12">
            <p className="merchant-line text-sm sm:text-base">{site.name}</p>
            <div className="mt-8 flex items-end justify-between gap-6">
              <div className="max-w-md">
                <p className="text-sm leading-relaxed text-white/65 sm:text-base">
                  Presença online clara para o seu negócio local.
                </p>
              </div>
              <div
                className="hidden h-28 w-28 shrink-0 sm:block sm:h-36 sm:w-36 lg:h-40 lg:w-40"
                aria-hidden
              >
                <MosaicMark className="h-full w-full" />
              </div>
            </div>
          </div>

          <div className="calendar-fillet" aria-hidden />

          {/* Bloco de ação / pad */}
          <div className="calendar-pad px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
            <h1 className="fade-up fade-up-delay-1 max-w-[18ch] text-3xl leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {site.tagline}
            </h1>
            <p className="fade-up fade-up-delay-2 mt-5 max-w-[42ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              Sites profissionais para dentistas, clínicas, barbearias, hotéis e
              outros negócios locais, com estratégia, design e tecnologia claros.
            </p>
            <div className="fade-up fade-up-delay-3 mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="min-w-[11rem]">
                <AppLink to="/contato">Solicitar orçamento</AppLink>
              </Button>
              <Button asChild size="lg" variant="outline">
                <AppLink to="/processo">Ver como funciona</AppLink>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
