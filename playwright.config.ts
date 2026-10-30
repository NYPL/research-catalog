import { defineConfig, devices } from "@playwright/test"
import * as dotenv from "dotenv"

// Only load .env.local when NOT in CI
if (!process.env.CI) {
  dotenv.config({ path: ".env.local" })
}

export default defineConfig({
  timeout: 30 * 1000,
  globalTimeout: 20 * 30 * 1000,
  testDir: "./playwright",
  // fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://local.nypl.org:8080/research/research-catalog/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium-gha",
      use: {
        ...devices["Desktop Chrome"],
        // Full Chromium: Imperva blocks the default headless shell on login
        channel: "chromium",
      },
    },
    {
      name: "firefox-gha",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],

  webServer: {
    command: process.env.CI ? "npm run start" : "npm run dev",
    url: "http://local.nypl.org:8080/research/research-catalog",
    reuseExistingServer: true,
    timeout: 120000,
    stdout: process.env.CI ? "ignore" : "pipe",
  },
})
