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
      name: "setup",
      testMatch: "global.setup.ts",
    },
    {
      name: "chromium",
      testMatch: "parallel_tests/**/*.ts",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      testMatch: "parallel_tests/**/*.ts",
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      testMatch: "parallel_tests/**/*.ts",
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
    // Account tests must be run in series with each other or else they are all updating the same user data
    {
      name: "my account chromium",
      testMatch: "account/account.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
      },
      dependencies: ["setup"],
    },
    {
      name: "my account firefox",
      testMatch: "account/account.spec.ts",

      dependencies: ["my account chromium"],
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      testMatch: "account/account.spec.ts",
      name: "my account webkit",
      dependencies: ["my account firefox"],
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
