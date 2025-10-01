import type { Page, Locator } from "@playwright/test"

export class SearchPage {
  readonly page: Page
  readonly searchResult: Locator
  readonly search_input: Locator
  readonly search_submit_button: Locator
  readonly resultsHeading: Locator
  readonly searchterm: string
  readonly search_dropdown: Locator
  readonly searchType: string
  readonly searchResults: Locator
  readonly searchResultsTitle: Locator
  readonly searchResultsCallNumber: Locator

  constructor(page: Page, searchterm: string, searchType = "Keyword") {
    this.page = page
    this.searchterm = searchterm
    this.searchType = searchType
    this.search_dropdown = page.getByRole("combobox", {
      name: "Select a category",
    })
    this.search_input = page.getByRole("textbox")
    this.search_submit_button = page.getByRole("button", {
      name: "Search",
      exact: true,
    })
    this.searchResult = page
      .locator("#search-results-list")
      .getByRole("link", { name: new RegExp(this.searchterm) })
    this.resultsHeading = this.page.getByRole("heading", {
      name: new RegExp(
        `^Displaying (\\d+-\\d+|\\d+) of (over )?\\d{1,3}(,\\d{3})* results for ${this.searchType}s? "${this.searchterm}"$`,
        "i"
      ),
    })
    this.searchResults = page.locator("#search-results-list h3 a")
    this.searchResultsTitle = page
      .locator("#search-results-list")
      .getByRole("link", { name: new RegExp(this.searchterm) })
    this.searchResultsCallNumber = page.locator(
      '#search-results-list table td:has-text("CALL NUMBER") td p span'
    )
  }

  async searchFor(searchterm: string, searchType = "Keyword") {
    await this.search_dropdown.selectOption({ label: searchType })
    await this.search_input.fill(searchterm)
    await this.search_submit_button.click()
  }
}
