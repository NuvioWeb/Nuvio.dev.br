import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("servicos", "routes/servicos.tsx"),
  route("processo", "routes/processo.tsx"),
  route("para-quem", "routes/para-quem.tsx"),
  route("portfolio", "routes/portfolio.tsx"),
  route("portfolio/:slug", "routes/portfolio.$slug.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog.$slug.tsx"),
  route("contato", "routes/contato.tsx"),
  route("politica-de-privacidade", "routes/politica-de-privacidade.tsx"),
  route("politica-de-cookies", "routes/politica-de-cookies.tsx"),
  route("termos-de-uso", "routes/termos-de-uso.tsx"),
] satisfies RouteConfig;
