import { test, expect } from "@playwright/test"
import { BrowsePage } from "../../pages/browse_page"

let browsePage: BrowsePage
const searchterm = "Warr"

test.beforeEach(async ({ page }) => {
  browsePage = new BrowsePage(page, searchterm)
  await page.goto("/research/research-catalog/browse")
})

test.describe("Subject Heading Containing search", () => {
  test("Do a subject heading search and assert that at least 10 returned titles from the Subject Heading index contain the supplied keyword", async () => {
    // assert that the banner is visible before performing the search to ensure the page has loaded
    await expect(browsePage.banner).toBeVisible({
      timeout: 15000,
    })
    await browsePage.searchFor(searchterm, "Subject Headings containing")

    await expect(browsePage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })

    await expect(async () => {
      const count = await browsePage.searchResultsTitle.count()
      expect(count).toBeGreaterThan(20)
    }).toPass({ timeout: 5000 })
    // assert that the href of each returned title contains the expected path for a subject heading browse result
    const links = browsePage.searchResultsTitle
    const linkCount = await links.count()
    expect(linkCount).toBeGreaterThan(0)

    for (let i = 0; i < linkCount; i++) {
      await expect(links.nth(i)).toHaveAttribute(
        "href",
        /\/research\/research-catalog\/browse\/subjects\//
      )
    }
  })
})

test.describe("Subject Heading variants", () => {
  test("Do a subject heading search and assert that at least one result has a 'See also:' label followed by at least one link", async () => {
    await expect(browsePage.banner).toBeVisible({ timeout: 15000 })
    await browsePage.searchFor(searchterm, "Subject Headings containing")

    await expect(browsePage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })

    await expect(async () => {
      const count = await browsePage.seeAlsoLinks.count()
      expect(count).toBeGreaterThan(0)
    }).toPass({ timeout: 5000 })
  })
})

test.describe("Subject Heading beginning with search", () => {
  test("Do a subject heading search and assert that at least 10 returned titles from the Subject Heading index begin with the supplied keyword", async () => {
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
test.describe("Subject sort order", () => {
  test("Do a subject heading search and assert that the returned titles from the Subject Heading index are the default order of Count high to low", async () => {
    await browsePage.searchFor(searchterm, "Subject Headings containing")

    await expect(browsePage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })

    await expect(async () => {
      const rawCounts = await browsePage.titleCount.allTextContents()

      const counts = rawCounts
        .map((value) => Number.parseInt(value.replace(/,/g, "").trim(), 10))
        .filter((value) => Number.isFinite(value))

      expect(counts.length).toBeGreaterThan(0)

      for (let i = 1; i < counts.length; i++) {
        expect(counts[i - 1]).toBeGreaterThanOrEqual(counts[i])
      }
    }).toPass({ timeout: 5000 })
  })
  test("Do a subject heading search and assert that the returned titles from the Subject Heading index can be sorted by Count low to high", async () => {
    await browsePage.searchFor(searchterm, "Subject Headings containing")

    await expect(browsePage.searchResultsHeading).toBeVisible({
      timeout: 60000,
    })
    await browsePage.page.getByRole("button", { name: /Sort by:/i }).click()
    await browsePage.sortCountLowToHigh.click()

    await expect(async () => {
      const rawCounts = await browsePage.titleCount.allTextContents()

      const counts = rawCounts
        .map((value) => Number.parseInt(value.replace(/,/g, "").trim(), 10))
        .filter((value) => Number.isFinite(value))

      expect(counts.length).toBeGreaterThan(0)

      for (let i = 1; i < counts.length; i++) {
        expect(counts[i - 1]).toBeLessThanOrEqual(counts[i])
      }
    }).toPass({ timeout: 5000 })
  })
})
