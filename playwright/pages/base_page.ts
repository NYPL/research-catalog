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
  readonly researchCatalogHeading: Locator
  readonly search_the_catalog: Locator
  readonly shep: Locator
  readonly my_account: Locator
  // global footer
  readonly footer_library_text_image: Locator
  readonly footer_building_image: Locator
  readonly footer_copyright_text: Locator
  readonly footer_legal_text: Locator
  readonly footer_accessibility: Locator
  readonly footer_press: Locator
  readonly footer_careers: Locator
  readonly footer_space_rental: Locator
  readonly footer_privacy_policy: Locator
  readonly footer_other_policies: Locator
  readonly footer_terms: Locator
  readonly footer_governance: Locator
  readonly footer_rules_regulations: Locator
  readonly footer_about: Locator
  readonly footer_language: Locator

  readonly footer_container: Locator
  readonly help_and_feedback: Locator

  constructor(page: Page) {
    this.page = page
    this.nypl_logo = page.getByRole("link", {
      name: "The New York Public Library",
    })
    this.nypl_logo_img = this.nypl_logo.locator("svg")
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
    this.header_search = page.locator("#searchButton")
    // breadcrumbs
    this.home_breadcrumb = page.getByRole("link", { name: "Home" })
    this.research_breadcrumb = page
      .getByLabel("Breadcrumb")
      .getByRole("link", { name: "Research", exact: true })
    this.research_catalog_breadcrumb = page
      .getByLabel("Breadcrumb")
      .getByRole("link", { name: "Research Catalog", exact: true })
    // header elements below breadcrumbs
    this.researchCatalogHeading = page.getByRole("heading", {
      level: 1,
      name: "Research Catalog",
    })
    this.search_the_catalog = page.getByRole("link", {
      name: "Search the Catalog",
    })
    this.shep = page.getByRole("link", { name: "Subject Heading Explorer" })
    this.my_account = page.getByRole("link", {
      name: "My account for NYPL.org",
    })
    // Footer
    this.footer_library_text_image = page.getByRole("img", {
      name: "The New York Public Library",
    })
    this.footer_building_image = page.getByRole("img", {
      name: "NYPL Main Building Facade",
    })
    this.footer_copyright_text = page.getByText(
      "© The New York Public Library,"
    )
    this.footer_legal_text = page.getByText(
      "The New York Public Library is a 501(c)(3) | EIN 13-"
    )
    this.footer_accessibility = page
      .locator("footer")
      .getByRole("link", { name: "Accessibility" })
    this.footer_press = page.getByRole("link", { name: "Press" })
    this.footer_careers = page.getByRole("link", { name: "Careers" })
    this.footer_space_rental = page.getByRole("link", {
      name: "Space Rental",
    })
    this.footer_privacy_policy = page.getByRole("link", {
      name: "Privacy Policy",
    })
    this.footer_other_policies = page.getByRole("link", {
      name: "Other Policies",
    })
    this.footer_terms = page.getByRole("link", { name: "Terms & Conditions" })
    this.footer_governance = page.getByRole("link", { name: "Governance" })
    this.footer_rules_regulations = page.getByRole("link", {
      name: "Rules & Regulations",
    })
    this.footer_about = page.getByRole("link", { name: "About NYPL" })
    this.footer_language = page.getByRole("link", { name: "Language" })

    this.footer_container = page.locator("footer#footer")
    this.help_and_feedback = page.getByRole("button", {
      name: "Help and Feedback",
    })
  }
}
