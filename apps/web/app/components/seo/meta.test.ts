import { describe, expect, it } from "vitest";
import { buildPageMeta } from "./meta";

describe("buildPageMeta", () => {
  it("gera título e description", () => {
    const meta = buildPageMeta({
      title: "Serviços",
      description: "Descrição de teste",
      path: "/servicos",
    });
    expect(meta.some((item) => "title" in item && String(item.title).includes("Serviços"))).toBe(
      true,
    );
    expect(
      meta.some(
        (item) =>
          "name" in item &&
          item.name === "description" &&
          item.content === "Descrição de teste",
      ),
    ).toBe(true);
  });
});
