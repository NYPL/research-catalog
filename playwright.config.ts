import { defineConfig, devices } from "@playwright/test"
import * as dotenv from "dotenv"

// Only load .env.local when NOT in CI
if (!process.env.CI) {
  dotenv.config({ path: ".env.local" })
}

const LOCAL_URL = "http://local.nypl.org:8080/research/research-catalog"
// Set BASE_URL to point tests at another environment, e.g. QA:
// BASE_URL=https://qa-www.nypl.org/research/research-catalog npx playwright test
// Trailing slash is required so relative page.goto() calls resolve under /research-catalog
const rawBaseURL = process.env.BASE_URL || LOCAL_URL
const baseURL = rawBaseURL.endsWith("/") ? rawBaseURL : `${rawBaseURL}/`

export default defineConfig({
  timeout: 30 * 1000,
  globalTimeout: 20 * 30 * 1000,
  testDir: "./playwright",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: "html",

  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "firefox",
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

  // Skip booting a local dev server when BASE_URL points at a remote environment (e.g. QA)
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: process.env.CI ? "npm run start" : "npm run dev",
        url: LOCAL_URL,
        reuseExistingServer: true,
        timeout: 120000,
      },
})
