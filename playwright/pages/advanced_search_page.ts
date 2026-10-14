import type { Page, Locator } from "@playwright/test"

export class AdvancedSearchPage {
  readonly page: Page

  readonly heading: Locator

  readonly keywordInput: Locator
  readonly titleInput: Locator
  readonly contributorInput: Locator
  readonly callNumberInput: Locator
  readonly uniqueIdentifierInput: Locator
  readonly subjectInput: Locator
  readonly genreInput: Locator
  readonly seriesInput: Locator

  readonly dateFromInput: Locator
  readonly dateToInput: Locator

  readonly formatFilterButton: Locator
  readonly itemLocationFilterButton: Locator
  readonly languageFilterButton: Locator
  readonly divisionFilterButton: Locator

  readonly submitButton: Locator
  readonly clearButton: Locator
  readonly errorBanner: Locator
  readonly searchResultsHeading: Locator
  readonly activeFilters: Locator

  constructor(page: Page) {
    this.page = page

    this.heading = page.getByRole("heading", {
      level: 2,
      name: "Advanced search",
    })

    this.keywordInput = page.getByLabel("Keyword")
    this.titleInput = page.getByLabel("Title")
    this.contributorInput = page.getByLabel("Author/Contributor")
    this.callNumberInput = page.getByLabel("Call number")
    this.uniqueIdentifierInput = page.getByLabel("Unique identifier")
    this.subjectInput = page.getByLabel("Subject")
    this.genreInput = page.getByLabel("Genre")
    this.seriesInput = page.getByLabel("Series")

    this.dateFromInput = page.getByRole("textbox", {
      name: "From",
      exact: true,
    })
    this.dateToInput = page.getByRole("textbox", { name: "To", exact: true })

    this.formatFilterButton = page.getByRole("button", { name: "Format" })
    this.itemLocationFilterButton = page.getByRole("button", {
      name: "Item location",
    })
    this.languageFilterButton = page.getByRole("button", { name: "Language" })
    this.divisionFilterButton = page.getByRole("button", { name: "Division" })

    this.submitButton = page.getByTestId("submit-advanced-search-button")
    this.clearButton = page.getByTestId("clear-advanced-search-button")
    this.errorBanner = page.locator("#advanced-search-error")
    this.searchResultsHeading = page.getByTestId("search-results-heading")
    this.activeFilters = page.getByTestId("ds-tagSetFilter-tags")
  }

  async navigate() {
    await this.page.goto("search/advanced")
  }

  // Opens the given filter's accordion and checks the option with the given label.
  async selectFilterOption(filterButton: Locator, optionLabel: string) {
    await filterButton.click()
    await this.page
      .locator("label", { hasText: new RegExp(`^${optionLabel}$`) })
      .click()
  }

  async submit() {
    await this.submitButton.click()
  }

  async clear() {
    await this.clearButton.click()
  }
}
