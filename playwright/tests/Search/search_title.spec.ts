import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage
const searchterm = "It happened in New York"

// Scroll down screen height
async function scrollOneScreen(page): Promise<void> {
  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight)
  })
  await page.waitForTimeout(500)
}

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page, searchterm, "title")
  await page.goto("")
  await page.waitForLoadState("networkidle")
})

test.describe("Title Search", () => {
  test("Do a title search and assert that at least 10 returned titles contain the supplied keyword", async ({
    page,
  }) => {
    await searchPage.searchFor(searchterm, "Title")

    await expect(searchPage.searchResultsHeading).toBeVisible({
      timeout: 30000,
    })

    // Scroll twice? to load results below the fold in CI
    await scrollOneScreen(page)

    const resultCount = await searchPage.searchResultsTitle.count()
    expect(resultCount).toBeGreaterThan(10)
  })
})
