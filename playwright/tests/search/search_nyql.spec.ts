import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage
const searchterm = 'keyword = "pterosaur"'

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page, searchterm, "Query")
  await page.goto("")
})

test.describe("Query Search", () => {
  test("Do a NYQL query search and assert that results render", async () => {
    await searchPage.searchFor(searchterm, "Query")

    await expect(searchPage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })

    await expect(async () => {
      const count = await searchPage.searchResults.count()
      expect(count).toBeGreaterThan(0)
    }).toPass({ timeout: 10000 })
  })
})
