import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for keyboard-navigation e2e tests.
 *
 * Run against the running dev server:
 *   bun run dev            # in one terminal
 *   bunx playwright test   # in another
 *
 * Or let Playwright start the dev server automatically via webServer below.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:8080",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "bun run dev",
    url: "http://localhost:8080",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
