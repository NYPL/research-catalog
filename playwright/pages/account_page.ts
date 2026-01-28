import type { Page, Locator } from "@playwright/test"
import { BasePage } from "./base_page"

export class AccountPage extends BasePage {
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly accountHeader: Locator
  readonly nameLabel: Locator
  readonly name: Locator
  readonly usernameLabel: Locator
  readonly username: Locator
  readonly usernameEditLink: Locator
  readonly cardnumberLabel: Locator
  readonly cardnumber: Locator
  readonly barcode: Locator
  readonly expirationLabel: Locator
  readonly expiration: Locator
  readonly tab_checkouts: Locator
  readonly tab_requests: Locator
  readonly tab_fees: Locator
  readonly tab_account_settings: Locator
  readonly circulating_catalog_alert: Locator
  readonly account_items_table_header_title: Locator
  readonly account_items_table_header_barcode: Locator
  readonly account_items_table_header_callnumber: Locator
  readonly account_items_table_header_due_date: Locator
  readonly account_items_table_header_manage: Locator
  readonly edit_phone_link: Locator
  readonly edit_email_link: Locator
  readonly edit_home_library_link: Locator
  readonly edit_notification_preferences_link: Locator
  readonly edit_pin_password_link: Locator

  constructor(page: Page) {
    super(page)
    this.usernameInput = page.getByLabel("Barcode or Username")
    this.passwordInput = page.getByLabel("PIN/ Password")
    this.submitButton = page.getByRole("button", { name: /submit/i })
    this.accountHeader = page.getByRole("heading", { name: /my account/i })
    this.nameLabel = page.getByText("Name").first()
    this.name = page.getByText("PLAYWRIGHT TEST ACCOUNT GHA")
    this.usernameLabel = page.getByText("Username").first()
    this.username = page.getByText("playwrightgha")
    this.usernameEditLink = page.getByRole("button", { name: /edit username/i })
    this.cardnumberLabel = page.locator("dt", { hasText: "Card number" })
    this.cardnumber = page.getByTestId("Card number")
    this.barcode = page.getByLabel("barcode")
    this.expirationLabel = page.locator("dt", { hasText: "Expiration date" })
    this.expiration = page.getByTestId("Expiration date")
    this.tab_checkouts = page.getByRole("tab", { name: /^Checkouts/ })
    this.tab_requests = page.getByRole("tab", { name: /^Requests/ })
    this.tab_fees = page.getByRole("tab", { name: /^Fees/ })
    this.tab_account_settings = page.getByRole("tab", {
      name: /^Account settings/,
    })
    this.circulating_catalog_alert = page.getByText(
      "See eBooks and eAudiobooks checked out by you"
    )
    this.account_items_table_header_title = page.getByRole("columnheader", {
      name: "Title",
    })
    this.account_items_table_header_barcode = page.getByRole("columnheader", {
      name: "Barcode",
    })
    this.account_items_table_header_callnumber = page.getByRole(
      "columnheader",
      { name: "Call number" }
    )
    this.account_items_table_header_due_date = page.getByRole("columnheader", {
      name: "Due back by",
    })
    this.account_items_table_header_manage = page.getByRole("columnheader", {
      name: "Manage checkout",
    })
    this.edit_phone_link = page.locator("#edit-phones-button")
    this.edit_email_link = page.locator("#edit-emails-button")
    this.edit_home_library_link = page.locator("#edit-library-button")
    this.edit_notification_preferences_link = page.locator(
      "#edit-notification-button"
    )
    this.edit_pin_password_link = page.locator("#edit-password-button")
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }
}
