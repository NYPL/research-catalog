import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage
const searchterm = "Dryden, John"

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page, searchterm, "author/contributor")
  await page.goto("")
})

test.describe("Author Search", () => {
  test("Do an author search and assert that at least 10 returned titles contain the supplied author name", async () => {
    await searchPage.searchFor(searchterm, "Author/contributor")
    await expect(searchPage.resultsHeading).toBeVisible()
    await expect(await searchPage.keywordResult.count()).toBeGreaterThan(10)
  })
})
