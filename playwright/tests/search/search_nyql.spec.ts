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

const searchTermForFormatting = 'title = "journal of paleontology" and date > 2000 and date encloses 1928'
test.describe("Check for formatting of query search results heading", () => {
  test("Check that the query search results heading is formatted correctly", async ({
    page,
  }) => {
    await searchPage.searchFor(searchTermForFormatting, "Query")

    // The rendered heading shows the parsed (parenthesized) query, not the raw input,
    // so match on the heading generically rather than via searchResultsHeading.
    const heading = page.getByRole("heading", { name: /Displaying/i })
    await expect(heading).toBeVisible({
      timeout: 15000,
    })

    const headingText = await heading.textContent()
    expect(headingText).toContain(
      'results for query: ((title = "journal of paleontology") and (date > 2000)) and (date encloses 1928)'
    )
  })
})