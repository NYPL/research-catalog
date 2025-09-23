import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage
const searchterm = "Lancet"

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page, searchterm, "journal title")
  await page.goto("")
})

test.describe("Journal Title Search", () => {
  test("Do a journal title search and assert that at least 5 returned titles contain the supplied journal title", async () => {
    await searchPage.searchFor(searchterm, "Journal title")
    await expect(searchPage.resultsHeading).toBeVisible()
    await expect(await searchPage.searchResult.count()).toBeGreaterThan(5)
  })
})
