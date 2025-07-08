import { test, expect } from "@playwright/test"

// write test to open baseURL and check if the page contains the text "Research Catalog"
test("open baseURL and check for text", async ({ page }) => {
  await page.goto("/research/research-catalog")
  await expect(
    page.getByRole("heading", { level: 1, name: "Research Catalog" })
  ).toBeVisible()
})
