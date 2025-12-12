import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage
const searchterm = "Dryden, John"

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page, searchterm)
  await page.goto("")
})

test.describe("Author Search", () => {
  test("Do an author search and assert that at least 5 returned titles contain the supplied author name", async ({
    page,
  }) => {
    await searchPage.searchFor(searchterm, "Author/contributor")
    await expect(searchPage.searchResultsHeading).toBeVisible({
      timeout: 10000,
    })

    // Collect all title link URLs (limit to 5)
    const titleLinks = await page.locator("#search-results-list h3 a").all()
    const urls = []
    for (const link of titleLinks.slice(0, 5)) {
      urls.push(await link.getAttribute("href"))
    }

    expect(urls.length).toBe(5)

    // Visit each URL and assert searchterm (in this case, author) appears on the page as a link
    for (const url of urls) {
      await page.goto(url)
      await expect(
        page.getByRole("link", { name: new RegExp(searchterm) })
      ).toBeVisible({ timeout: 10000 })
    }
  })
})
