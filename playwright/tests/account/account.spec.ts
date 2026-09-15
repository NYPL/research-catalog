import { test, expect, type Browser, type Page } from "@playwright/test"
import { AccountPage } from "../../pages/account_page"
import { appConfig } from "../../../src/config/appConfig"
import { logger } from "@nypl/node-utils"
import { setUpTestPatron } from "../utils"

let page: Page
let accountPage: AccountPage

const username = appConfig.testUser.username[appConfig.environment]
const password = process.env.QA_PASSWORD
const name = appConfig.testUser.name[appConfig.environment]
const cardNumber = appConfig.testUser.cardNumber[appConfig.environment]

test.describe.serial("Account page", () => {
  test.skip(
    (function () {
      const skipAccountTests = process.env.SKIP_ACCOUNT_TESTS === "true"
      if (skipAccountTests)
        logger.info(
          "Skipping account tests because patron data was not reset correctly"
        )
      return skipAccountTests
    })(),
    "Skipping account tests due to patron data verification error"
  )
  // Start on home, navigate to login, and wait for redirect to return to account page
  test.beforeAll(async ({ browser }: { browser: Browser }) => {
    const context = await browser.newContext()
    page = await context.newPage()

    await page.goto("")
    await page.getByRole("link", { name: /log in/i }).click()
    await page.getByLabel(/barcode/i).fill(username)
    await page.getByLabel(/pin/i).fill(password)
    await page.getByRole("button", { name: /submit/i }).click()
    await page.waitForSelector('h2:has-text("My account")')
    accountPage = new AccountPage(page)
  })
  test.afterAll(async () => {
    await setUpTestPatron()
  })
  test.describe("Profile tab", () => {
    test.beforeAll(async () => {
      const toolTipButtons = await accountPage.toolTipGotIt.all()
      toolTipButtons.forEach(async (b) => await b.click())
    })
    test("should show labels and values for account settings", async () => {
      await expect(accountPage.nameLabel).toBeVisible()
      await expect(accountPage.name).toHaveText(name)
      await expect(accountPage.usernameLabel).toBeVisible()
      await expect(accountPage.username).toHaveText(username)
      await expect(accountPage.usernameEditLink).toBeVisible()
      await expect(accountPage.passwordLabel).toBeVisible()
      await expect(accountPage.passwordText).toHaveText("****")
      await expect(accountPage.passwordEditLink).toBeVisible()
      await expect(accountPage.cardNumberLabel).toBeVisible()
      const expectedCardnumber = cardNumber.replace(/^"|"$/g, "")
      const cardNumberText = await accountPage.cardNumber.textContent()
      expect(cardNumberText.trim().replace(/^"|"$/g, "")).toBe(
        expectedCardnumber
      )
      await expect(accountPage.barcode).toBeVisible()
      await expect(accountPage.expirationLabel).toBeVisible()
      await expect(accountPage.expiration).toBeVisible()

      await expect(accountPage.phoneLabel).toBeVisible()
      const phoneText = await accountPage.phone.textContent()
      await expect(phoneText.trim().replace(/\D/g, "")).toHaveLength(10)
      await expect(accountPage.phoneEditLink).toBeVisible()

      await expect(accountPage.emailLabel).toBeVisible()
      const emailText = await accountPage.email.textContent()
      await expect(emailText.trim()).toMatch(/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/)
      await expect(accountPage.emailEditLink).toBeVisible()

      await expect(accountPage.homeLibraryLabel).toBeVisible()
      await expect(accountPage.homeLibrary).toHaveText(/^Allerton/)
      await expect(accountPage.homeLibraryEditLink).toBeVisible()

      await expect(accountPage.notificationPreferenceLabel).toBeVisible()
      await expect(accountPage.notificationPreference).toHaveText(/^Email/)
      await expect(accountPage.notificationPreferenceEditLink).toBeVisible()
    })
    test("should prevent invalid user name", async () => {
      await accountPage.usernameEditLink.click()
      await expect(page.getByText("If you delete your username,")).toBeVisible()
      await accountPage.usernameEditInput.waitFor({ state: "visible" })

      // Test invalid username (too long)
      const badNewUsername = "areallylongusernamethatexceedslimit"
      await accountPage.usernameEditInput.fill(badNewUsername)
      await expect(accountPage.usernameEditInput).toHaveValue(badNewUsername)
      await expect(accountPage.saveChangesButton).toBeDisabled()
      // Close the edit username form
      await accountPage.cancelButton.click()
      await expect(accountPage.usernameEditInput).toHaveCount(0)
    })
    test("should allow valid user name update", async () => {
      const newUsername = "usernameedit"
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
      await accountPage.phoneEditLink.click()
      await accountPage.phoneInput.waitFor({ state: "visible" })

      const newPhoneNumber = "5551234567"
      await accountPage.phoneInput.fill(newPhoneNumber)
      await expect(accountPage.saveChangesButton).toBeEnabled()
      await accountPage.saveChangesButton.click()
      await page.waitForTimeout(1000)
      await expect(accountPage.successMessage).toBeVisible({ timeout: 20000 })
      await expect(accountPage.phone).toContainText(newPhoneNumber, {
        timeout: 20000,
      })
    })
    test("should successfully edit email address", async () => {
      await accountPage.emailEditLink.click()
      await accountPage.emailInput.waitFor({ state: "visible" })
      const newEmail = "testemail@nypl.org"
      await accountPage.emailInput.fill(newEmail)
      await expect(accountPage.saveChangesButton).toBeEnabled()
      await accountPage.saveChangesButton.click()
      await expect(accountPage.successMessage).toBeVisible({ timeout: 20000 })
      await expect(accountPage.email).toContainText(newEmail, {
        timeout: 20000,
      })
    })
    test("should successfully edit home library", async () => {
      await accountPage.homeLibraryEditLink.click()
      await accountPage.homeLibrarySelect.waitFor({ state: "visible" })
      await accountPage.homeLibrarySelect.selectOption({ label: "53rd Street" })

      await expect(accountPage.saveChangesButton).toBeEnabled()
      await accountPage.saveChangesButton.click()
      await page.waitForTimeout(1000)
      await expect(accountPage.successMessage).toBeVisible({ timeout: 20000 })
      await expect(accountPage.homeLibrary).toContainText("53rd Street")
    })
    test("should use correct focus order in password edit form with empty form", async ({
      browserName,
    }) => {
      await accountPage.passwordEditLink.click()
      await expect(accountPage.currentPasswordInput).toBeFocused()
      await page.keyboard.press("Tab")
      await expect(accountPage.newPasswordInput).toBeFocused()
      await page.keyboard.press("Tab")
      await expect(accountPage.confirmPasswordInput).toBeFocused()
      await page.keyboard.press("Tab")
      // webkit excludes buttons from default tab order
      if (browserName !== "webkit") {
        await expect(accountPage.cancelButton).toBeFocused()
      }
      await accountPage.cancelButton.click()
    })
    test("should use correct focus order in password edit form with 'correctly' filled form", async ({
      browserName,
    }) => {
      // webkit excludes buttons from default tab order
      test.skip(browserName === "webkit")
      await accountPage.passwordEditLink.click()
      await expect(accountPage.currentPasswordInput).toBeFocused()
      await accountPage.currentPasswordInput.fill("test")
      await page.keyboard.press("Tab")
      await expect(accountPage.currentPasswordClearInput).toBeFocused()
      await page.keyboard.press("Tab")
      await expect(accountPage.newPasswordInput).toBeFocused()
      await accountPage.newPasswordInput.fill("test2")
      await page.keyboard.press("Tab")
      await expect(accountPage.newPasswordClearInput).toBeFocused()
      await page.keyboard.press("Tab")
      await expect(accountPage.confirmPasswordInput).toBeFocused()
      await accountPage.confirmPasswordInput.fill("test2")
      await page.keyboard.press("Tab")
      await expect(accountPage.confirmPasswordClearInput).toBeFocused()
      await page.keyboard.press("Tab")
      await expect(accountPage.cancelButton).toBeFocused()
      await page.keyboard.press("Tab")
      await expect(accountPage.saveChangesButton).toBeFocused()
      await accountPage.cancelButton.click()
    })
  })

  test.describe("Other tabs", () => {
    test("should show all tabs", async () => {
      await expect(accountPage.tabCheckouts).toBeVisible()
      await expect(accountPage.tabRequests).toBeVisible()
      await expect(accountPage.tabLists).toBeVisible()
      await expect(accountPage.tabFees).toBeVisible()
    })

    test("checkouts tab should list at least one checkout", async () => {
      await accountPage.tabCheckouts.click()
      await expect(accountPage.circulatingCatalogAlert).toBeVisible()
      await expect(accountPage.accountItemsTableHeaderTitle).toBeVisible()
      await expect(accountPage.accountItemsTableHeaderBarcode).toBeVisible()
      await expect(accountPage.accountItemsTableHeaderCallNumber).toBeVisible()
      await expect(accountPage.accountItemsTableHeaderDueDate).toBeVisible()
      await expect(accountPage.accountItemsTableHeaderAction).toBeVisible()

      const checkoutsTable = page.locator("table", {
        has: page.getByRole("columnheader", { name: "Title" }),
      })
      await expect(checkoutsTable).toBeVisible({ timeout: 10000 })

      const titleLinks = checkoutsTable.getByRole("link")
      const count = await titleLinks.count()
      expect(count).toBeGreaterThan(0)
    })
    test("requests tab should list at least one request", async () => {
      await accountPage.tabRequests.click()

      const requestsTable = page.locator("table", {
        has: page.getByRole("columnheader", { name: "Title" }),
      })

      const requestTitleLinks = requestsTable.getByRole("link")
      const requestCount = await requestTitleLinks.count()
      expect(requestCount).toBeGreaterThan(0)
    })
    test("fees tab should list at least one fee", async () => {
      await expect(accountPage.tabFees).toBeVisible({ timeout: 20000 })
      await accountPage.tabFees.click()
      await page.waitForTimeout(1000)

      const feesTable = page.locator("table", {
        has: page.getByRole("columnheader", { name: "Amount" }),
      })
      await expect(feesTable).toBeVisible({ timeout: 50000 })

      const feeAmounts = feesTable.getByRole("cell", { name: /\$\d+/ })
      const feeCount = await feeAmounts.count()
      expect(feeCount).toBeGreaterThan(0)
    })
  })
})
