import type { Page, Locator } from "@playwright/test"

export class SearchPage {
  readonly page: Page
  readonly search_input: Locator
  readonly search_submit_button: Locator
  readonly results_count: Locator
  readonly results_title: Locator

  constructor(page: Page) {
    this.page = page
    this.results_count = page.getByTestId("search-results-heading")
    this.results_title = page.locator("#search-results-list h3 a")
  }

  async searchFor(keyword: string) {
    await this.search_input.fill(keyword)
    await this.search_submit_button.click()
  }
}
