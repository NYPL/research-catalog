import { test, expect } from "@playwright/test"
import { AdvancedSearchPage } from "../../../pages/advanced_search_page"

let advancedSearchPage: AdvancedSearchPage

test.beforeEach(async ({ page }) => {
  advancedSearchPage = new AdvancedSearchPage(page)
  await advancedSearchPage.navigate()
})

test.describe("Advanced Search filter pills behavior", () => {
  test("Select a format and a division, assert filter pills", async ({
    page,
  }) => {
    await expect(advancedSearchPage.heading).toBeVisible()

    await advancedSearchPage.selectFilterOption(
      advancedSearchPage.formatFilterButton,
      "Map"
    )
    // click format button again to collapse the accordion
    await advancedSearchPage.formatFilterButton.click()
    await advancedSearchPage.selectFilterOption(
      advancedSearchPage.divisionFilterButton,
      "Lionel Pincus and Princess Firyal Map Division"
    )
    await advancedSearchPage.submit()

    await expect(page).toHaveURL(/\/search\?/)
    await expect(advancedSearchPage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })
    // Assert that the filter count pills for the selected filters are visible in the left sidebar
    await expect(advancedSearchPage.filterCountPill("Format")).toBeVisible()
    await expect(advancedSearchPage.filterCountPill("Division")).toBeVisible()

    // Assert that the active filters section contains the selected filters (above results text heading)
    await expect(advancedSearchPage.activeFilters).toContainText([
      "Map",
      "Lionel Pincus and Princess Firyal Map Division",
    ])
  })
  test("Clicking a filter's count pill clears only that filter and returns focus to its button", async ({
    page,
  }) => {
    await expect(advancedSearchPage.heading).toBeVisible()

    await advancedSearchPage.selectFilterOption(
      advancedSearchPage.formatFilterButton,
      "Map"
    )
    await advancedSearchPage.formatFilterButton.click()
    await advancedSearchPage.selectFilterOption(
      advancedSearchPage.divisionFilterButton,
      "Lionel Pincus and Princess Firyal Map Division"
    )
    await expect(advancedSearchPage.filterCountPill("Format")).toBeVisible()
    await expect(advancedSearchPage.filterCountPill("Division")).toBeVisible()
    // Click the "Division" filter pill to remove it
    await advancedSearchPage.filterCountPill("Division").click()
    // expect the "Division" filter pill to be removed and the "Format" filter pill to remain visible
    await expect(advancedSearchPage.filterCountPill("Format")).toBeVisible()
    await expect(advancedSearchPage.filterCountPill("Division")).toBeHidden()
    // expect focus to move back to the "Division" filter button
    await expect(advancedSearchPage.divisionFilterButton).toBeFocused()
  })
  test("Clicking outside closes a filter", async ({ page }) => {
    await expect(advancedSearchPage.heading).toBeVisible()

    await advancedSearchPage.selectFilterOption(
      advancedSearchPage.formatFilterButton,
      "Map"
    )
    // expect the format filter to be open
    await expect(advancedSearchPage.formatFilterButton).toHaveAttribute(
      "aria-expanded",
      "true"
    )
    // click outside the filter to close it
    await advancedSearchPage.heading.click()
    // expect the format filter accordion to be collapsed
    await expect(advancedSearchPage.formatFilterButton).toHaveAttribute(
      "aria-expanded",
      "false"
    )
  })
  test("Clear fields resets everything", async ({ page }) => {
    await expect(advancedSearchPage.heading).toBeVisible()

    //fill in the text input fields
    await advancedSearchPage.keywordInput.fill("test keyword")
    await advancedSearchPage.titleInput.fill("test title")
    await advancedSearchPage.contributorInput.fill("test contributor")
    await advancedSearchPage.callNumberInput.fill("test call number")
    await advancedSearchPage.uniqueIdentifierInput.fill(
      "test unique identifier"
    )
    await advancedSearchPage.subjectInput.fill("test subject")
    await advancedSearchPage.genreInput.fill("test genre")
    await advancedSearchPage.seriesInput.fill("test series")
    await advancedSearchPage.dateFromInput.fill("2000")
    await advancedSearchPage.dateToInput.fill("2020")
    //select a format
    await advancedSearchPage.selectFilterOption(
      advancedSearchPage.formatFilterButton,
      "Map"
    )
    // close format filter accordion
    await advancedSearchPage.formatFilterButton.click()
    //select an item location
    await advancedSearchPage.selectFilterOption(
      advancedSearchPage.itemLocationFilterButton,
      "Schomburg Center for Research in Black Culture"
    )
    // close item location filter accordion
    await advancedSearchPage.itemLocationFilterButton.click()
    //select a language
    await advancedSearchPage.selectFilterOption(
      advancedSearchPage.languageFilterButton,
      "English"
    )
    // close language filter accordion
    await advancedSearchPage.languageFilterButton.click()
    //select a division
    await advancedSearchPage.selectFilterOption(
      advancedSearchPage.divisionFilterButton,
      "Lionel Pincus and Princess Firyal Map Division"
    )

    // Click the clear button
    await advancedSearchPage.clear()

    // Assert that all text input fields are cleared
    await expect(advancedSearchPage.keywordInput).toHaveValue("")
    await expect(advancedSearchPage.titleInput).toHaveValue("")
    await expect(advancedSearchPage.contributorInput).toHaveValue("")
    await expect(advancedSearchPage.callNumberInput).toHaveValue("")
    await expect(advancedSearchPage.uniqueIdentifierInput).toHaveValue("")
    await expect(advancedSearchPage.subjectInput).toHaveValue("")
    await expect(advancedSearchPage.genreInput).toHaveValue("")
    await expect(advancedSearchPage.seriesInput).toHaveValue("")
    await expect(advancedSearchPage.dateFromInput).toHaveValue("")
    await expect(advancedSearchPage.dateToInput).toHaveValue("")

    // Assert that all filter count pills are removed
    await expect(advancedSearchPage.filterCountPill("Format")).toBeHidden()
    await expect(
      advancedSearchPage.filterCountPill("Item location")
    ).toBeHidden()
    await expect(advancedSearchPage.filterCountPill("Language")).toBeHidden()
    await expect(advancedSearchPage.filterCountPill("Division")).toBeHidden()

    // Submitting the cleared form should show the "enter at least one field" banner
    await advancedSearchPage.submit()
    await expect(advancedSearchPage.errorBanner).toBeVisible()
  })
})
