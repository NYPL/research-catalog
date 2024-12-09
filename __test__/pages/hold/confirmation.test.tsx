import HoldConfirmationPage from "../../../pages/hold/confirmation/[id]"
import { render, screen } from "../../../src/utils/testUtils"
import { bibWithItems } from "../../fixtures/bibFixtures"

describe("Hold Confirmation page", () => {
  describe("Hold Confirmation page UI", () => {
    beforeEach(() => {
      render(
        <HoldConfirmationPage discoveryBibResult={bibWithItems.resource} />
      )
    })

    it("renders an H2", () => {
      expect(screen.getAllByRole("heading", { level: 2 })[0]).toHaveTextContent(
        "Request for on-site use"
      )
    })

    it("renders a success banner", () => {
      expect(screen.getAllByRole("heading", { level: 2 })[1]).toHaveTextContent(
        "Request successful"
      )
    })
    it("renders a faq accordion", () => {
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
        "Frequently asked questions"
      )
    })
  })
})
