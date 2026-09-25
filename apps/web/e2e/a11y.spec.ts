import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

test("home sem violações críticas de acessibilidade", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  const critical = results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious",
  );
  expect(critical, JSON.stringify(critical, null, 2)).toEqual([]);
});
