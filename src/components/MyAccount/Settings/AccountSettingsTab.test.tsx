import { patron } from "../../../../__test__/fixtures/rawSierraAccountData"
import AccountSettingsTab from "./AccountSettingsTab"
import MyAccount from "../../../models/MyAccount"
import { render, screen } from "../../../utils/testUtils"

describe("AccountSettingsTab", () => {
  it("can render a complete patron", () => {
    const myAccountPatron = MyAccount.prototype.buildPatron(patron)
    render(<AccountSettingsTab settingsData={myAccountPatron} />)

    const email = screen.getByText("streganonna@gmail.com")
    expect(email).toBeInTheDocument()
    const phone = screen.getByText("Phone")
    expect(phone).toBeInTheDocument()
    const homeLibrary = screen.getByText("Home library")
    expect(homeLibrary).toBeInTheDocument()
    const pin = screen.getByText("Pin/Password")
    expect(pin).toBeInTheDocument()
  })
  it("can render a patron with no email or phone", () => {
    const myAccountPatron = MyAccount.prototype.buildPatron({
      ...patron,
      emails: [],
      phones: [],
    })
    render(<AccountSettingsTab settingsData={myAccountPatron} />)
    ;["Notification preference", "Home library", "Pin/Password"].forEach(
      (patronInfo) => {
        const element = screen.queryByText(patronInfo)
        if (patronInfo === "Email" || patronInfo === "Phone") {
          expect(element).not.toBeInTheDocument()
        } else expect(element).toBeInTheDocument()
      }
    )
  })
})
