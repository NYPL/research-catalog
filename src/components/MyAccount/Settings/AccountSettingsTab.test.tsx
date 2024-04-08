import { patron } from "../../../../__test__/fixtures/rawSierraAccountData"
import AccountSettingsTab from "./AccountSettingsTab"
import MyAccount from "../../../models/MyAccount"
import { render, screen } from "../../../utils/testUtils"

describe("AccountSettingsTab", () => {
  it("can render a complete patron", () => {
    const myAccountPatron = MyAccount.prototype.buildPatron(patron)
    render(<AccountSettingsTab settingsData={myAccountPatron} />)
    ;[
      "streganonna@gmail.com",
      "Phone",
      "Notification preference",
      "Home library",
      "Pin/Password",
    ].forEach((patronInfo) => {
      const element = screen.getByText(patronInfo)
      expect(element).toBeInTheDocument()
    })
  })
  it("can render a patron with no email or phone", () => {
    const myAccountPatron = MyAccount.prototype.buildPatron({
      ...patron,
      emails: [],
      phones: [],
    })
    render(<AccountSettingsTab settingsData={myAccountPatron} />)
    ;[
      "Email",
      "Phone",
      "Notification preference",
      "Home library",
      "Pin/Password",
    ].forEach((patronInfo) => {
      const element = screen.queryByText(patronInfo)
      if (patronInfo === "Email" || patronInfo === "Phone") {
        expect(element).not.toBeInTheDocument()
      } else expect(element).toBeInTheDocument()
    })
  })
})
