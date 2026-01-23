import { RC_Home_Page } from "../../pages/rc_home_page"

// Helper to start on home, navigate to login, and return AccountPage
async function loginAndGetAccountPage(page: Page) {
  const homePage = new RC_Home_Page(page)
  await page.goto("")
  await page.getByRole("link", { name: /my account/i }).click()
  const accountPage = new AccountPage(page)
  await accountPage.login(username, password)
  return accountPage
}
import { test, expect, type Browser, type Page } from "@playwright/test"
import { AccountPage } from "../../pages/account_page"

let page: Page
let accountPage: AccountPage

// credentials
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
      await expect(accountPage.name).toHaveText(process.env.QA_NAME)
      await expect(accountPage.usernameLabel).toBeVisible()
      await expect(accountPage.username).toHaveText(process.env.QA_USERNAME)
      await expect(accountPage.usernameEditLink).toBeVisible()
      await expect(accountPage.cardnumberLabel).toBeVisible()
      await expect(accountPage.cardnumber).toHaveText(process.env.QA_CARDNUMBER)
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
      const phoneValue = phonelabel.locator("xpath=following::div[1]")
      await expect(phoneValue).toHaveText(/\d{7,}/)

      const emailLabel = page.locator("p", { hasText: /email/i }).first()
      await expect(emailLabel).toBeVisible()
      const emailValue = emailLabel.locator("xpath=following::div[1]/div/p")
      const emailText = await emailValue.textContent()
      await expect(emailText.trim()).toMatch(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/)

      const homeLibraryLabel = page.locator("p", { hasText: /home library/i })
      await expect(homeLibraryLabel).toBeVisible()
      const homeLibraryValue = homeLibraryLabel.locator(
        "xpath=following::div[1]"
      )
      await expect(homeLibraryValue).toHaveText(/^Allerton/)

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

// tests for editing account settings are currently flaky; skipping for now until we implement new patron accont for playwright tests.
test.describe.skip("Account Settings edits", () => {
  test("should successfully edit user name", async ({ page }) => {
    const accountPage = await loginAndGetAccountPage(page)
    await accountPage.tab_account_settings.click()

    await accountPage.usernameEditLink.click()
    await expect(page.getByText("If you delete your username,")).toBeVisible()
    await accountPage.unsernameEditInput.waitFor({ state: "visible" })

    // Test invalid username (too long)
    const badnewUsername = "qatester2_EDITTED"
    await accountPage.unsernameEditInput.fill(badnewUsername)
    await expect(accountPage.unsernameEditInput).toHaveValue(badnewUsername)
    await expect(accountPage.saveChangesButton).toBeDisabled()

    // Test valid username
    const newUsername = "qatester2edit"
    await accountPage.unsernameEditInput.fill(newUsername)
    await expect(accountPage.unsernameEditInput).toHaveValue(newUsername)
    await expect(accountPage.saveChangesButton).toBeEnabled()
    await accountPage.saveChangesButton.click()

    await expect(accountPage.successMessage).toBeVisible({ timeout: 15000 })
    await expect(accountPage.username).toHaveText(newUsername)

    // Revert username
    await accountPage.usernameEditLink.click()
    await accountPage.unsernameEditInput.fill("qatester2")
    await accountPage.saveChangesButton.click()
    await expect(accountPage.successMessage).toBeVisible({ timeout: 15000 })
    await expect(accountPage.username).toHaveText("qatester2")
  })

  test("should successfully edit phone number", async ({ page }) => {
    const accountPage = await loginAndGetAccountPage(page)
    await accountPage.tab_account_settings.click()

    await accountPage.edit_phone_link.click()
    await accountPage.phoneInput.waitFor({ state: "visible" })

    const newPhoneNumber = "5551234567"
    await accountPage.phoneInput.fill(newPhoneNumber)
    await expect(accountPage.saveChangesButton).toBeEnabled()
    await accountPage.saveChangesButton.click()

    await expect(accountPage.successMessage).toBeVisible({ timeout: 15000 })
    await expect(accountPage.phoneValue).toContainText(newPhoneNumber)

    // Revert phone number
    await accountPage.edit_phone_link.click()
    await accountPage.phoneInput.waitFor({ state: "visible" })
    await accountPage.phoneInput.fill("2125927256")
    await accountPage.saveChangesButton.click()
    await expect(accountPage.successMessage).toBeVisible({ timeout: 15000 })
    await expect(accountPage.phoneValue).toContainText("2125927256", {
      timeout: 15000,
    })
  })

  test("should successfully edit email address", async ({ page }) => {
    const accountPage = await loginAndGetAccountPage(page)
    await accountPage.tab_account_settings.click()

    await accountPage.edit_email_link.click()
    await accountPage.emailInput.waitFor({ state: "visible" })

    const newEmail = "testemail@nypl.org"
    await accountPage.emailInput.fill(newEmail)
    await expect(accountPage.saveChangesButton).toBeEnabled()
    await accountPage.saveChangesButton.click()

    await expect(accountPage.successMessage).toBeVisible({ timeout: 15000 })
    await expect(accountPage.emailValue).toContainText(newEmail)

    // Revert email address
    await accountPage.edit_email_link.click()
    await accountPage.emailInput.waitFor({ state: "visible" })
    await accountPage.emailInput.fill("chrismulholland@nypl.org")
    await accountPage.saveChangesButton.click()
    await expect(accountPage.successMessage).toBeVisible({ timeout: 15000 })
    await expect(accountPage.emailValue).toContainText(
      "chrismulholland@nypl.org",
      { timeout: 15000 }
    )
  })

  test("should successfully edit home library", async ({ page }) => {
    const accountPage = await loginAndGetAccountPage(page)
    await accountPage.tab_account_settings.click()

    await accountPage.edit_home_library_link.click()
    await accountPage.homeLibrarySelect.waitFor({ state: "visible" })
    await accountPage.homeLibrarySelect.selectOption({ label: "53rd Street" })

    await expect(accountPage.saveChangesButton).toBeEnabled()
    await accountPage.saveChangesButton.click()

    await expect(accountPage.successMessage).toBeVisible({ timeout: 15000 })
    // print accountPage.homeLibraryValue to console for debugging
    console.log(await accountPage.homeLibraryValue.textContent())
    await expect(accountPage.homeLibraryValue).toContainText("53rd Street")

    // Revert home library
    await accountPage.edit_home_library_link.click()
    await accountPage.homeLibrarySelect.waitFor({ state: "visible" })
    await accountPage.homeLibrarySelect.selectOption({
      label: "Allerton",
    })
    await accountPage.saveChangesButton.click()
    await expect(accountPage.successMessage).toBeVisible({ timeout: 15000 })
    await expect(accountPage.homeLibraryValue).toContainText("Allerton", {
      timeout: 15000,
    })
  })
})
