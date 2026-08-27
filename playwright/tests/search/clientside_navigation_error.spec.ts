import { test, expect } from "@playwright/test"
import { SearchPage } from "../../pages/search_page"

test.describe("clientside navigation error (WAF non-json)", () => {
  test("shows error page with reload link when routeChangeError fires", async ({
    page,
  }) => {
    const searchPage = new SearchPage(page, "toast")
    await page.goto("")
    await searchPage.searchFor("toast", "Keyword")
    await expect(searchPage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })

    await page.evaluate(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).next.router.events.emit(
        "routeChangeError",
        new Error("Unexpected token '<'"),
        window.location.pathname
      )
    })

    await expect(
      page.getByRole("heading", { name: "Something went wrong on our end" })
    ).toBeVisible()
    await expect(page.getByText("reloading the page")).toBeVisible()
  })

  test("reload link triggers a full page reload", async ({ page }) => {
    const searchPage = new SearchPage(page, "toast")
    await page.goto("")
    await searchPage.searchFor("toast", "Keyword")
    await expect(searchPage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })

    await page.evaluate(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).next.router.events.emit(
        "routeChangeError",
        new Error("Unexpected token '<'"),
        window.location.pathname
      )
    })

    await expect(
      page.getByRole("heading", { name: "Something went wrong on our end" })
    ).toBeVisible()

    await Promise.all([
      page.waitForURL(page.url()),
      page.getByText("reloading the page").click(),
    ])

    // After reload, the search results page should render fine
    await expect(searchPage.searchResultsHeading).toBeVisible({
      timeout: 15000,
    })
  })
})
