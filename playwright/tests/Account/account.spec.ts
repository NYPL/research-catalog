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

    // assert at least one title is listed in checkouts
    const checkoutsTable = page.locator("table", {
      has: page.getByRole("columnheader", { name: "Title" }),
    })
    const titleLinks = checkoutsTable.getByRole("link")
    const count = await titleLinks.count()
    expect(count).toBeGreaterThan(0)

    // assert at least one title is listed under requests
    await accountPage.tab_requests.click()
    const requestsTable = page.locator("table", {
      has: page.getByRole("columnheader", { name: "Title" }),
    })
    const requestTitleLinks = requestsTable.getByRole("link")
    const requestCount = await requestTitleLinks.count()
    expect(requestCount).toBeGreaterThan(0)

    // click on the fees tab
    await accountPage.tab_fees.click()
    // assert at least one fee is listed
    const feesTable = page.locator("table", {
      has: page.getByRole("columnheader", { name: "Amount" }),
    })
    const feeAmounts = feesTable.getByRole("cell", { name: /\$\d+/ })
    const feeCount = await feeAmounts.count()
    expect(feeCount).toBeGreaterThan(1)

    // click on the account settings tab
    await accountPage.tab_account_settings.click()
    // assert that there are rows for Phone,Email, Home Library, Notification preference, and Pin/password
    const phonelabel = page.locator("p", { hasText: /phone/i })
    await expect(phonelabel).toBeVisible()

    const emailLabel = page.locator("p", { hasText: /email/i }).first()
    await expect(emailLabel).toBeVisible()

    const homeLibraryLabel = page.locator("p", { hasText: /home library/i })
    await expect(homeLibraryLabel).toBeVisible()

    const notificationPreferenceLabel = page.locator("p", {
      hasText: /notification preference/i,
    })
    await expect(notificationPreferenceLabel).toBeVisible()

    const pinPasswordLabel = page.locator("p", {
      hasText: /pin\/password/i,
    })
    await expect(pinPasswordLabel).toBeVisible()
    // NEED TO ADD ASSERTS FOR THE VALUES OF THE ABOVE FIELDS
    // expect the div following phone label contains text 2125927256
    const phoneValue = phonelabel.locator("xpath=following::div[1]")
    await expect(phoneValue).toHaveText(/^2125927256/)

    // expect the div following email label contains text chrismulholland@nypl.org
    const emailValue = emailLabel.locator("xpath=following::div[1]")
    await expect(emailValue).toHaveText(/^chrismulholland@nypl.org/)

    // expect the div following home library label contains text Stavros Niarchos
    const homeLibraryValue = homeLibraryLabel.locator("xpath=following::div[1]")
    await expect(homeLibraryValue).toHaveText(/^Stavros Niarchos/)

    // expect the div following notification preference label contains text Email
    const notificationPreferenceValue = notificationPreferenceLabel.locator(
      "xpath=following::div[1]"
    )
    await expect(notificationPreferenceValue).toHaveText(/^Email/)

    // expect the div following pin/password label contains text ****
    const pinPasswordValue = pinPasswordLabel.locator("xpath=following::div[1]")
    await expect(pinPasswordValue).toHaveText(/^(\*\*\*\*)/)

    // END OF VALUE ASSERTS
    // assert edit links are visible
    await expect(accountPage.edit_phone_link).toBeVisible()
    await expect(accountPage.edit_email_link).toBeVisible()
    await expect(accountPage.edit_home_library_link).toBeVisible()
    await expect(accountPage.edit_notification_preferences_link).toBeVisible()
    await expect(accountPage.edit_pin_password_link).toBeVisible()
  }) // <-- closes the test function
}) // <-- closes the test.describe block
