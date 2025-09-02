import type { Page, Locator } from "@playwright/test"

export class SearchPage {
  readonly page: Page
  readonly keywordResult: Locator
  readonly search_input: Locator
  readonly search_submit_button: Locator
  readonly resultsHeading: Locator
  readonly keyword: string

  constructor(page: Page, keyword: string) {
    this.page = page
    this.keyword = keyword
    this.search_input = page.getByRole("textbox", {
      name: "Enter one or more keywords.",
    })
    this.search_submit_button = page.getByRole("button", {
      name: "Search",
      exact: true,
    })
    this.keywordResult = page
      .locator("#search-results-list")
      .getByRole("link", { name: new RegExp(keyword) })
    this.resultsHeading = this.page.getByRole("heading", {
      name: new RegExp(
        `^Displaying (\\d+-\\d+|\\d+) of (over )?\\d{1,3}(,\\d{3})* results for keywords? "${this.keyword}"$`
      ),
    })
  }

  async searchFor(keyword: string) {
    await this.search_input.fill(keyword)
    await this.search_submit_button.click()
  }
}
