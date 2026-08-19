import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage
const searchTerm =
  'title = "journal of paleontology" and date > 2000 and date encloses 1928'

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page, searchTerm, "Query")
  await page.goto("")
})

test.describe("Query Search", () => {
  test("Do a NYQL query search and assert results render with a correctly formatted heading", async () => {
    await searchPage.searchFor(searchTerm, "Query")

    await expect(searchPage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })

    await expect(async () => {
      const count = await searchPage.searchResults.count()
      expect(count).toBeGreaterThan(0)
    }).toPass({ timeout: 10000 })

    const headingText = await searchPage.searchResultsHeading.textContent()
    expect(headingText).toContain(
      'results for query: ((title = "journal of paleontology") and (date > 2000)) and (date encloses 1928)'
    )
  })
})
