import { test, expect } from "@playwright/test"
import { RC_Home_Page } from "../pages/rc_home_page"

test("open baseURL and check for text", async ({ page }) => {
  const rcHomePage = new RC_Home_Page(page)
  console.log("Navigating to the Research Catalog home page...")
  await rcHomePage.goto()
  console.log("Checking if the NYPL logo is visible...")
  await expect(rcHomePage.nypl_logo).toBeVisible()
  console.log("Checking if the NYPL logo image is visible...")
  // await expect(rcHomePage.nypl_logo_img).toBeVisible()
  console.log("Checking if the header 'My Account' is visible...")
  await expect(rcHomePage.header_my_account).toBeVisible()

  console.log("Checking if heading is visible...")
  await expect(rcHomePage.isHeadingVisible()).resolves.toBe(true)
  console.log("Checking if heading text is 'Research Catalog'...")
  await expect(rcHomePage.h1).toHaveText("Research Catalog")
  // assert that the page has a title of Research Catalog | NYPL
  console.log("Checking page title...")
  await expect(page).toHaveTitle(rcHomePage.page_title)
  console.log("Expecting home breadcrumb to be visible...")
  await expect(rcHomePage.home_breadcrumb).toBeVisible()
  console.log("Expecting research breadcrumb to be visible...")
  await expect(rcHomePage.research_breadcrumb).toBeVisible()
  console.log("Expecting research catalog breadcrumb to be visible...")
  await expect(rcHomePage.research_catalog_breadcrumb).toBeVisible()
})
