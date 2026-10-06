import { test, expect } from "@playwright/test"
import { AdvancedSearchPage } from "../../../pages/advanced_search_page"

let advancedSearchPage: AdvancedSearchPage

test.beforeEach(async ({ page }) => {
  advancedSearchPage = new AdvancedSearchPage(page)
  await advancedSearchPage.navigate()
})

test.describe("Advanced Search validation", () => {
  test("Expect an error banner when submitting an empty form", async ({
    page,
  }) => {
    await expect(advancedSearchPage.heading).toBeVisible()

    await advancedSearchPage.submit()

    await expect(advancedSearchPage.errorBanner).toBeVisible({ timeout: 10000 })
  })
  test("Expect an error banner when submitting an invalid date format", async ({
    page,
  }) => {
    await expect(advancedSearchPage.heading).toBeVisible()

    await advancedSearchPage.dateFromInput.fill("invalid-date")
    await advancedSearchPage.submit()

    await expect(advancedSearchPage.errorBanner).toBeVisible({ timeout: 10000 })
  })
  test("Expect an error banner and an in-line error message when submitting a date range with the 'From' date later than the 'To' date", async ({
    page,
  }) => {
    await expect(advancedSearchPage.heading).toBeVisible()

    await advancedSearchPage.dateFromInput.fill("2024")
    await advancedSearchPage.dateToInput.fill("2023")
    await advancedSearchPage.dateToInput.blur()
    //expect text "Error: End date must be later than start date." to be visible in-line
    await expect(
      advancedSearchPage.page.locator(
        "text=Error: End date must be later than start date."
      )
    ).toBeVisible()
    await advancedSearchPage.submit()

    await expect(advancedSearchPage.errorBanner).toBeVisible({ timeout: 10000 })
  })
})
