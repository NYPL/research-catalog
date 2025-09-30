import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

let searchPage: SearchPage
const searchterm = "JFD 93-1962"

test.beforeEach(async ({ page }) => {
  searchPage = new SearchPage(page, searchterm, "Call number")
  await page.goto("")
})

test.describe("Call Number Search", () => {
  test("Do a call number search and assert that at the item returned contains the supplied call number", async ({
    page,
  }) => {
    await searchPage.searchFor(searchterm, "Call number")
    await expect(searchPage.resultsHeading).toBeVisible()
    await expect(
      searchPage.page.getByTestId("card-content").getByText("JFD 93-1962")
    ).toBeVisible()
  })
})
