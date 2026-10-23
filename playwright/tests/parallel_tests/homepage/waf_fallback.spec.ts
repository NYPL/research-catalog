import { test } from "@playwright/test"
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
    // simulate a WAF/captcha response, HTML body instead of JSON
    await page.route("**/_next/data/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "text/html",
        body: "<html><body>captcha challenge</body></html>",
      })
    )

    // trigger a client-side nav that would normally only hit /data
    await page
      .getByRole("link", { name: /browse the catalog/i })
      .first()
      .click()

    // a real nav to the data route URL should occur (window.location.assign)
    await page.waitForURL(/\/_next\/data\//)
  })
})
