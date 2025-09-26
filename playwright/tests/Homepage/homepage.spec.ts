import { test, expect } from "@playwright/test"
import { RC_Home_Page } from "../../pages/rc_home_page"

let rcHomePage: RC_Home_Page

test.beforeEach(async ({ page }) => {
  rcHomePage = new RC_Home_Page(page)
  await page.goto("")
})

test.describe("Research Catalog Home Page", () => {
  test("Verify elements on the Research Catalog home page", async ({
    page,
  }) => {
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
