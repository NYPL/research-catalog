import { test, expect, type Browser, type Page } from "@playwright/test"
import { AccountPage } from "../../pages/account_page"

let page: Page
let accountPage: AccountPage

const username = process.env.QA_USERNAME
const password = process.env.QA_PASSWORD

test.describe.serial("Account page", () => {
  // Start on home, navigate to login, and wait for redirect to return to account page
  test.beforeAll(async ({ browser }: { browser: Browser }) => {
    const context = await browser.newContext()
    page = await context.newPage()

    await page.goto("")
    await page.getByRole("link", { name: /my account/i }).click()
    await page.getByLabel(/barcode/i).fill(username)
    await page.getByLabel(/pin/i).fill(password)
    await page.getByRole("button", { name: /submit/i }).click()

    await page.waitForSelector('h2:has-text("My Account")')

    accountPage = new AccountPage(page)
  })

  test.afterAll(async () => {
    await page.context().close()
  })

  test.describe("Account info", () => {
    test("should show labels and values", async () => {
      await expect(accountPage.nameLabel).toBeVisible()
      await expect(accountPage.name).toHaveText("PLAYWRIGHT TEST ACCOUNT GHA")
      await expect(accountPage.usernameLabel).toBeVisible()
      await expect(accountPage.username).toBeVisible()
      await expect(accountPage.usernameEditLink).toBeVisible()
      await expect(accountPage.cardnumberLabel).toBeVisible()
      await expect(accountPage.cardnumber).toBeVisible()
      await expect(accountPage.barcode).toBeVisible()
      await expect(accountPage.expirationLabel).toBeVisible()
      await expect(accountPage.expiration).toBeVisible()
    })
  })

  test.describe("Item tabs", () => {
    test("should show all tabs and table headers", async () => {
      await expect(accountPage.tab_checkouts).toBeVisible()
      await expect(accountPage.tab_requests).toBeVisible()
      await expect(accountPage.tab_fees).toBeVisible()
      await expect(accountPage.tab_account_settings).toBeVisible()

      await expect(accountPage.circulating_catalog_alert).toBeVisible()
      await expect(accountPage.account_items_table_header_title).toBeVisible()
      await expect(accountPage.account_items_table_header_barcode).toBeVisible()
      await expect(
        accountPage.account_items_table_header_callnumber
      ).toBeVisible()
      await expect(
        accountPage.account_items_table_header_due_date
      ).toBeVisible()
      await expect(accountPage.account_items_table_header_manage).toBeVisible()
    })

    test("should list at least one checkout", async () => {
      const checkoutsTable = page.locator("table", {
        has: page.getByRole("columnheader", { name: "Title" }),
      })

      await expect(checkoutsTable).toBeVisible({ timeout: 10000 })

      const titleLinks = checkoutsTable.getByRole("link")
      const count = await titleLinks.count()
      expect(count).toBeGreaterThan(0)
    })

    test("should list at least one request", async () => {
      await accountPage.tab_requests.click()

      const requestsTable = page.locator("table", {
        has: page.getByRole("columnheader", { name: "Title" }),
      })

      const requestTitleLinks = requestsTable.getByRole("link")
      const requestCount = await requestTitleLinks.count()
      expect(requestCount).toBeGreaterThan(0)
    })

    test("should list at least one fee", async () => {
      await accountPage.tab_fees.click()

      const feesTable = page.locator("table", {
        has: page.getByRole("columnheader", { name: "Amount" }),
      })

      const feeAmounts = feesTable.getByRole("cell", { name: /\$\d+/ })
      const feeCount = await feeAmounts.count()
      expect(feeCount).toBeGreaterThan(0)
    })
  })

  test.describe("Account settings", () => {
    test("should show labels and values for account settings", async () => {
      await accountPage.tab_account_settings.click()

      const phonelabel = page.locator("p", { hasText: /phone/i })
      await expect(phonelabel).toBeVisible()
      await expect(
        page
          .locator("p")
          .filter({ hasText: /phone/i })
          .locator("xpath=following::div[1]")
      ).toHaveText(/917[-]?660[-]?3326/)

      const emailLabel = page.locator("p", { hasText: /email/i }).first()
      await expect(emailLabel).toBeVisible()
      await expect(emailLabel.locator("xpath=following::div[1]")).toHaveText(
        /^chrismulholland@nypl.org/
      )

      const homeLibraryLabel = page.locator("p", {
        hasText: /home library/i,
      })
      await expect(homeLibraryLabel).toBeVisible()
      await expect(
        homeLibraryLabel.locator("xpath=following::div[1]")
      ).toHaveText(/^Allerton/)

      const notificationPreferenceLabel = page.locator("p", {
        hasText: /notification preference/i,
      })
      await expect(notificationPreferenceLabel).toBeVisible()
      await expect(
        notificationPreferenceLabel.locator("xpath=following::div[1]")
      ).toHaveText(/^Email/)

      const pinPasswordLabel = page.locator("p", {
        hasText: /pin\/password/i,
      })
      await expect(pinPasswordLabel).toBeVisible()
      await expect(
        pinPasswordLabel.locator("xpath=following::div[1]")
      ).toHaveText(/^(\*\*\*\*)/)

      await expect(accountPage.edit_phone_link).toBeVisible()
      await expect(accountPage.edit_email_link).toBeVisible()
      await expect(accountPage.edit_home_library_link).toBeVisible()
      await expect(accountPage.edit_notification_preferences_link).toBeVisible()
      await expect(accountPage.edit_pin_password_link).toBeVisible()
    })
  })
})
