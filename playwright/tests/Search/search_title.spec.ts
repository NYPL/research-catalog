import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage
const searchterm = "It happened in New York"

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page, searchterm, "title")
  await page.goto("")
})

test.describe("Title Search", () => {
  test("Do a title search and assert that at least 10 returned titles contain the supplied keyword", async ({
    page,
  }) => {
    await searchPage.searchFor(searchterm, "Title")
    // sleep for 5 seconds to allow results to load
    await page.waitForTimeout(10000)
    await expect(searchPage.searchResultsHeading).toBeVisible()
    // await page.waitForTimeout(10000) // waits 10 seconds before checking count
    await expect(await searchPage.searchResultsTitle.count()).toBeGreaterThan(
      10
    )
  })
})
