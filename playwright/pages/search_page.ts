import type { Page, Locator } from "@playwright/test"

export class SearchPage {
  readonly page: Page
  readonly searchterm: string
  readonly search_input: Locator
  readonly search_dropdown: Locator
  searchType: string
  readonly search_submit_button: Locator
  readonly searchResultsContainer: Locator
  readonly searchResults: Locator
  readonly searchResultsTitle: Locator

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
    this.searchResultsContainer = page.locator("#search-results-list")

    this.searchResults = page.locator("#search-results-list h3 a")
    this.searchResultsTitle = page
      .locator("#search-results-list")
      .getByRole("link", { name: new RegExp(this.searchterm) })
  }
  get searchResultsHeading() {
    return this.page.getByRole("heading", {
      name: new RegExp(
        `results for ${this.searchType}s? "${this.searchterm}"`,
        "i"
      ),
    })
  }
  async searchFor(searchterm: string, searchType = "Keyword") {
    this.searchType = searchType
    await this.search_dropdown.selectOption({ label: searchType })
    await this.search_input.fill(searchterm)
    await this.search_submit_button.click()
  }
}
