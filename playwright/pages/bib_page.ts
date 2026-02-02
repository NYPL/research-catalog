import type { Page, Locator } from "@playwright/test"
import { BasePage } from "./base_page"

export class MarcPage extends BasePage {
  readonly recordTitle: Locator
  readonly bibLink: Locator
  readonly marcTable: Locator

  constructor(page: Page) {
    super(page)
    this.bibLink = page.getByRole("link", {
      name: "Go to standard view",
    })
    this.recordTitle = page.getByRole("heading", {
      name: "Life is a strange circle (updated 20180627) --245 10 $a, Maintenance test record-- 245 $b",
    })
    this.marcTable = page.getByRole("table")
  }
}
