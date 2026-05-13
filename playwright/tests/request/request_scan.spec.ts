import { test, expect } from "@playwright/test"
import { BibPage } from "../../pages/bib_page"
import { appConfig } from "../../../src/config/appConfig"
import { pickRequestBibId } from "../../fixtures/requestBibs"

const username = appConfig.testUser.username[appConfig.environment]
const password = process.env.QA_PASSWORD

test.describe("Requesting an item for scan", () => {
  test("starts on bib detail, requests item, logs in, selects pickup location, submits, and expects success message", async ({
    page,
  }) => {
    test.setTimeout(120_000)
    const bibPage = new BibPage(page)
    const bibId = pickRequestBibId()
    // send bibId to console so we can verify it's from the pool of requestable bibs if the test fails.
    console.log(`Testing with bibId: ${bibId}`)

    await bibPage.navigate(bibId)

    await page
      .getByRole("link", { name: /^Request scan/i })
      .first()
      .click()

    await page.getByLabel(/barcode/i).fill(username)
    await page.getByLabel(/pin/i).fill(password as string)
    await page.getByRole("button", { name: /submit/i }).click()

    await expect(
      page.getByRole("heading", { name: /Request scan/i })
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: /Required information/i })
    ).toBeVisible()

    await page.getByLabel(/Email address/i).fill("chrismulholland@nypl.org")
    await page
      .getByLabel(/Starting page number/i)
      .fill("testing. please ignore")
    await page.getByLabel(/Ending page number/i).fill("testing. please ignore")
    await page
      .getByLabel(/Chapter or article title/i)
      .fill("testing. please ignore")

    await page.getByRole("button", { name: /Submit request/i }).click()

    await expect(page.getByText("Request successful")).toBeVisible({
      timeout: 20000,
    })

    // visit account page and poll until the request appears (may take up to greater than 60s)
    await page.getByRole("link", { name: "My account for NYPL.org" }).click()
    await expect(
      page.getByRole("heading", { name: /My Account/i })
    ).toBeVisible()
    await expect
      .poll(
        async () => {
          await page.reload()
          await page.waitForLoadState("networkidle")
          await page
            .getByRole("tab", { name: /^Requests(?:\s*\(\d+\))?$/i })
            .click()
          return page.getByRole("button", { name: /Cancel request/i }).count()
        },
        { timeout: 90000, intervals: [5000, 10000, 15000, 15000] }
      )
      .toBeGreaterThan(0)
    await page
      .locator(`tr:has(a[href*="${bibId}"])`)
      .getByRole("button", { name: /Cancel request/i })
      .click()
    await page.getByRole("button", { name: /Yes, cancel request/i }).click()
    await expect(
      page.getByRole("heading", { name: /Request canceled/i })
    ).toBeVisible()
    await page.getByRole("button", { name: /Ok/i }).click()
  })
})
