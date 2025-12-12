import type { Page, Locator } from "@playwright/test"

export class SearchPage {
  readonly page: Page
  readonly searchterm: string
  searchType: string

  readonly search_dropdown: Locator
  readonly search_input: Locator
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
      .getByRole("link", { name: new RegExp(this.searchterm, "i") })
  }

  get searchResultsHeading() {
    return this.page.getByRole("heading", {
      name: new RegExp(
        `Displaying (\\d+-\\d+|\\d+) of (over )?\\d{1,3}(,\\d{3})* results for ${this.searchType}s? "${this.searchterm}"`,
        "i"
      ),
    })
  }

  // Perform search and automatically wait for results
  async searchFor(searchterm: string, searchType = "Keyword") {
    this.searchType = searchType

    // Wait for dropdown visible before selecting
    await this.search_dropdown.waitFor({ state: "visible", timeout: 10000 })
    await this.search_dropdown.selectOption({ label: searchType })

    await this.search_input.fill(searchterm)
    await this.search_submit_button.click()

    // Wait for at least one search result to appear
    await this.searchResultsTitle
      .first()
      .waitFor({ state: "visible", timeout: 20000 })

    // Scroll first result into view to trigger lazy loading in CI
    await this.searchResultsTitle.first().scrollIntoViewIfNeeded()
    await this.page.waitForTimeout(500)
  }

  // Scroll all results
  async scrollAllResults() {
    let prevHeight = 0
    for (let i = 0; i < 20; i++) {
      // max 20 scrolls
      const height = await this.searchResultsContainer.evaluate(
        (el) => el.scrollHeight
      )
      if (height === prevHeight) break
      await this.searchResultsContainer.evaluate((el) =>
        el.scrollBy(0, el.scrollHeight)
      )
      prevHeight = height
      await this.page.waitForTimeout(500)
    }
  }
}
