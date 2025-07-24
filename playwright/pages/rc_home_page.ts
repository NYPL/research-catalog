import type { Page } from "@playwright/test"
import { BasePage } from "./base_page"

export class RC_Home_Page extends BasePage {
  readonly page_title: string

  constructor(page: Page) {
    super(page)
    this.page_title = "Research Catalog | NYPL"
  }

  async goto() {
    await this.page.goto("/research/research-catalog")
  }

  async isHeadingVisible() {
    return this.h1.isVisible()
  }
}
