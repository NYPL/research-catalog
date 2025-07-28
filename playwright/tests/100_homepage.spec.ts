import { test, expect } from "@playwright/test"
import { RC_Home_Page } from "../pages/rc_home_page"

test("Verify elements on the Research Catalog home page", async ({ page }) => {
  const rcHomePage = new RC_Home_Page(page)
  console.log("Navigating to the Research Catalog home page...")
  await rcHomePage.goto()
  // assert Header elements
  console.log("Checking if the NYPL logo is visible...")
  await expect(rcHomePage.nypl_logo).toBeVisible()
  console.log("Checking if the NYPL logo svg image is visible...")
  await expect(rcHomePage.nypl_logo_img).toBeVisible()
  console.log("Checking if the header 'My Account' is visible...")
  await expect(rcHomePage.header_my_account).toBeVisible()
  console.log("Checking if the header 'Locations' is visible...")
  await expect(rcHomePage.header_locations).toBeVisible()
  console.log("Checking if the header 'Get A Library Card' is visible...")
  await expect(rcHomePage.header_library_card).toBeVisible()
  console.log("Checking if the header 'Get Email Updates' is visible...")
  await expect(rcHomePage.header_newsletter).toBeVisible()
  console.log("Checking if the header 'Donate' is visible...")
  await expect(rcHomePage.header_donate).toBeVisible()
  console.log("Checking if the header 'Shop' is visible...")
  await expect(rcHomePage.header_shop).toBeVisible()
  console.log("Checking if the header 'Books/Music/Movies' is visible...")
  await expect(rcHomePage.header_books).toBeVisible()
  console.log("Checking if the header 'Research' is visible...")
  await expect(rcHomePage.header_research).toBeVisible()
  console.log("Checking if the header 'Education' is visible...")
  await expect(rcHomePage.header_education).toBeVisible()
  console.log("Checking if the header 'Events' is visible...")
  await expect(rcHomePage.header_events).toBeVisible()
  console.log("Checking if the header 'Connect' is visible...")
  await expect(rcHomePage.header_connect).toBeVisible()
  console.log("Checking if the header 'Give' is visible...")
  await expect(rcHomePage.header_give).toBeVisible()
  console.log("Checking if the header 'Get Help' is visible...")
  await expect(rcHomePage.header_get_help).toBeVisible()
  console.log("Checking if the header 'Search' is visible...")
  await expect(rcHomePage.header_search).toBeVisible()

  console.log("Checking if the header 'My Account' is visible...")
  await expect(rcHomePage.header_my_account).toBeVisible()

  console.log("Checking if heading is visible...")
  await expect(rcHomePage.isHeadingVisible()).resolves.toBe(true)
  console.log("Checking if heading text is 'Research Catalog'...")
  await expect(rcHomePage.h1).toHaveText("Research Catalog")

  console.log("Checking page title...")
  await expect(page).toHaveTitle(rcHomePage.page_title)
  console.log("Expecting home breadcrumb to be visible...")
  await expect(rcHomePage.home_breadcrumb).toBeVisible()
  console.log("Expecting research breadcrumb to be visible...")
  await expect(rcHomePage.research_breadcrumb).toBeVisible()
  console.log("Expecting research catalog breadcrumb to be visible...")
  await expect(rcHomePage.research_catalog_breadcrumb).toBeVisible()
  // Header ends
  console.log("Checking if search tip is visible...")
  await expect(rcHomePage.search_tip).toBeVisible()
  console.log("Checking if search dropdown is visible...")
  await expect(rcHomePage.search_dropdown).toBeVisible()
  console.log("Checking if search input is visible...")
  await expect(rcHomePage.search_input).toBeVisible()
  console.log("Checking if search submit button is visible...")
  await expect(rcHomePage.search_subtmit_button).toBeVisible()
  console.log("Checking if advanced search link is visible...")
  await expect(rcHomePage.advanced_search_link).toBeVisible()
  // assert that info banner is visible and contains some text
  console.log("Checking if info banner is visible...")
  await expect(rcHomePage.info_banner).toBeVisible()
  console.log("Checking if info banner contains text 'New!'...")
  await expect(rcHomePage.info_banner).toContainText("New!")
  console.log("Checking if main body heading is visible...")
  await expect(rcHomePage.body_main_heading).toBeVisible()
  console.log("Checking if main body heading text is correct...")
  await expect(rcHomePage.body_main_heading_text).toHaveText(
    /^Discover millions of items/
  )
  console.log("Checking if 'Research at NYPL' heading is visible...")
  await expect(rcHomePage.research_at_nypl_heading).toBeVisible()

  console.log("Checking if 'Collections' heading is visible...")
  await expect(rcHomePage.collections_heading).toBeVisible()
  console.log("Checking if 'Collections' heading image is visible...")
  await expect(rcHomePage.collections_heading_image).toBeVisible()
  console.log("Checking if 'Collections' blurb text is correct...")
  await expect(rcHomePage.collections_heading_blurb).toContainText(
    "Discover our world-renowned research collections"
  )

  console.log("Checking if 'Locations' heading is visible...")
  await expect(rcHomePage.locations_heading).toBeVisible()
  console.log("Checking if 'Locations' heading image is visible...")
  await expect(rcHomePage.locations_heading_image).toBeVisible()
  console.log("Checking if 'Locations' heading blurb is correct...")
  await expect(rcHomePage.locations_heading_blurb).toContainText(
    "Access items, one-on-one"
  )
  console.log("Checking if 'Divisions' heading is visible...")
  await expect(rcHomePage.divisions_heading).toBeVisible()
  console.log("Checking if 'Divisions' heading image is visible...")
  await expect(rcHomePage.divisions_heading_image).toBeVisible()
  console.log("Checking if 'Divisions' heading blurb is correct...")
  await expect(rcHomePage.divisions_heading_blurb).toContainText(
    "Learn about the subject and media"
  )

  console.log("Checking if 'Support' heading is visible...")
  await expect(rcHomePage.support_heading).toBeVisible()
  console.log("Checking if 'Support' heading image is visible...")
  await expect(rcHomePage.support_heading_image).toBeVisible()
  console.log("Checking if 'Support' heading blurb is correct...")
  await expect(rcHomePage.support_heading_blurb).toContainText(
    "Plan your in-person"
  )

  console.log("Checking if 'Services' heading is visible...")
  await expect(rcHomePage.services_heading).toBeVisible()
  console.log("Checking if 'Services' heading image is visible...")
  await expect(rcHomePage.services_heading_image).toBeVisible()
  console.log("Checking if 'Services' heading blurb is correct...")
  await expect(rcHomePage.services_heading_blurb).toContainText(
    "Explore services"
  )
  // Footer
  console.log("Checking if footer container is visible...")
  await expect(rcHomePage.footer_container).toBeVisible()
  console.log("Checking if 'Help and Feedback' button is visible...")
  await expect(rcHomePage.help_and_feedback).toBeVisible()
})
