import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { AppLink } from "~/components/ui/app-link";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/cn";

export function ServiceCard({
  title,
  description,
}: {
  title: string;
  description: string;
  index?: number;
}) {
  return (
    <article className="pad-row px-4 py-6 sm:px-5 sm:py-7">
      <h3 className="text-xl leading-snug">{title}</h3>
      <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </article>
  );
}

export function AudienceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="pad-cell p-6">
      <h3 className="text-lg leading-snug">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </article>
  );
}

export function ProcessTimeline({
  steps,
}: {
  steps: readonly { step: number; title: string; description: string }[];
}) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((item) => (
        <li key={item.step} className="pad-cell p-5">
          <span className="font-display text-sm font-extrabold text-[var(--nuvio-gold)]">
            {String(item.step).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-base">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function PortfolioCard({
  title,
  summary,
  slug,
  isDemo,
}: {
  title: string;
  summary: string;
  slug: string;
  isDemo?: boolean;
}) {
  return (
    <article className="calendar-board">
      <div className="calendar-plate px-5 py-4">
        <span className="merchant-line text-xs">
          {isDemo ? "Demonstrativo" : "Projeto"}
        </span>
      </div>
      <div className="calendar-fillet" aria-hidden />
      <div className="calendar-pad p-6">
        <h3 className="text-xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {summary}
        </p>
        <Button asChild variant="link" className="mt-4 px-0">
          <AppLink to={`/portfolio/${slug}`}>Ver projeto</AppLink>
        </Button>
      </div>
    </article>
  );
}

export function FaqAccordion({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-[var(--nuvio-radius-md)] border border-border bg-[var(--nuvio-pad)]"
    >
      {items.map((item, index) => (
        <AccordionItem
          key={item.question}
          value={`item-${index}`}
          className="border-border px-2 last:border-b-0"
        >
          <AccordionTrigger className="rounded-[var(--nuvio-radius-sm)] px-3 hover:bg-muted/80 hover:no-underline data-[state=open]:bg-muted/60">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="px-3">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function FinalCta({ className }: { className?: string }) {
  return (
    <div className={cn("calendar-board", className)}>
      <div className="calendar-plate px-6 py-10 text-center sm:px-12 sm:py-12">
        <h2 className="text-3xl text-white sm:text-4xl">
          Pronto para colocar seu negócio online?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Conte o que você precisa. Montamos um orçamento alinhado ao escopo,
          sem promessas vazias.
        </p>
      </div>
      <div className="calendar-fillet" aria-hidden />
      <div className="calendar-pad flex justify-center px-6 py-8 sm:py-10">
        <Button asChild size="lg">
          <AppLink to="/contato">Solicitar orçamento</AppLink>
        </Button>
      </div>
    </div>
  );
}
