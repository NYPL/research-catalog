import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage
const searchterm = "82048999"

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page, searchterm)
  await page.goto("")
})

test.describe("Unique Identifier Search", () => {
  test("Do a unique identifier search and assert that the item returned contains the supplied unique identifier", async ({
    page,
  }) => {
    await searchPage.searchFor(searchterm, "Unique identifier")
    await expect(searchPage.searchResultsHeading).toBeVisible()
    // click on the title of the first search result
    await searchPage.searchResults.first().click()
    // assert that the unique identifier is present on the item detail page
    await expect(page.getByText(new RegExp(searchterm))).toBeVisible()
  })
})
