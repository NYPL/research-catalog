import { defineConfig, devices } from "@playwright/test"

import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

export default defineConfig({
  timeout: 30 * 1000,
  globalTimeout: 20 * 30 * 1000,
  testDir: "./playwright",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 4,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    // Use BASE_URL from environment, or fall back to local
    baseURL:
      process.env.BASE_URL ||
      "http://local.nypl.org:8080/research/research-catalog",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  // Only start local server when NOT in CI
  webServer: process.env.CI
    ? undefined
    : {
        command: "npm run dev",
        url: "http://local.nypl.org:8080/research/research-catalog",
        reuseExistingServer: true,
        timeout: 120 * 1000,
      },
})
