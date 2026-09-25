import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["app/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "~": path.resolve(rootDir, "./app"),
    },
  },
});
