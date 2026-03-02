import { test, expect } from "@playwright/test"
import { BasePage } from "../pages/base_page"

let basePage: BasePage

test.beforeEach(async ({ page }) => {
  basePage = new BasePage(page)
  await page.goto("")
})

test.describe("Global Header", () => {
  test("Verify global header elements appear", async () => {
    await expect(basePage.nypl_logo).toBeVisible()
    await expect(basePage.nypl_logo_img).toBeVisible()
    await expect(basePage.header_my_account).toBeVisible()
    await expect(basePage.header_locations).toBeVisible()
    await expect(basePage.header_library_card).toBeVisible()
    await expect(basePage.header_newsletter).toBeVisible()
    await expect(basePage.header_donate).toBeVisible()
    await expect(basePage.header_shop).toBeVisible()
    await expect(basePage.header_books).toBeVisible()
    await expect(basePage.header_research).toBeVisible()
    await expect(basePage.header_education).toBeVisible()
    await expect(basePage.header_events).toBeVisible()
    await expect(basePage.header_connect).toBeVisible()
    await expect(basePage.header_give).toBeVisible()
    await expect(basePage.header_get_help).toBeVisible()
    await expect(basePage.header_search).toBeVisible()
  })
})
test.describe("Global Footer", () => {
  test("Verify global footer elements appear", async () => {
    await expect(basePage.footer_library_text_image).toBeVisible()
    await expect(basePage.footer_building_image).toBeVisible()
    await expect(basePage.footer_copyright_text).toBeVisible()
    await expect(basePage.footer_legal_text).toBeVisible()
    await expect(basePage.footer_accessibility).toBeVisible()
    await expect(basePage.footer_press).toBeVisible()
    await expect(basePage.footer_careers).toBeVisible()
    await expect(basePage.footer_space_rental).toBeVisible()
    await expect(basePage.footer_privacy_policy).toBeVisible()
    await expect(basePage.footer_other_policies).toBeVisible()
    await expect(basePage.footer_terms).toBeVisible()
    await expect(basePage.footer_governance).toBeVisible()
    await expect(basePage.footer_rules_regulations).toBeVisible()
    await expect(basePage.footer_about).toBeVisible()
    await expect(basePage.footer_language).toBeVisible()
    await expect(basePage.footer_space_rental).toBeVisible()
    await expect(basePage.footer_space_rental).toBeVisible()
    await expect(basePage.footer_container).toBeVisible()
    await expect(basePage.help_and_feedback).toBeVisible()
  })
})
