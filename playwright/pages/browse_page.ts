import type { Page, Locator } from "@playwright/test"

export class BrowsePage {
  readonly page: Page
  readonly searchterm: string
  searchType: string

  readonly banner: Locator
  readonly search_dropdown: Locator
  readonly search_input: Locator
  readonly search_submit_button: Locator
  readonly searchResultsTitle: Locator
  readonly searchResultsTitleLinks: Locator
  readonly sortResultsLowToHigh: Locator
  readonly titleCount: Locator

  constructor(
    page: Page,
    searchterm: string,
    searchType = "Subject Headings containing"
  ) {
    this.page = page
    this.searchterm = searchterm
    this.searchType = searchType
    this.banner = page.getByTestId("ds-banner")

    this.search_dropdown = page.getByLabel("Select a category")
    this.search_input = page.getByRole("textbox")
    this.search_submit_button = page.getByRole("button", {
      name: "Search",
      exact: true,
    })

    this.searchResultsTitle = page.locator("//span/div", {
      hasText: this.searchterm,
    })
    this.searchResultsTitleLinks = page.locator("//span/div/a", {
      hasText: this.searchterm,
    })

<<<<<<< no-ref/rework-back2index
    this.sortCountLowToHigh = page.getByRole("menuitem", {
=======
    this.sortResultsLowToHigh = page.getByRole("menuitem", {
>>>>>>> main
      name: "Results (Low - High)",
    })
    this.titleCount = page.locator(
      "//span[preceding-sibling::span[text()='Results']]"
    )
  }

  get searchResultsHeading() {
    return this.page.getByRole("heading", {
      name: new RegExp(
        `Displaying (\\d+-\\d+|\\d+) of (over )?\\d{1,3}(,\\d{3})* (results for )?${this.searchType}s? "${this.searchterm}"`,
        "i"
      ),
    })
  }

  // Perform search
  async searchFor(
    searchterm: string,
    searchType = "Subject Headings containing"
  ) {
    this.searchType = searchType
    await this.search_dropdown.selectOption({ label: searchType })

    await this.search_input.fill(searchterm)
    await this.search_submit_button.click()
  }
}
