import { test, expect } from "@playwright/test"
import { BibPage } from "../../pages/bib_page"
import { appConfig } from "../../../src/config/appConfig"

const username = appConfig.testUser.username[appConfig.environment]
const password = process.env.QA_PASSWORD

test.describe("Request flow", () => {
  test.skip(!password, "QA_PASSWORD must be set to run request flow test")

  test("starts on bib detail, requests item, logs in, selects pickup location, submits, and expects success message", async ({
    page,
  }) => {
    const bibPage = new BibPage(page)

    await bibPage.navigate("b10260769")

    await page
      .getByRole("link", { name: /^Request for onsite use/i })
      .first()
      .click()

    await page.getByLabel(/barcode/i).fill(username)
    await page.getByLabel(/pin/i).fill(password as string)
    await page.getByRole("button", { name: /submit/i }).click()

    await expect(
      page.getByRole("heading", { name: /Request for onsite use/i })
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: /Choose a pickup location/i })
    ).toBeVisible()

    const pickupOptions = page.getByRole("radio")
    await expect(pickupOptions.first()).toBeVisible()
    await pickupOptions.first().check()

    await page.getByRole("button", { name: /Submit request/i }).click()

    await expect(page.getByText("Request successful")).toBeVisible()
  })
})
