import { test, expect } from "@playwright/test"

test("legacy url redirects to base path", async ({ page }) => {
  await page.goto(
    "http://localhost:8080/research/collections/shared-collection-catalog"
  )
  await expect(page).toHaveURL(
    "http://localhost:8080/research/research-catalog"
  )
})

test("legacy url plus path redirects to base path", async ({ page }) => {
  await page.goto(
    "http://localhost:8080/research/collections/shared-collection-catalog/test"
  )
  await expect(page).toHaveURL(
    "http://localhost:8080/research/research-catalog/test"
  )
})
