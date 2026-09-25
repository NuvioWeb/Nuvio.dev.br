import { NuvioLogo } from "~/components/layout/nuvio-logo";
import { Container } from "~/components/layout/section";
import { AppLink } from "~/components/ui/app-link";
import { navItems, site, whatsappUrl } from "~/content/site";

export function Footer() {
  return (
    <footer className="site-footer mt-6">
      <Container className="pb-10">
        <div className="calendar-board">
          <div className="calendar-plate px-6 py-8 sm:px-10">
            <NuvioLogo variant="negative" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
              {site.tagline} Sites profissionais para negócios locais, com
              clareza e acompanhamento.
            </p>
          </div>
          <div className="calendar-fillet" aria-hidden />
          <div className="calendar-pad grid gap-10 px-6 py-10 sm:px-10 md:grid-cols-3">
            <div>
              <h2 className="font-display text-sm font-extrabold">Navegação</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <AppLink
                      to={item.to}
                      className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      {item.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-sm font-extrabold">Contato</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <a
                    href={`mailto:${site.email.value}`}
                    className="transition-colors duration-200 hover:text-foreground"
                  >
                    {site.email.value}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl("Olá! Vim pelo site da Nuvio.")}
                    className="transition-colors duration-200 hover:text-foreground"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp {site.whatsapp.value}
                  </a>
                </li>
                {site.social.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      className="transition-colors duration-200 hover:text-foreground"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                      {"handle" in item && item.handle ? ` ${item.handle}` : ""}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-sm font-extrabold">Políticas</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <AppLink
                    to="/politica-de-privacidade"
                    className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    Política de privacidade
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    to="/politica-de-cookies"
                    className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    Política de cookies
                  </AppLink>
                </li>
                <li>
                  <AppLink
                    to="/termos-de-uso"
                    className="text-muted-foreground transition-colors duration-200 hover:text-foreground"
                  >
                    Termos de uso
                  </AppLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. Todos os direitos
          reservados.
        </p>
      </Container>
    </footer>
  );
}
