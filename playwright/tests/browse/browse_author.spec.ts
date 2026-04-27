import { test, expect } from "@playwright/test"
import { BrowsePage } from "../../pages/browse_page"

let browsePage: BrowsePage
const searchterm = "Smith"

test.beforeEach(async ({ page }) => {
  browsePage = new BrowsePage(page, searchterm)
  await page.goto("/research/research-catalog/browse")
})

test.describe("Authors/Contributors Containing search", () => {
  test("Do an author/contributor search and assert that at least 10 returned titles from the Authors/Contributors index contain the supplied keyword", async () => {
    // assert that the banner is visible before performing the search to ensure the page has loaded
    await expect(browsePage.banner).toBeVisible({
      timeout: 15000,
    })
    await browsePage.searchFor(searchterm, "Authors/Contributors containing")

    await expect(browsePage.searchResultsHeading).toBeVisible({
      timeout: 25000,
    })

    await expect(async () => {
      const count = await browsePage.searchResultsTitle.count()
      expect(count).toBeGreaterThan(15)
    }).toPass({ timeout: 15000 })
    // assert that the href of each returned title contains the expected path for an author heading browse result
    const links = browsePage.searchResultsTitleLinks
    const linkCount = await links.count()
    expect(linkCount).toBeGreaterThan(0)

    for (let i = 0; i < linkCount; i++) {
      await expect(links.nth(i)).toHaveAttribute(
        "href",
        /\/research\/research-catalog\/browse\/authors\//
      )
    }
  })
})

test.describe("Authors/Contributors variants", () => {
  test("Do an author/contributor search and assert that variants do not have a link, does not have a count, and has a 'See:' label", async () => {
    await expect(browsePage.banner).toBeVisible({ timeout: 15000 })
    await browsePage.searchFor(searchterm, "Authors/Contributors containing")
    await expect(async () => {
      const rows = browsePage.page.locator("table tbody tr")
      const variantRows = rows.filter({ hasText: "See:" })

      const variantRowCount = await variantRows.count()
      expect(variantRowCount).toBeGreaterThan(0)

      for (let i = 0; i < variantRowCount; i++) {
        const row = variantRows.nth(i)
        const subjectCell = row.locator("td").nth(0)
        const countCell = row.locator("td").nth(1)

        // Assert the variant title itself does not have a link
        await expect(subjectCell.locator("span > div > a[href]")).toHaveCount(0)

        // Assert it has a "See:" label
        await expect(subjectCell).toContainText("See:")

        // Assert it does not have a count
        await expect(countCell).not.toContainText(/\d{1,3}(,\d{3})*/)
      }
    }).toPass({ timeout: 15000 })
  })
})

test.describe("Authors/Contributors beginning with search", () => {
  test("Do an author/contributor search and assert that at least 10 returned titles from the Authors/Contributors index begin with the supplied keyword", async () => {
    await browsePage.searchFor(
      searchterm,
      "Authors/Contributors beginning with"
    )

    await expect(browsePage.searchResultsHeading).toBeVisible({
      timeout: 35000,
    })

    await expect(async () => {
      const titles = await browsePage.searchResultsTitle.allTextContents()

      const count = titles.length
      expect(count).toBeGreaterThan(20)

      for (const title of titles) {
        expect(title.trim()).toMatch(new RegExp(`^${searchterm}`, "i"))
      }
    }).toPass({ timeout: 35000 })
  })
})
test.describe("Authors/Contributors sort order", () => {
  test("Do an author/contributor search and assert that the returned titles from the Authors/Contributors index are the default order of Count high to low", async () => {
    await browsePage.searchFor(searchterm, "Authors/Contributors containing")

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
  test("Do an author/contributor search and assert that the returned titles from the Authors/Contributors index can be sorted by Count low to high", async () => {
    await browsePage.searchFor(searchterm, "Authors/Contributors containing")

    await expect(browsePage.searchResultsHeading).toBeVisible({
      timeout: 60000,
    })
    await browsePage.page.getByRole("button", { name: /Sort by:/i }).click()
    await browsePage.sortResultsLowToHigh.click()

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
