import { test, expect } from "@playwright/test"
import { AdvancedSearchPage } from "../../../pages/advanced_search_page"

let advancedSearchPage: AdvancedSearchPage

test.beforeEach(async ({ page }) => {
  advancedSearchPage = new AdvancedSearchPage(page)
  await advancedSearchPage.navigate()
})

test.describe("Advanced Search", () => {
  test("Fill a text field and a filter, submit, and land on the search results page.  Assert by heading and active filters", async ({
    page,
  }) => {
    await expect(advancedSearchPage.heading).toBeVisible()

    await advancedSearchPage.keywordInput.fill("spaghetti")
    await advancedSearchPage.selectFilterOption(
      advancedSearchPage.languageFilterButton,
      "English"
    )
    await advancedSearchPage.submit()

    await expect(page).toHaveURL(/\/search\?/)
    await expect(advancedSearchPage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })
    await expect(advancedSearchPage.searchResultsHeading).toContainText(
      'keyword "spaghetti"'
    )

    await expect(advancedSearchPage.activeFilters).toContainText("English")
  })
})
