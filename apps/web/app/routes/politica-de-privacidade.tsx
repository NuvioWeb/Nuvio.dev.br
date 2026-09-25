import { Container, Section } from "~/components/layout/section";
import { buildPageMeta } from "~/components/seo/meta";
import { site } from "~/content/site";

export function meta() {
  return buildPageMeta({
    title: "Política de privacidade",
    description:
      "Como a Nuvio trata dados pessoais enviados pelo formulário de contato.",
    path: "/politica-de-privacidade",
  });
}

export default function PrivacidadePage() {
  return (
    <Section>
      <Container className="prose-nuvio max-w-3xl space-y-4 text-muted-foreground">
        <h1 className="text-3xl text-foreground">Política de privacidade</h1>
        <p>
          Esta política descreve, de forma objetiva, como tratamos dados pessoais
          coletados no site institucional da Nuvio.
        </p>
        <h2 className="text-xl text-foreground">Dados que coletamos</h2>
        <p>
          No formulário de orçamento: nome, nome do negócio, e-mail, WhatsApp
          (opcional), segmento, objetivo, mensagem, origem da conversão e
          registro de consentimento no momento do envio.
        </p>
        <h2 className="text-xl text-foreground">Finalidade</h2>
        <p>
          Responder pedidos de orçamento e contato comercial. Não vendemos dados
          pessoais.
        </p>
        <h2 className="text-xl text-foreground">Como tratamos (sem banco de dados)</h2>
        <p>
          Os pedidos de orçamento{" "}
          <strong className="font-medium text-foreground">
            não são armazenados em banco de dados da Nuvio
          </strong>
          . Os dados do formulário são usados apenas para encaminhar a
          solicitação à equipe por e-mail (e, se você escolher, pelos canais
          públicos de contato como WhatsApp). Cópias podem permanecer na caixa
          de e-mail usada para atendimento até o fim do contato comercial.
        </p>
        <h2 className="text-xl text-foreground">Base e retenção</h2>
        <p>
          O tratamento ocorre com base no consentimento e no legítimo interesse
          de atender a solicitação. Não mantemos um cadastro persistente de
          leads no site; a retenção se limita ao necessário no canal de
          atendimento (e-mail) e a eventuais obrigações legais.
        </p>
        <h2 className="text-xl text-foreground">Seus direitos</h2>
        <p>
          Você pode solicitar informações sobre o tratamento ou pedir que
          interrompamos o contato. Escreva para{" "}
          <a
            className="text-foreground underline-offset-4 hover:underline"
            href={`mailto:${site.email.value}`}
          >
            {site.email.value}
          </a>
          .
        </p>
        <p className="text-sm">
          Documento-base para go-live. Revise com assessoria jurídica antes da
          publicação oficial.
        </p>
      </Container>
    </Section>
  );
}
