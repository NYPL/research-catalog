import type { Page, Locator } from "@playwright/test"

export class SearchPage {
  readonly page: Page
  readonly results_count: Locator
  readonly keyword: string
  readonly keywordResult: Locator

  constructor(page: Page, keyword: string) {
    this.page = page
    this.keywordResult = page
      .locator("#search-results-list")
      .locator("h3")
      .getByRole("link", { name: new RegExp(keyword) })
    this.results_count = page.locator("#search-results-heading")
  }
}
