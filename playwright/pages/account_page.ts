import type { Page, Locator } from "@playwright/test"
import { BasePage } from "./base_page"

export class AccountPage extends BasePage {
  // log in page locators
  readonly usernameInput: Locator
  readonly usernameEditInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  // account page locators
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
  // account settings edit links
  readonly edit_phone_link: Locator
  readonly removePhoneIcon: Locator
  readonly edit_email_link: Locator
  readonly edit_home_library_link: Locator
  readonly edit_notification_preferences_link: Locator
  readonly edit_pin_password_link: Locator
  readonly cancelButton: Locator

  readonly phoneInput: Locator
  readonly emailInput: Locator
  readonly homeLibrarySelect: Locator
  readonly saveChangesButton: Locator
  readonly successMessage: Locator
  readonly phoneValue: Locator
  readonly emailValue: Locator
  readonly homeLibraryValue: Locator

  constructor(page: Page) {
    super(page)
    this.usernameInput = page.getByLabel("Barcode or Username")
    this.passwordInput = page.getByLabel("PIN/ Password")
    this.submitButton = page.getByRole("button", { name: /submit/i })
    this.accountHeader = page.getByRole("heading", { name: /my account/i })
    this.nameLabel = page.getByText("Name").first()
    this.name = page.getByTestId("Name")
    this.usernameLabel = page.getByText("Username").first()
    this.username = page.getByTestId("Username").getByTestId("ds-text")
    this.usernameEditLink = page.getByRole("button", { name: /edit username/i })
    this.usernameEditInput = page.locator("#username-input")
    this.cardnumberLabel = page.locator("dt", { hasText: "Card number" })
    this.cardnumber = page.getByTestId("Card number")
    this.barcode = page.getByLabel("barcode")
    this.expirationLabel = page.locator("dt", { hasText: "Expiration date" })
    this.expiration = page.getByTestId("Expiration date")
    this.tab_checkouts = page.getByRole("tab", { name: /^Checkouts/ })
    this.tab_requests = page.getByRole("tab", { name: /^Requests/ })
    this.tab_fees = page.getByRole("tab", { name: /Fees/i })
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
    this.removePhoneIcon = page.getByRole("button", { name: /^Remove phone/i })
    this.edit_email_link = page.locator("#edit-emails-button")
    this.edit_home_library_link = page.locator("#edit-library-button")
    this.edit_notification_preferences_link = page.locator(
      "#edit-notification-button"
    )
    this.edit_pin_password_link = page.locator("#edit-password-button")
    this.cancelButton = page.getByRole("button", { name: /cancel/i })
    // New locators for editing functionality
    this.phoneInput = page.getByRole("textbox", {
      name: "Update primary phone number",
    })
    this.emailInput = page.getByRole("textbox", {
      name: "Update primary email address",
    })
    this.homeLibrarySelect = page.getByLabel("Update home library")
    this.saveChangesButton = page.getByRole("button", {
      name: /save changes/i,
    })
    this.successMessage = page.getByText(/your changes were saved/i)

    this.phoneValue = page
      .locator("p", { hasText: /phone/i })
      .locator("xpath=following::div[1]")
    this.homeLibraryValue = page
      .locator("p", { hasText: /home library/i })
      .locator("xpath=following::div[1]")
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }
}
