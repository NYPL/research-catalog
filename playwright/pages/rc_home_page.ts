import type { Page, Locator } from "@playwright/test"
import { BasePage } from "./base_page"

export class RC_Home_Page extends BasePage {
  readonly page_title: string
  readonly search_tip: Locator
  readonly search_dropdown: Locator
  readonly search_input: Locator
  readonly search_submit_button: Locator
  readonly advanced_search_link: Locator
  readonly info_banner: Locator
  readonly body_main_heading: Locator
  readonly body_main_heading_text: Locator
  readonly research_at_nypl_heading: Locator
  readonly collections_heading: Locator
  readonly collections_heading_image: Locator
  readonly collections_heading_blurb: Locator
  readonly locations_heading: Locator
  readonly locations_heading_image: Locator
  readonly locations_heading_blurb: Locator
  readonly divisions_heading: Locator
  readonly divisions_heading_image: Locator
  readonly divisions_heading_blurb: Locator
  readonly support_heading: Locator
  readonly support_heading_image: Locator
  readonly support_heading_blurb: Locator
  readonly services_heading: Locator
  readonly services_heading_image: Locator
  readonly services_heading_blurb: Locator

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
    this.search_submit_button = page.getByRole("button", {
      name: "Search",
      exact: true,
    })
    this.advanced_search_link = page.getByRole("link", {
      name: "Advanced Search",
    })
    this.info_banner = page.getByText("Try Article Plus to discover")
    this.body_main_heading = page.getByRole("heading", {
      name: "Explore the Library's Vast Research Collections & More",
    })
    this.body_main_heading_text = page.getByText("Discover millions of items")
    this.research_at_nypl_heading = page.getByRole("heading", {
      name: "Research at NYPL",
    })

    this.collections_heading = page.getByRole("link", { name: "Collections" })
    this.collections_heading_image = page.getByRole("img", {
      name: "Manuscript from NYPL Research",
    })
    this.collections_heading_blurb = page.getByText(
      "Discover our world-renowned"
    )

    this.locations_heading = page.getByRole("heading", {
      name: "Locations",
      level: 4,
    })
    this.locations_heading_image = page.getByRole("img", {
      name: "Exterior shot of Stephen A.",
    })
    this.locations_heading_blurb = page.getByText("Access items, one-on-one")

    this.divisions_heading = page.getByRole("link", { name: "Divisions" })
    this.divisions_heading_image = page.getByRole("img", {
      name: "The Lionel Pincus and",
    })
    this.divisions_heading_blurb = page.getByText(
      "Learn about the subject and media"
    )

    this.support_heading = page.getByRole("link", { name: "Support" })
    this.support_heading_image = page.getByRole("img", {
      name: "Man doing research in Rose",
    })
    this.support_heading_blurb = page.getByText("Plan your in-person")

    this.services_heading = page.getByRole("link", { name: "Services" })
    this.services_heading_image = page.getByRole("img", {
      name: "Man wheeling cart in NYPL",
    })
    this.services_heading_blurb = page.getByText("Explore services for online")
  }
}
