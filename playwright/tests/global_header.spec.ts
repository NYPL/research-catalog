import { test, expect } from "@playwright/test"
import { BasePage } from "../pages/base_page"

let basePage: BasePage

test.beforeEach(async ({ page }) => {
  basePage = new BasePage(page)
  await basePage.goto()
})

test.describe("Global Header", () => {
  test("Verify global header elements appear and resolve to the correct landing pages", async ({
    page,
  }) => {
    const headerLinks = [
      {
        locator: basePage.nypl_logo,
        expectedTitle: "The New York Public Library",
      },
      {
        locator: basePage.header_locations,
        expectedTitle: "Location Finder | The New York Public Library",
      },
      {
        locator: basePage.header_library_card,
        expectedTitle: "Library Card Application Form | NYPL",
      },
      {
        locator: basePage.header_newsletter,
        expectedTitle: "Subscription Center | The New York Public Library",
      },
      {
        locator: basePage.header_donate,
        expectedTitle:
          "Make Your Tax-Deductible Gift Today - New York Public Library",
      },

      {
        locator: basePage.header_shop,
        expectedTitle: "The New York Public Library Shop",
      },
      {
        locator: basePage.header_books,
        expectedTitle: "Books/Music/Movies | The New York Public Library",
      },
      {
        locator: basePage.header_research,
        expectedTitle: "Research | The New York Public Library",
      },
      {
        locator: basePage.header_education,
        expectedTitle: "Education | The New York Public Library",
      },
      {
        locator: basePage.header_events,
        expectedTitle: "Events | The New York Public Library",
      },
      {
        locator: basePage.header_connect,
        expectedTitle: "Connect | The New York Public Library",
      },
      {
        locator: basePage.header_give,
        expectedTitle: "Give | The New York Public Library",
      },
      {
        locator: basePage.header_get_help,
        expectedTitle: "Get Help | The New York Public Library",
      },
    ]

    for (const { locator, expectedTitle } of headerLinks) {
      await locator.click()
      await expect(page).toHaveTitle(expectedTitle)
      await basePage.goto() // go back to home for the next link
    }
  })
  // Search and My Account do not resolve to a new page.  Just test for visibility. Funcationality is tested elsewhere.
  test("Verify Search and My Account buttons appear in header", async () => {
    await expect(basePage.header_search).toBeVisible()
    await expect(basePage.header_my_account).toBeVisible()
  })
})
