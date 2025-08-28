import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage
const keyword = "IBM 1401"

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page, keyword)
  await page.goto("")
})

test.describe("Keyword Search", () => {
  test("Do a keyword search and assert that at least 10 returned titles contain the supplied keyword", async () => {
    await searchPage.searchFor(keyword)
    await expect(searchPage.resultsHeading).toBeVisible()
    await expect(await searchPage.keywordResult.count()).toBeGreaterThan(10)
  })
})
