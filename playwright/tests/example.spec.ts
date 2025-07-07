import { test, expect } from "@playwright/test"

// test("has title", async ({ page }) => {
//   await page.goto("https://playwright.dev/")

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/)
// })

// test("get started link", async ({ page }) => {
//   await page.goto("https://playwright.dev/")

//   // Click the get started link.
//   await page.getByRole("link", { name: "Get started" }).click()

//   // Expects page to have a heading with the name of Installation.
//   await expect(
//     page.getByRole("heading", { name: "Installation" })
//   ).toBeVisible()
// })
// write test to open baseURL and check if the page contains the text "Research Catalog"
test("open baseURL and check for text", async ({ page }) => {
  await page.goto("/research/research-catalog")
  // sleep for 5 seconds
  await page.waitForTimeout(5000)
  await expect(
    page.getByRole("heading", { level: 1, name: "Research Catalog" })
  ).toBeVisible()
})
