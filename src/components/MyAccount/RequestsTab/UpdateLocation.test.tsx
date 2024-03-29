import UpdateLocation from "./UpdateLocation"
import { render, screen } from "../../../utils/testUtils"
import userEvent from "@testing-library/user-event"
import { filteredPickupLocations as pickupLocations } from "../../../../__test__/fixtures/myAccountFixtures"
import { BASE_URL } from "../../../config/constants"

global.fetch = jest.fn().mockResolvedValueOnce({
  json: async () => "updated",
  status: 200,
} as Response)

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
  it.only("submits a hold update request with patron id and new location as body", async () => {
    const fetchSpy = jest.spyOn(global, "fetch")
    await openModal()
    const select = screen.getByLabelText("Pickup location")
    await userEvent.selectOptions(select, "mp   ")
    const submitButton = screen.getByText("Confirm location")
    await userEvent.click(submitButton)
    expect(fetchSpy).toHaveBeenCalledWith(
      `${BASE_URL}/api/account/holds/update/987654`,
      {
        method: "PUT",
        body: JSON.stringify({ pickupLocation: "mp   ", patronId: 1234567 }),
      }
    )
  })
  it.todo("displays success modal on successful update")
  it.todo("displays failure modal on failed update")
})
