import UpdateLocation from "./UpdateLocation"
import { cleanup, render, screen } from "../../../utils/testUtils"
import userEvent from "@testing-library/user-event"
import { filteredPickupLocations as pickupLocations } from "../../../../__test__/fixtures/myAccountFixtures"

describe("UpdateLocation modal trigger", () => {
  const openModal = async () => {
    const modalTrigger = screen.getByText("Change location")
    await userEvent.click(modalTrigger)
  }
  beforeEach(() => {
    render(
      <>
        <UpdateLocation
          pickupLocationOptions={pickupLocations}
          data-testId="click me"
          holdId="987654"
          patronId={1234567}
          pickupLocation={{ name: "SNFL", code: "sn" }}
          key={1}
        />
      </>
    )
  })
  it("opens a modal with selected location as first option", async () => {
    await openModal()
    const selectedOption = screen.getByText("SNFL (formerly Mid-Manhattan)", {
      exact: false,
    })
    expect(selectedOption).toBeInTheDocument()
  })
  it("submits a hold update request with patron id and new location as body", async () => {
    await openModal()
    await userEvent.click(screen.getByText("SNFL (formerly Mid-Manhattan)"))
  })
  it.todo("displays success modal on successful update")
  it.todo("displays failure modal on failed update")
})
