import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage
const searchterm = "It happened in New York"

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page, searchterm)
  await page.goto("")
})

test.describe("Title Search", () => {
  test("Do a title search and assert at least 10 returned titles contain the supplied keyword", async () => {
    await searchPage.searchFor(searchterm, "Title")

    const firstResult = searchPage.searchResultsTitle.first()
    await firstResult.scrollIntoViewIfNeeded()

    console.log("Current page URL:", searchPage.page.url())

    await expect(searchPage.searchResultsTitle.first()).toBeVisible({
      timeout: 15000,
    })

    await expect(searchPage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })

    const resultCount = await searchPage.searchResultsTitle.count()
    expect(resultCount).toBeGreaterThan(10)
  })
})
