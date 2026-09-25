export type BlogStatus = "published" | "draft";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  status: BlogStatus;
  publishedAt: string;
  updatedAt: string;
  author: string;
  tags: string[];
  body: string[];
};

/**
 * Artigos sobre presença digital para negócios locais.
 * Fontes de contexto (síntese editorial, sem copiar texto):
 * - SEO local / Google Business Profile e intenção de busca regional
 * - Site próprio vs. redes sociais (controle, credibilidade, conversão)
 * - Site como base 24h + WhatsApp/Instagram como canais de descoberta e atendimento
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "o-que-um-bom-site-precisa-ter",
    title: "O que um bom site para negócio local precisa ter",
    description:
      "Checklist objetivo: clareza, contato fácil, velocidade, mobile e confiança — sem promessas vazias.",
    status: "published",
    publishedAt: "2026-09-24",
    updatedAt: "2026-09-25",
    author: "Equipe Nuvio",
    tags: ["negócios locais", "sites", "orientação"],
    body: [
      "Um bom site para negócio local explica rápido o que você faz, para quem e como falar com você. Nos primeiros segundos, a pessoa precisa entender se encontrou a solução certa.",
      "Priorize: mensagem clara na primeira tela, contatos acessíveis (WhatsApp, telefone, formulário), páginas de serviço compreensíveis e um caminho óbvio para pedir orçamento ou agendar.",
      "Performance e mobile importam porque grande parte das visitas chega pelo celular — muitas vezes depois de uma busca no Google ou de um anúncio. Se a página demora ou quebra no celular, a pessoa volta para o concorrente.",
      "SEO técnico ajuda mecanismos de busca a entender o site (títulos, textos, dados de contato consistentes). Resultados de posicionamento dependem de contexto, concorrência e consistência — não são garantidos.",
      "Evite inventar depoimentos ou números. Transparência gera mais confiança do que marketing exagerado. Um site honesto e bem estruturado já diferencia a maioria dos negócios locais.",
    ],
  },
  {
    slug: "por-que-ter-um-site-para-o-seu-negocio",
    title: "Por que ter um site para o seu negócio (ainda em 2026)",
    description:
      "Site próprio é terreno digital seu: credibilidade, presença 24h e base para ser encontrado — além do Instagram e do WhatsApp.",
    status: "published",
    publishedAt: "2026-09-25",
    updatedAt: "2026-09-25",
    author: "Equipe Nuvio",
    tags: ["presença digital", "empreendedores", "estratégia"],
    body: [
      "Muitos empreendedores perguntam: “Se eu já tenho Instagram e WhatsApp, por que preciso de site?”. A resposta curta: redes sociais são ótimas para descoberta e conversa; o site é a base que você controla.",
      "No site, você define a mensagem, a ordem das informações e o caminho até o contato. Não depende de algoritmo do dia nem de mudança de regras de uma plataforma terceira para a pessoa conseguir te achar e entender o que você oferece.",
      "Um site profissional transmite seriedade. Quando alguém pesquisa o nome do seu negócio ou um serviço na região, encontrar uma página clara — com serviços, área de atendimento e formas de contato — reduz a desconfiança e encurta a decisão.",
      "Ele funciona como vitrine 24 horas: enquanto você atende, dorme ou está em deslocamento, a página continua explicando o serviço e recebendo pedidos. Formulário e WhatsApp no site transformam curiosidade em lead.",
      "Para MEI e pequenas empresas, site não precisa ser “coisa de multinacional”. Precisa ser objetivo: quem você atende, o que entrega, por que confiar e como falar com você. Isso já coloca o negócio em outro patamar digital.",
      "O melhor cenário não é site versus redes — é os dois juntos. Instagram e anúncios trazem atenção; o site organiza a oferta e sustenta a credibilidade quando a pessoa vai “checar” antes de fechar.",
    ],
  },
  {
    slug: "site-ou-instagram-o-que-gera-mais-clientes",
    title: "Site ou Instagram: o que gera mais clientes?",
    description:
      "Instagram atrai atenção; site converte com mais clareza. Entenda o papel de cada canal na jornada do cliente.",
    status: "published",
    publishedAt: "2026-09-25",
    updatedAt: "2026-09-25",
    author: "Equipe Nuvio",
    tags: ["Instagram", "conversão", "marketing local"],
    body: [
      "Instagram brilha na descoberta: Stories, Reels e posts mostram o dia a dia, o visual do serviço e a personalidade da marca. Para barbearias, salões, clínicas e turismo, isso gera reconhecimento rápido.",
      "O limite aparece na conversão e na busca. Quem digita no Google “dentista em [cidade]” ou “pousada perto de [ponto turístico]” raramente encontra só um perfil social como resposta principal — encontra sites e fichas locais bem estruturadas.",
      "Comparativos de mercado costumam apontar taxas de conversão maiores em sites do que em redes sociais, porque a página de serviço é desenhada para uma ação (ligar, agendar, pedir orçamento), enquanto o feed compete com entretenimento.",
      "Há outro risco: depender só do Instagram. Mudança de alcance, bloqueio de conta ou queda de engajamento pode cortar o fluxo de contatos de um dia para o outro. O site é o ativo estável que você leva junto, mesmo se a rede oscilar.",
      "A jornada típica de um bom funil local: a pessoa vê você no Instagram ou no Maps → confere o site para entender serviços, preços de referência e confiança → fala no WhatsApp. Cada canal tem um papel; o site é o “miolo” da decisão.",
      "Se o orçamento for curto, comece com um site enxuto (home, serviços, contato) e use o Instagram para aquecer. Depois evolua com conteúdo e páginas por serviço. Não precisa escolher um e abandonar o outro.",
    ],
  },
  {
    slug: "seo-local-aparecer-no-google-na-sua-regiao",
    title: "SEO local: como um site ajuda a aparecer no Google na sua região",
    description:
      "Buscas como “perto de mim” e “[serviço] + cidade” pedem site + Perfil da Empresa no Google. Veja o que priorizar.",
    status: "published",
    publishedAt: "2026-09-25",
    updatedAt: "2026-09-25",
    author: "Equipe Nuvio",
    tags: ["SEO local", "Google", "negócios locais"],
    body: [
      "SEO local é o conjunto de práticas para sua empresa aparecer em buscas com intenção geográfica — no mapa, no pacote local e nos resultados orgânicos. Exemplos: “clínica perto de mim”, “hotel em [cidade]”, “advogado em [bairro]”.",
      "Quem faz esse tipo de busca geralmente está perto de decidir: ligar, pedir rota, orçar ou agendar. Por isso, aparecer bem na região costuma gerar contatos mais qualificados do que tráfego genérico sem intenção de compra.",
      "O Perfil da Empresa no Google (antigo Google Meu Negócio) é peça central: horário, fotos, categorias, avaliações e dados de contato. Mas o site reforça a história: páginas de serviço, textos sobre a região atendida e links claros aumentam relevância e confiança.",
      "Consistência de NAP (nome, endereço, telefone) entre site, perfil do Google e diretórios importa. Dados conflitantes confundem o usuário e o algoritmo. No rodapé e na página de contato, use as mesmas informações oficiais.",
      "No site, priorize: uma página por serviço principal, linguagem natural com a cidade/região (sem spam de palavras-chave), velocidade no celular, e botões de WhatsApp/ligação visíveis. Schema de negócio local e metadados bem feitos ajudam a máquina a entender quem você é.",
      "Resultados de SEO local levam tempo e dependem de concorrência e avaliações. Não existe fórmula mágica — existe consistência: perfil completo, site claro, reviews reais e conteúdo útil. A Nuvio trata SEO como estrutura, não como promessa de “1º lugar garantido”.",
    ],
  },
  {
    slug: "site-profissional-credibilidade-e-contatos",
    title: "Credibilidade digital: como o site transforma visitas em contatos",
    description:
      "Primeira impressão, prova social honesta e CTAs claros — o que faz um visitante virar lead no seu site.",
    status: "published",
    publishedAt: "2026-09-25",
    updatedAt: "2026-09-25",
    author: "Equipe Nuvio",
    tags: ["credibilidade", "leads", "conversão"],
    body: [
      "Antes de mandar mensagem, muita gente “pesquisa” o negócio. Um site lento, genérico ou sem dados de contato gera dúvida. Um site limpo, com serviços bem descritos e canais reais, reduz atrito e transmite profissionalismo.",
      "Credibilidade não exige depoimentos inventados. Use o que for verdadeiro: anos de atuação, áreas atendidas, fotos reais do espaço ou da equipe, registro profissional quando fizer sentido, e links para Instagram ou Google com avaliações autênticas.",
      "Cada página importante deve ter uma ação clara: “Falar no WhatsApp”, “Pedir orçamento”, “Agendar avaliação”. Esconda menos o contato. Em negócio local, a conversão quase sempre é uma conversa — o site só precisa facilitar o primeiro passo.",
      "Meça o essencial: quantas pessoas chegam, de onde vêm (orgânico, indicação, anúncio) e quantas disparam o formulário ou o WhatsApp. Com números simples você decide se precisa melhorar a mensagem, a velocidade ou o anúncio — não chute no escuro.",
      "Integre site e atendimento: resposta rápida no WhatsApp após o lead, horário de funcionamento visível e expectativa clara (“retornamos em até X horas”). A experiência depois do clique também é parte da “conversão”.",
      "Em resumo: o site não substitui um bom serviço. Ele amplifica a chance de o cliente certo te encontrar, confiar o suficiente para chamar, e você poder atender. É infraestrutura comercial digital — tão importante quanto cartão de visita e placa na fachada, só que disponível 24h.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug && p.status === "published");
}

export function getPublishedPosts() {
  return blogPosts.filter((p) => p.status === "published");
}
