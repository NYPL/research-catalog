import { test, expect } from "@playwright/test"
import { RC_Home_Page } from "../../pages/rc_home_page"

test.describe("Global Header", () => {
  test("Verify global header elements appear on the Research Catalog home page", async ({
    page,
  }) => {
    const rcHomePage = new RC_Home_Page(page)
    await rcHomePage.goto()
    await expect(rcHomePage.nypl_logo).toBeVisible()
    await expect(rcHomePage.nypl_logo_img).toBeVisible()
    await expect(rcHomePage.header_my_account).toBeVisible()
    await expect(rcHomePage.header_locations).toBeVisible()
    await expect(rcHomePage.header_library_card).toBeVisible()
    await expect(rcHomePage.header_newsletter).toBeVisible()
    await expect(rcHomePage.header_donate).toBeVisible()
    await expect(rcHomePage.header_shop).toBeVisible()
    await expect(rcHomePage.header_books).toBeVisible()
    await expect(rcHomePage.header_research).toBeVisible()
    await expect(rcHomePage.header_education).toBeVisible()
    await expect(rcHomePage.header_events).toBeVisible()
    await expect(rcHomePage.header_connect).toBeVisible()
    await expect(rcHomePage.header_give).toBeVisible()
    await expect(rcHomePage.header_get_help).toBeVisible()
    await expect(rcHomePage.header_search).toBeVisible()
  })
})

test.describe("Research Catalog Home Page", () => {
  test("Verify elements on the Research Catalog home page", async ({
    page,
  }) => {
    const rcHomePage = new RC_Home_Page(page)
    await rcHomePage.goto()
    await expect(rcHomePage.header_my_account).toBeVisible()
    await expect(rcHomePage.researchCatalogHeading).toHaveText(
      "Research Catalog"
    )
    await expect(page).toHaveTitle(rcHomePage.page_title)
    await expect(rcHomePage.home_breadcrumb).toBeVisible()
    await expect(rcHomePage.research_breadcrumb).toBeVisible()
    await expect(rcHomePage.research_catalog_breadcrumb).toBeVisible()
    await expect(rcHomePage.search_tip).toBeVisible()
    await expect(rcHomePage.search_dropdown).toBeVisible()
    await expect(rcHomePage.search_input).toBeVisible()
    await expect(rcHomePage.search_submit_button).toBeVisible()
    await expect(rcHomePage.advanced_search_link).toBeVisible()
    await expect(rcHomePage.info_banner).toBeVisible()
    await expect(rcHomePage.info_banner).toContainText("New!")
    await expect(rcHomePage.body_main_heading).toBeVisible()
    await expect(rcHomePage.body_main_heading_text).toHaveText(
      /^Discover millions of items/
    )
    await expect(rcHomePage.research_at_nypl_heading).toBeVisible()
    await expect(rcHomePage.collections_heading).toBeVisible()
    await expect(rcHomePage.collections_heading_image).toBeVisible()
    await expect(rcHomePage.collections_heading_blurb).toContainText(
      "Discover our world-renowned research collections"
    )
    await expect(rcHomePage.locations_heading).toBeVisible()
    await expect(rcHomePage.locations_heading_image).toBeVisible()
    await expect(rcHomePage.locations_heading_blurb).toContainText(
      "Access items, one-on-one"
    )
    await expect(rcHomePage.divisions_heading).toBeVisible()
    await expect(rcHomePage.divisions_heading_image).toBeVisible()
    await expect(rcHomePage.divisions_heading_blurb).toContainText(
      "Learn about the subject and media"
    )
    await expect(rcHomePage.support_heading).toBeVisible()
    await expect(rcHomePage.support_heading_image).toBeVisible()
    await expect(rcHomePage.support_heading_blurb).toContainText(
      "Plan your in-person"
    )
    await expect(rcHomePage.services_heading).toBeVisible()
    await expect(rcHomePage.services_heading_image).toBeVisible()
    await expect(rcHomePage.services_heading_blurb).toContainText(
      "Explore services"
    )
  })
})

test.describe("Global Footer", () => {
  test("Verify global footer elements appear on the Research Catalog home page", async ({
    page,
  }) => {
    const rcHomePage = new RC_Home_Page(page)
    await rcHomePage.goto()
    await expect(rcHomePage.footer_container).toBeVisible()
    await expect(rcHomePage.help_and_feedback).toBeVisible()
  })
})
