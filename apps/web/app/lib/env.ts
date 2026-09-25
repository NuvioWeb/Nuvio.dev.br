import { site } from "~/content/site";

export function getSiteUrl() {
  return (
    import.meta.env.VITE_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    site.defaultUrl
  );
}

export function getApiBaseUrl() {
  return (
    import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:3001"
  );
}
