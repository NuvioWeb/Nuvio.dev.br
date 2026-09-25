import { Container, Section } from "~/components/layout/section";
import { ContactForm } from "~/features/contact/contact-form";
import {
  breadcrumbJsonLd,
  buildPageMeta,
  JsonLd,
} from "~/components/seo/meta";
import { site, whatsappUrl } from "~/content/site";

export function meta() {
  return buildPageMeta({
    title: "Contato",
    description:
      "Solicite um orçamento para o site do seu negócio. A Nuvio retorna com proposta alinhada ao escopo.",
    path: "/contato",
  });
}

export default function ContatoPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contato", path: "/contato" },
        ])}
      />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <h1 className="text-3xl sm:text-4xl">Solicitar orçamento</h1>
            <div className="fillet-rule mt-5" aria-hidden />
            <p className="mt-5 text-muted-foreground">
              Conte sobre o negócio e o objetivo. Usamos os dados apenas para
              retorno comercial, conforme a política de privacidade.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>
                E-mail:{" "}
                <a
                  className="text-foreground underline"
                  href={`mailto:${site.email.value}`}
                >
                  {site.email.value}
                </a>
              </li>
              <li>
                WhatsApp:{" "}
                <a
                  className="text-foreground underline"
                  href={whatsappUrl("Olá! Vim pelo site da Nuvio.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.whatsapp.value}
                </a>
              </li>
              <li>
                Instagram:{" "}
                <a
                  className="text-foreground underline"
                  href={site.social[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @nuvioweb_
                </a>
              </li>
            </ul>
          </div>
          <div className="calendar-board">
            <div className="calendar-plate px-5 py-3">
              <span className="merchant-line text-xs">Pedido</span>
            </div>
            <div className="calendar-fillet" aria-hidden />
            <div className="calendar-pad p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
