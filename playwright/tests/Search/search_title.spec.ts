import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage
const searchterm = "It happened in New York"

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page, searchterm, "title")
  await page.goto("")
})

test.describe("Title Search", () => {
  test("Do a title search and assert that at least 10 returned titles contain the supplied keyword", async () => {
    await searchPage.searchFor(searchterm, "Title")
    await expect(searchPage.resultsHeading).toBeVisible()
    await expect(await searchPage.searchResult.count()).toBeGreaterThan(10)
  })
})
