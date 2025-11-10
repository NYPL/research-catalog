import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage
const searchterm = "Ornithology"

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page, searchterm, "subject")
  await page.goto("")
})

test.describe("Subject Search", () => {
  test("Do a subject search and assert that the first 5 returned titles contain the supplied subject", async ({
    page,
  }) => {
    await searchPage.searchFor(searchterm, "Subject")
    await expect(searchPage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })

    // Collect all title link URLs (limit to 5)
    const titleLinks = await page.locator("#search-results-list h3 a").all()
    const urls = []
    for (const link of titleLinks.slice(0, 5)) {
      urls.push(await link.getAttribute("href"))
    }

    expect(urls.length).toBe(5)

    // Visit each URL and assert searchterm (in this case, subject) appears on the page as a link
    for (const url of urls) {
      await page.goto(url)
      await expect(
        page.getByRole("link", { name: new RegExp(`^${searchterm}$`) }).first()
      ).toBeVisible({ timeout: 10000 })
    }
  })
})
