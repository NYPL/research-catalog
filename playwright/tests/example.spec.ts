import { test, expect } from "@playwright/test"

test("open baseURL and check for text", async ({ page }) => {
  await page.goto("/research/research-catalog")
  await expect(
    page.getByRole("heading", { level: 1, name: "Research Catalog" })
  ).toBeVisible()
})
