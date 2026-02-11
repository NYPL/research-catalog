import { test, expect, type Browser, type Page } from "@playwright/test"
import { AccountPage } from "../../pages/account_page"
import { appConfig } from "../../../src/config/config"

let page: Page
let accountPage: AccountPage

const username = appConfig.testUser.username[appConfig.environment]
const password = process.env.QA_PASSWORD

test.describe.serial("Account page", () => {
  // Start on home, navigate to login, and wait for redirect to return to account page
  test.beforeAll(async ({ browser }: { browser: Browser }) => {
    const context = await browser.newContext()
    page = await context.newPage()

    console.log("Environment:", appConfig.environment)
    console.log("Username:", username)
    console.log("Password exists:", !!password)

    if (!password) {
      throw new Error("QA_PASSWORD environment variable is not set")
    }

    await page.goto("")
    await page.getByRole("link", { name: /my account/i }).click()
    await page.getByLabel(/barcode/i).fill(username)
    await page.getByLabel(/pin/i).fill(password)
    await page.getByRole("button", { name: /submit/i }).click()

    await page.waitForSelector('h2:has-text("My Account")')

    accountPage = new AccountPage(page)
  })

  test.describe("Account info", () => {
    test("should show labels and values", async () => {
      await expect(accountPage.nameLabel).toBeVisible()
      await expect(accountPage.name).toHaveText(
        appConfig.testUser.name[appConfig.environment]
      )
      await expect(accountPage.usernameLabel).toBeVisible()
      await expect(accountPage.username).toHaveText(
        appConfig.testUser.username[appConfig.environment]
      )
      await expect(accountPage.usernameEditLink).toBeVisible()
      await expect(accountPage.cardnumberLabel).toBeVisible()
      const cardnumberText = await accountPage.cardnumber.textContent()
      const expectedCardnumber = appConfig.testUser.cardNumber[
        appConfig.environment
      ].replace(/^"|"$/g, "")
      expect(cardnumberText.trim().replace(/^"|"$/g, "")).toBe(
        expectedCardnumber
      )
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

      // Wait for table to be visible
      await expect(feesTable).toBeVisible({ timeout: 10000 })

      const feeAmounts = feesTable.getByRole("cell", { name: /\$\d+/ })

      // Wait for at least one fee to appear
      await expect(feeAmounts.first()).toBeVisible({ timeout: 10000 })

      const feeCount = await feeAmounts.count()
      expect(feeCount).toBeGreaterThan(0)
    })
  })

  test.describe("Account settings", () => {
    test("should show labels and values for account settings", async () => {
      await accountPage.tab_account_settings.click()

      const phonelabel = page.locator("p", { hasText: /phone/i })
      await expect(phonelabel).toBeVisible()
      const phoneValue = phonelabel.locator("xpath=following::div[1]/div/p")
      const phoneText = await phoneValue.textContent()
      expect(phoneText.trim().replace(/\D/g, "")).toHaveLength(10)

      const emailLabel = page.locator("p", { hasText: /email/i }).first()
      await expect(emailLabel).toBeVisible()
      const emailValue = emailLabel.locator("xpath=following::div[1]/div/p")
      const emailText = await emailValue.textContent()
      await expect(emailText.trim()).toMatch(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/)

      const homeLibraryLabel = page.locator("p", { hasText: /home library/i })
      await expect(homeLibraryLabel).toBeVisible()
      const homeLibraryValue = homeLibraryLabel.locator(
        "xpath=following::div[1]/div"
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
        pinPasswordLabel.locator("xpath=following::div[1]/p")
      ).toHaveText(/^"?\*{4,}"?$/)

      await expect(accountPage.edit_phone_link).toBeVisible()
      await expect(accountPage.edit_email_link).toBeVisible()
      await expect(accountPage.edit_home_library_link).toBeVisible()
      await expect(accountPage.edit_notification_preferences_link).toBeVisible()
      await expect(accountPage.edit_pin_password_link).toBeVisible()
    })
    test("should successfully edit user name", async () => {
      await accountPage.usernameEditLink.click()
      await expect(page.getByText("If you delete your username,")).toBeVisible()
      await accountPage.usernameEditInput.waitFor({ state: "visible" })

      // Test invalid username (too long)
      const badnewUsername = "areallylongusernamethatexceedslimit"
      await accountPage.usernameEditInput.fill(badnewUsername)
      await expect(accountPage.usernameEditInput).toHaveValue(badnewUsername)
      await expect(accountPage.saveChangesButton).toBeDisabled()
      // click the cancel button to close the edit username form
      await accountPage.cancelButton.click()
      await expect(accountPage.usernameEditInput).toHaveCount(0)
      // Test valid username
      const newUsername = "usernameedited"
      await accountPage.usernameEditLink.click()
      await accountPage.usernameEditInput.fill(newUsername)
      await expect(accountPage.usernameEditInput).toHaveValue(newUsername)
      await expect(accountPage.saveChangesButton).toBeEnabled()
      await accountPage.saveChangesButton.click()

      await expect(accountPage.successMessage).toBeVisible({ timeout: 20000 })
      await expect(accountPage.username).toHaveText(newUsername, {
        timeout: 20000,
      })
    })
    test("should successfully edit phone number", async () => {
      await accountPage.edit_phone_link.click()
      await accountPage.phoneInput.waitFor({ state: "visible" })

      const newPhoneNumber = "5551234567"
      await accountPage.phoneInput.fill(newPhoneNumber)
      await expect(accountPage.saveChangesButton).toBeEnabled()
      await accountPage.saveChangesButton.click()

      await expect(accountPage.successMessage).toBeVisible({ timeout: 20000 })
      await expect(accountPage.phoneValue).toContainText(newPhoneNumber, {
        timeout: 20000,
      })
    })
    test("should successfully edit email address", async () => {
      await accountPage.edit_email_link.click()
      await accountPage.emailInput.waitFor({ state: "visible" })
      const newEmail = "testemail@nypl.org"
      await accountPage.emailInput.fill(newEmail)
      await expect(accountPage.saveChangesButton).toBeEnabled()
      await accountPage.saveChangesButton.click()
      await expect(accountPage.successMessage).toBeVisible({ timeout: 20000 })
      const emailLabel = page.locator("p", { hasText: /email/i }).first()
      const emailValue = emailLabel.locator("xpath=following::div[1]/div/p")
      await expect(emailValue).toContainText(newEmail, {
        timeout: 20000,
      })
    })
    test("should successfully edit home library", async () => {
      await accountPage.edit_home_library_link.click()
      await accountPage.homeLibrarySelect.waitFor({ state: "visible" })
      await accountPage.homeLibrarySelect.selectOption({ label: "53rd Street" })

      await expect(accountPage.saveChangesButton).toBeEnabled()
      await accountPage.saveChangesButton.click()

      await expect(accountPage.successMessage).toBeVisible({ timeout: 20000 })
      await expect(accountPage.homeLibraryValue).toContainText("53rd Street")
    })
    test.afterAll(async () => {
      // Revert changes to username, phone, email, and home library
      // Revert username
      await accountPage.usernameEditLink.click()
      await accountPage.usernameEditInput.fill(username)
      await accountPage.saveChangesButton.click()
      await expect(accountPage.successMessage).toBeVisible({ timeout: 20000 })
      await expect(accountPage.username).toHaveText(username, {
        timeout: 20000,
      })
      // Revert phone
      await accountPage.edit_phone_link.click()
      await accountPage.phoneInput.fill("2125927256")
      await accountPage.saveChangesButton.click()
      await expect(accountPage.successMessage).toBeVisible({ timeout: 20000 })
      await expect(accountPage.phoneValue).toContainText("2125927256", {
        timeout: 20000,
      })
      // Revert email
      await accountPage.edit_email_link.click()
      await accountPage.emailInput.fill("chrismulholland@nypl.org")
      await accountPage.saveChangesButton.click()
      await expect(accountPage.successMessage).toBeVisible({ timeout: 20000 })
      const emailLabel = page.locator("p", { hasText: /email/i }).first()
      const emailValue = emailLabel.locator("xpath=following::div[1]/div/p")
      await expect(emailValue).toContainText("chrismulholland@nypl.org", {
        timeout: 20000,
      })
      // Revert home library
      await accountPage.edit_home_library_link.click()
      await accountPage.homeLibrarySelect.waitFor({ state: "visible" })
      await accountPage.homeLibrarySelect.selectOption({
        label: "Allerton",
      })
      await accountPage.saveChangesButton.click()
      await expect(accountPage.successMessage).toBeVisible({ timeout: 20000 })
      await expect(accountPage.homeLibraryValue).toContainText("Allerton")
    })
  })
})
