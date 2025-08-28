import { test, expect } from "@playwright/test"
import { RC_Home_Page } from "../../pages/rc_home_page"
import { SearchPage } from "../../pages/search_page"

let rcHomePage: RC_Home_Page
let searchPage: SearchPage
const keyword = "IBM 1401"

test.beforeEach(async ({ page }) => {
  rcHomePage = new RC_Home_Page(page)
  searchPage = new SearchPage(page, keyword)
  await page.goto("")
})

test.describe("Keyword Search", () => {
  test("Do a keyword search and assert that at least 10 returned titles contain the supplied keyword", async ({
    page,
  }) => {
    await expect(rcHomePage.search_input).toBeVisible()
    await rcHomePage.search_input.fill(keyword)
    await rcHomePage.search_submit_button.click()
    await expect(searchPage.results_count).toBeVisible()
    await expect(await searchPage.keywordResult.count()).toBeGreaterThan(10)
  })
})
