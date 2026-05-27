import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage
const searchterm = "IBM 1401"

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page, searchterm)
  await page.goto("")
})

test.describe("Keyword Search", () => {
  test("Do a keyword search and assert that at least 10 returned titles contain the supplied keyword", async () => {
    await searchPage.searchFor(searchterm, "Keyword")

    await expect(searchPage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })

    await expect(async () => {
      const count = await searchPage.searchResultsTitle.count()
      expect(count).toBeGreaterThan(10)
    }).toPass({ timeout: 10000 })
  })
})
