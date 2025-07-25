import type { Page, Locator } from "@playwright/test"
import { BasePage } from "./base_page"

export class RC_Home_Page extends BasePage {
  readonly page_title: string
  readonly search_tip: Locator
  readonly search_dropdown: Locator
  readonly search_input: Locator
  readonly search_subtmit_button: Locator
  readonly advanced_search_link: Locator

  constructor(page: Page) {
    super(page)
    this.page_title = "Research Catalog | NYPL"
    this.search_tip = page.getByText(
      "Search tip: Enter one or more keywords. Use quotation marks to search for an exact phrase."
    )
    this.search_dropdown = page.getByLabel("Select a category")
    this.search_input = page.getByRole("textbox", {
      name: "Enter one or more keywords.",
    })
    this.search_subtmit_button = page.getByRole("button", {
      name: "Search",
      exact: true,
    })
    this.advanced_search_link = page.getByRole("link", {
      name: "Advanced Search",
    })
  }

  async goto() {
    await this.page.goto("/research/research-catalog")
  }

  async isHeadingVisible() {
    return this.h1.isVisible()
  }
}
