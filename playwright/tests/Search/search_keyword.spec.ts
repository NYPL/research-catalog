import { test, expect } from "@playwright/test"
import { RC_Home_Page } from "../../pages/rc_home_page"
import { SearchPage } from "../../pages/search_page"
let rcHomePage: RC_Home_Page
let searchPage: SearchPage

test.beforeEach(async ({ page }) => {
  rcHomePage = new RC_Home_Page(page)
  searchPage = new SearchPage(page)
  await page.goto("")
})

test.describe("Keyword Search", () => {
  test("Do a keyword search and verify that at least 8 of the first 10 results has the supplied keyword in the title field", async ({
    page,
  }) => {
    await expect(rcHomePage.search_input).toBeVisible()
    await rcHomePage.search_input.fill("IBM 1401")
    await rcHomePage.search_submit_button.click()
    // sleep 1 second
    await page.waitForTimeout(1000)
    await expect(searchPage.results_count).toContainText("keywords")
    // assert that at least 8 of the first 10 results has the supplied keyword in the title field
    const titles = await searchPage.results_title.allTextContents()
    const matchingTitles = titles.filter((title) => title.includes("IBM 1401"))
    expect(matchingTitles.length).toBeGreaterThanOrEqual(8)
  })
})
