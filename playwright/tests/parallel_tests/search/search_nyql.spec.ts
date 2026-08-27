import { test, expect } from "@playwright/test"
import { SearchPage } from "../../../pages/search_page"

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
  test("Do a NYQL query search with an invalid query and assert the invalid query heading is visible", async () => {
    const invalidSearchTerm = "paleontology"
    await searchPage.searchFor(invalidSearchTerm, "Query")

    await expect(searchPage.invalidQueryHeading).toBeVisible({
      timeout: 15000,
    })
  })
  test("Do a NYQL query search with no results and assert the no results heading is visible", async () => {
    const noResultsSearchTerm = 'title = "nonexistent journal" and date > 2000'
    await searchPage.searchFor(noResultsSearchTerm, "Query")

    await expect(searchPage.noResultsHeading).toBeVisible({
      timeout: 15000,
    })
  })
})
