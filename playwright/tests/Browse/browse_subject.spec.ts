import { test, expect } from "@playwright/test"
import { BrowsePage } from "../../pages/browse_page"

let browsePage: BrowsePage
const searchterm = "Warr"

test.beforeEach(async ({ page }) => {
  browsePage = new BrowsePage(page, searchterm)
  await page.goto("/research/research-catalog/browse")
})

test.describe("Subject Heading Containing search", () => {
  test("Do a subject heading search and assert that at least 10 returned titles contain the supplied keyword", async () => {
    await browsePage.searchFor(searchterm, "Subject Headings containing")

    await expect(browsePage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })

    await expect(async () => {
      const count = await browsePage.searchResultsTitle.count()
      expect(count).toBeGreaterThan(20)
    }).toPass({ timeout: 5000 })
  })
})

test.describe("Subject Heading beginning with search", () => {
  test("Do a subject heading search and assert that at least 10 returned titles begin with the supplied keyword", async () => {
    await browsePage.searchFor(searchterm, "Subject Headings beginning with")

    await expect(browsePage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })

    await expect(async () => {
      const titles = await browsePage.searchResultsTitle.allTextContents()

      const count = titles.length
      expect(count).toBeGreaterThan(20)

      for (const title of titles) {
        expect(title.trim()).toMatch(new RegExp(`^${searchterm}`, "i"))
      }
    }).toPass({ timeout: 5000 })
  })
})
