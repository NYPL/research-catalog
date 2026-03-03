import type { Page, Locator } from "@playwright/test"
import { BasePage } from "./base_page"

export class BibPage extends BasePage {
  readonly heading: Locator
  readonly topDetails: Locator
  readonly bottomDetails: Locator
  readonly itemTable: Locator
  readonly electronicResources: Locator
  readonly checkboxGroups: Locator
  readonly yearFilter: Locator
  readonly yearField: Locator
  readonly locationFilter: Locator
  readonly filterTag: Locator
  readonly pagination: Locator
  readonly viewAllLink: Locator
  readonly viewFewerButton: Locator
  readonly loadingMessage: Locator

  constructor(page: Page) {
    super(page)
    this.heading = page.locator("h2")
    this.topDetails = page.locator("section", {
      hasText: "Title",
    })
    this.bottomDetails = page.locator("section", {
      hasText: "Details",
    })
    this.itemTable = page.locator('[data-testid="bib-details-item-table"]')
    this.electronicResources = page.locator(
      '[data-testid="electronic-resources"]'
    )
    this.checkboxGroups = page.locator('[data-testid="checkbox-group"]')
    this.yearFilter = page.getByRole("form", { name: "Apply year filter" })
    this.yearField = page.getByRole("textbox", { name: "Search by year" })
    this.locationFilter = page.getByRole("button", {
      name: "Location, 0 items currently selected",
    })
    this.filterTag = page.locator('[data-testid="ds-tagSetFilter-tags"]')
    this.pagination = page.locator('[aria-label="Pagination"]')
    this.viewAllLink = page.locator("text=/View all/").first()
    this.viewFewerButton = page.locator("text=View fewer items")
    this.loadingMessage = page.locator("text=Loading all")
  }
  async navigate(id: string) {
    await this.page.goto(`bib/${id}`)
  }

  async clickFilterCheckbox() {
    await this.locationFilter.click()
    await this.page
      .locator("label", {
        hasText: "SASB S3 - Periodicals Rm 108",
      })
      .click()
  }

  async submitYear(year: string) {
    await this.yearField.fill(year)
    await this.yearFilter.locator('button[type="submit"]').click()
  }

  async clearFilterTag() {
    await this.filterTag.press("Enter")
  }

  async clickViewAll() {
    await this.viewAllLink.click()
  }

  async clickViewFewer() {
    await this.viewFewerButton.click()
  }
}
