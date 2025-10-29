import { test, expect } from "@playwright/test"
import { RC_Home_Page } from "../../pages/rc_home_page"
import { AccountPage } from "../../pages/account_page"

const username = process.env.QA_USERNAME
const password = process.env.QA_PASSWORD

// Helper to start on home, navigate to login, and return AccountPage
async function loginAndGetAccountPage(page) {
  const homePage = new RC_Home_Page(page)
  await page.goto("")
  await page.getByRole("link", { name: /my account/i }).click()
  const accountPage = new AccountPage(page)
  await accountPage.login(username, password)
  return accountPage
}

test.describe("My Account Login", () => {
  test("should log in and show account header", async ({ page }) => {
    const accountPage = await loginAndGetAccountPage(page)
    await expect(accountPage.accountHeader).toBeVisible()
  })
})

test.describe("Account Info Section", () => {
  test("should show labels and values", async ({ page }) => {
    const accountPage = await loginAndGetAccountPage(page)
    await expect(accountPage.nameLabel).toBeVisible()
    await expect(accountPage.name).toHaveText("QA Tester ILS")
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

test.describe("Tabs and Tables", () => {
  test("should show all tabs and table headers", async ({ page }) => {
    const accountPage = await loginAndGetAccountPage(page)
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
    await expect(accountPage.account_items_table_header_due_date).toBeVisible()
    await expect(accountPage.account_items_table_header_manage).toBeVisible()
  })

  test("should list at least one checkout", async ({ page }) => {
    const accountPage = await loginAndGetAccountPage(page)
    const checkoutsTable = page.locator("table", {
      has: page.getByRole("columnheader", { name: "Title" }),
    })
    await expect(checkoutsTable).toBeVisible({ timeout: 10000 })
    const titleLinks = checkoutsTable.getByRole("link")
    const count = await titleLinks.count()
    expect(count).toBeGreaterThan(0)
  })

  test("should list at least one request", async ({ page }) => {
    const accountPage = await loginAndGetAccountPage(page)
    await accountPage.tab_requests.click()
    const requestsTable = page.locator("table", {
      has: page.getByRole("columnheader", { name: "Title" }),
    })
    const requestTitleLinks = requestsTable.getByRole("link")
    const requestCount = await requestTitleLinks.count()
    expect(requestCount).toBeGreaterThan(0)
  })

  test("should list at least one fee", async ({ page }) => {
    const accountPage = await loginAndGetAccountPage(page)
    await accountPage.tab_fees.click()
    const feesTable = page.locator("table", {
      has: page.getByRole("columnheader", { name: "Amount" }),
    })
    const feeAmounts = feesTable.getByRole("cell", { name: /\$\d+/ })
    const feeCount = await feeAmounts.count()
    expect(feeCount).toBeGreaterThan(1)
  })
})

test.describe("Account Settings", () => {
  test("should show labels and values for account settings", async ({
    page,
  }) => {
    const accountPage = await loginAndGetAccountPage(page)
    await accountPage.tab_account_settings.click()

    const phonelabel = page.locator("p", { hasText: /phone/i })
    await expect(phonelabel).toBeVisible()
    const phoneValue = phonelabel.locator("xpath=following::div[1]")
    await expect(phoneValue).toHaveText(/^2125927256/)

    const emailLabel = page.locator("p", { hasText: /email/i }).first()
    await expect(emailLabel).toBeVisible()
    const emailValue = emailLabel.locator("xpath=following::div[1]")
    await expect(emailValue).toHaveText(/^chrismulholland@nypl.org/)

    const homeLibraryLabel = page.locator("p", { hasText: /home library/i })
    await expect(homeLibraryLabel).toBeVisible()
    const homeLibraryValue = homeLibraryLabel.locator("xpath=following::div[1]")
    await expect(homeLibraryValue).toHaveText(/^Stavros Niarchos/)

    const notificationPreferenceLabel = page.locator("p", {
      hasText: /notification preference/i,
    })
    await expect(notificationPreferenceLabel).toBeVisible()
    const notificationPreferenceValue = notificationPreferenceLabel.locator(
      "xpath=following::div[1]"
    )
    await expect(notificationPreferenceValue).toHaveText(/^Email/)

    const pinPasswordLabel = page.locator("p", {
      hasText: /pin\/password/i,
    })
    await expect(pinPasswordLabel).toBeVisible()
    const pinPasswordValue = pinPasswordLabel.locator("xpath=following::div[1]")
    await expect(pinPasswordValue).toHaveText(/^(\*\*\*\*)/)

    await expect(accountPage.edit_phone_link).toBeVisible()
    await expect(accountPage.edit_email_link).toBeVisible()
    await expect(accountPage.edit_home_library_link).toBeVisible()
    await expect(accountPage.edit_notification_preferences_link).toBeVisible()
    await expect(accountPage.edit_pin_password_link).toBeVisible()
  })
})
