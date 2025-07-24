import type { Page, Locator } from "@playwright/test"

export class BasePage {
  readonly page: Page
  //   global header
  readonly nypl_logo: Locator
  readonly nypl_logo_img: Locator
  readonly header_my_account: Locator
  readonly header_locations: Locator
  readonly header_library_card: Locator
  readonly header_newsletter: Locator
  readonly header_donate: Locator
  readonly header_shop: Locator
  readonly header_books: Locator
  readonly header_research: Locator
  readonly header_education: Locator
  readonly header_events: Locator
  readonly header_connect: Locator
  readonly header_give: Locator
  readonly header_get_help: Locator
  readonly header_search: Locator
  // breadcrumbs
  readonly home_breadcrumb: Locator
  readonly research_breadcrumb: Locator
  readonly research_catalog_breadcrumb: Locator
  // header elements below breadcrumbs
  readonly h1: Locator
  readonly search_the_catalog: Locator
  readonly shep: Locator

  constructor(page: Page) {
    this.page = page
    this.nypl_logo = page.getByRole("link", {
      name: "The New York Public Library",
    })
    this.nypl_logo_img = this.nypl_logo.locator("img")
    this.header_my_account = page.getByRole("button", { name: "My Account" })
    this.header_locations = page
      .getByLabel("Header top links")
      .getByRole("link", { name: "Locations" })
    this.header_library_card = page.getByRole("link", {
      name: "Get A Library Card",
    })
    this.header_newsletter = page.getByRole("link", {
      name: "Get Email Updates",
    })
    this.header_donate = page.getByRole("link", { name: "Donate" })
    this.header_shop = page.getByRole("link", { name: "Shop" })
    this.header_books = page.getByRole("link", { name: "Books/Music/Movies" })
    this.header_research = page
      .getByLabel("Header bottom links")
      .getByRole("link", { name: "Research" })
    this.header_education = page
      .getByLabel("Header bottom links")
      .getByRole("link", { name: "Education" })
    this.header_events = page
      .getByLabel("Header bottom links")
      .getByRole("link", {
        name: "Events",
      })
    this.header_connect = page
      .getByLabel("Header bottom links")
      .getByRole("link", { name: "Connect" })
    this.header_give = page
      .getByLabel("Header bottom links")
      .getByRole("link", { name: "Give" })
    this.header_get_help = page
      .getByLabel("Header bottom links")
      .getByRole("link", { name: "Get Help" })
    this.header_search = page.getByRole("button", { name: "OpenSearch" })
    // breadcrumbs
    this.home_breadcrumb = page.getByRole("link", { name: "Home" })
    this.research_breadcrumb = page
      .getByTestId("layout-breadcrumbs")
      .getByRole("link", { name: "Research", exact: true })
    this.research_catalog_breadcrumb = page
      .getByTestId("layout-breadcrumbs")
      .getByRole("link", { name: "Research Catalog" })
    // header elements below breadcrumbs
    this.h1 = page.getByRole("heading", {
      level: 1,
      name: "Research Catalog",
    })
    this.search_the_catalog = page.getByRole("link", {
      name: "Search the Catalog",
    })
    this.shep = page.getByRole("link", { name: "Subject Heading Explorer" })
  }
}
