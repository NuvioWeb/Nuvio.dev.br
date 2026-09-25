import { test, expect } from "@playwright/test";

test("home renderiza marca e CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Nuvio/i }).first()).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 1, name: /Seu negócio online/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Solicitar orçamento" }).first(),
  ).toBeVisible();
});

test("navegação para contato e validação do formulário", async ({ page }) => {
  await page.goto("/contato");
  await expect(page.getByRole("heading", { name: /Solicitar orçamento/i })).toBeVisible();
  await page.getByRole("button", { name: /Enviar pedido/i }).click();
  await expect(page.getByRole("alert").first()).toBeVisible();
});
