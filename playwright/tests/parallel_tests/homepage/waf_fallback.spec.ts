import { test, expect } from "@playwright/test"
import { RC_Home_Page } from "../../../pages/rc_home_page"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let rcHomePage: RC_Home_Page

test.beforeEach(async ({ page }) => {
  rcHomePage = new RC_Home_Page(page)
  await page.goto("")
})

test.describe("HTML on data forced reload recovery", () => {
  test("forces a real navigation when a data fetch comes back as HTML", async ({
    page,
  }) => {
    // WAF/captcha response, HTML body instead of JSON
    await page.route("**/_next/data/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: "<html><body>captcha challenge</body></html>",
      })
    )

    // confirm the click's data fetch is the one that got
    // the unexpected HTML body
    const waitForHtmlDataResponse = page.waitForResponse(
      (response) =>
        response.url().includes("/_next/data") &&
        response.headers()["content-type"]?.includes("text/html")
    )

    // trigger a client-side nav that only hits /data
    await page
      .getByRole("link", { name: /browse the catalog/i })
      .first()
      .click()

    await waitForHtmlDataResponse

    // a real navigation should fire a fresh "load" event
    await page.waitForEvent("load")
  })
  test("does NOT force a real navigation when a data fetch comes back as data", async ({
    page,
  }) => {
    // waiting for this load event should time out instead of resolving
    const waitForHardNavigation = page.waitForEvent("load", { timeout: 3000 })

    // trigger a client-side nav that only hits /data for fresh JSON
    await page
      .getByRole("link", { name: /browse the catalog/i })
      .first()
      .click()

    // the page should NOT fire a "load" event
    await expect(waitForHardNavigation).rejects.toThrow()

    // confirm the nav still succeeded
    await expect(page).toHaveURL(/\/browse/)
  })
})
