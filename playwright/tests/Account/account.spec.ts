import "dotenv/config"
import { test, expect } from "@playwright/test"
import { RC_Home_Page } from "../../pages/rc_home_page"
import { AccountPage } from "../../pages/account_page"

const username = process.env.QA_USERNAME || ""
const password = process.env.QA_PASSWORD || ""

test.describe("My Account Login", () => {
  test("Test log in and account page elements", async ({ page }) => {
    // Start on the home page
    const homePage = new RC_Home_Page(page)
    await page.goto("")

    // Create AccountPage object
    const accountPage = new AccountPage(page)

    // Click on "My Account" link to navigate to login page
    await page.getByRole("link", { name: /my account/i }).click()

    // call the login method from AccountPage
    await accountPage.login(username, password)

    // Assert user is logged in (account header is visible)
    await expect(accountPage.accountHeader).toBeVisible()
    // assert name label and value
    await expect(accountPage.nameLabel).toBeVisible()
    await expect(accountPage.name).toHaveText("QA Tester ILS")
    // assert username label and value
    await expect(accountPage.usernameLabel).toBeVisible()
    await expect(accountPage.username).toBeVisible()
    // assert edit link is visible
    await expect(accountPage.usernameEditLink).toBeVisible()
    // assert cardnumber label and value
    await expect(accountPage.cardnumberLabel).toBeVisible()
    await expect(accountPage.cardnumber).toBeVisible()
    // assert barcode value is visible
    await expect(accountPage.barcode).toBeVisible()
    // assert expiration label and value
    await expect(accountPage.expirationLabel).toBeVisible()
    await expect(accountPage.expiration).toBeVisible()
    // assert account page tabs are visible
    await expect(accountPage.tab_checkouts).toBeVisible()
    await expect(accountPage.tab_requests).toBeVisible()
    await expect(accountPage.tab_fees).toBeVisible()
    await expect(accountPage.tab_account_settings).toBeVisible()
    // assert circulating catalog alert is visible
    await expect(accountPage.circulating_catalog_alert).toBeVisible()
    // assert account items table headers are visible
    await expect(accountPage.account_items_table_header_title).toBeVisible()
    await expect(accountPage.account_items_table_header_barcode).toBeVisible()
    await expect(
      accountPage.account_items_table_header_callnumber
    ).toBeVisible()
    await expect(accountPage.account_items_table_header_due_date).toBeVisible()
    await expect(accountPage.account_items_table_header_manage).toBeVisible()
  })
})
