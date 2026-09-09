import type { Page, Locator } from "@playwright/test"
import { BasePage } from "./base_page"

export class AccountPage extends BasePage {
  readonly usernameLoginInput: Locator
  readonly passwordLoginInput: Locator
  readonly submitButton: Locator
  readonly accountHeader: Locator

  readonly nameLabel: Locator
  readonly name: Locator
  readonly usernameLabel: Locator
  readonly username: Locator
  readonly usernameEditLink: Locator
  readonly usernameEditInput: Locator
  readonly passwordLabel: Locator
  readonly passwordText: Locator
  readonly passwordEditLink: Locator
  readonly currentPasswordInput: Locator
  readonly newPasswordInput: Locator
  readonly confirmPasswordInput: Locator
  readonly currentPasswordClearInput: Locator
  readonly newPasswordClearInput: Locator
  readonly confirmPasswordClearInput: Locator
  readonly cardNumberLabel: Locator
  readonly cardNumber: Locator
  readonly barcode: Locator
  readonly expirationLabel: Locator
  readonly expiration: Locator

  readonly phone: Locator
  readonly phoneLabel: Locator
  readonly phoneEditLink: Locator
  readonly removePhoneIcon: Locator
  readonly phoneInput: Locator
  readonly email: Locator
  readonly emailLabel: Locator
  readonly emailEditLink: Locator
  readonly emailInput: Locator
  readonly homeLibrary: Locator
  readonly homeLibraryLabel: Locator
  readonly homeLibraryEditLink: Locator
  readonly homeLibrarySelect: Locator
  readonly notificationPreference: Locator
  readonly notificationPreferenceLabel: Locator
  readonly notificationPreferenceEditLink: Locator

  readonly toolTipGotIt: Locator
  readonly cancelButton: Locator
  readonly saveChangesButton: Locator
  readonly successMessage: Locator

  readonly tabCheckouts: Locator
  readonly tabRequests: Locator
  readonly tabFees: Locator
  readonly tabLists: Locator
  readonly circulatingCatalogAlert: Locator
  readonly accountItemsTableHeaderTitle: Locator
  readonly accountItemsTableHeaderBarcode: Locator
  readonly accountItemsTableHeaderCallNumber: Locator
  readonly accountItemsTableHeaderDueDate: Locator
  readonly accountItemsTableHeaderAction: Locator

  constructor(page: Page) {
    super(page)
    this.usernameLoginInput = page.getByLabel("Barcode or Username")
    this.passwordLoginInput = page.getByLabel("PIN/ Password")
    this.submitButton = page.getByRole("button", { name: /submit/i })
    this.accountHeader = page.getByRole("heading", { name: /my account/i })

    // Account details
    this.nameLabel = page.getByText("Name").first()
    this.name = page.getByTestId("Name")
    this.usernameLabel = page.getByText("Username").first()
    this.username = page.getByTestId("Username").getByTestId("ds-text")
    this.usernameEditLink = page.getByRole("button", { name: /edit username/i })
    this.usernameEditInput = page.getByRole("textbox", { name: "Username" })
    this.passwordLabel = page.locator("dt", { hasText: "PIN/password" })
    this.passwordText = page.getByTestId("PIN/password").getByTestId("ds-text")
    this.passwordEditLink = page.getByRole("button", { name: /edit password/i })
    this.currentPasswordInput = page.getByRole("textbox", {
      name: "Enter current PIN/password",
    })
    this.currentPasswordClearInput = page.getByRole("button", {
      name: "Clear Enter current PIN/",
    })
    this.newPasswordInput = page.getByRole("textbox", {
      name: "Enter new PIN/password",
      exact: true,
    })
    this.newPasswordClearInput = page.getByRole("button", {
      name: "Clear Enter new PIN/",
    })
    this.confirmPasswordInput = page.getByRole("textbox", {
      name: "Re-enter new PIN/password",
    })
    this.confirmPasswordClearInput = page.getByRole("button", {
      name: "Clear Re-enter new PIN/",
    })
    this.cardNumberLabel = page.locator("dt", {
      hasText: "Library card number",
    })
    this.cardNumber = page.getByTestId("Library card number")
    this.barcode = page.getByLabel("barcode")
    this.expirationLabel = page.locator("dt", { hasText: "Expiration date" })
    this.expiration = page.getByTestId("Expiration date")

    // Contact details and preferences
    this.phone = page.getByTestId("Phone").getByTestId("ds-text")
    this.phoneLabel = page.locator("dt", { hasText: "Phone" })
    this.phoneEditLink = page.locator("#edit-phones-button")
    this.phoneInput = page.getByRole("textbox", {
      name: "Update primary phone number",
    })
    this.removePhoneIcon = page.getByRole("button", { name: /^Remove phone/i })

    this.email = page.getByTestId("Email").getByTestId("ds-text")
    this.emailLabel = page.locator("dt", { hasText: "Email" })
    this.emailEditLink = page.locator("#edit-emails-button")
    this.emailInput = page.getByRole("textbox", {
      name: "Update primary email address",
    })

    this.homeLibrary = page.getByTestId("Home library").getByTestId("ds-text")
    this.homeLibraryLabel = page.locator("dt", { hasText: "Home library" })
    this.homeLibraryEditLink = page.locator("#edit-library-button")
    this.homeLibrarySelect = page.getByLabel("Update home library")

    this.notificationPreference = page
      .getByTestId("Notification preference")
      .getByTestId("ds-text")
    this.notificationPreferenceLabel = page.locator("dt", {
      hasText: "Notification preference",
    })
    this.notificationPreferenceEditLink = page.locator(
      "#edit-notification-button"
    )

    this.toolTipGotIt = page.getByRole("button", { name: /got it/i })
    this.cancelButton = page.getByRole("button", { name: /cancel/i })
    this.saveChangesButton = page.getByRole("button", {
      name: /save changes/i,
    })
    this.successMessage = page.getByText(/your changes were saved/i)

    // Tabs
    this.tabCheckouts = page.getByRole("tab", { name: /^Checkouts/ })
    this.tabRequests = page.getByRole("tab", { name: /^Requests/ })
    this.tabFees = page.getByRole("tab").filter({ hasText: /^Fees/i })
    this.tabLists = page.getByRole("tab", {
      name: /^Lists/,
    })
    this.circulatingCatalogAlert = page.getByText(
      "See eBooks and eAudiobooks checked out by you"
    )
    this.accountItemsTableHeaderTitle = page.getByRole("columnheader", {
      name: "Title",
    })
    this.accountItemsTableHeaderBarcode = page.getByRole("columnheader", {
      name: "Barcode",
    })
    this.accountItemsTableHeaderCallNumber = page.getByRole("columnheader", {
      name: "Call number",
    })
    this.accountItemsTableHeaderDueDate = page.getByRole("columnheader", {
      name: "Due back by",
    })
    this.accountItemsTableHeaderAction = page.getByRole("columnheader", {
      name: "Action",
    })
  }

  async login(username: string, password: string) {
    await this.usernameLoginInput.fill(username)
    await this.passwordLoginInput.fill(password)
    await this.submitButton.click()
  }
}
