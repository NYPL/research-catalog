import UpdateLocation from "./UpdateLocation"
import { render, screen } from "../../../utils/testUtils"
import userEvent from "@testing-library/user-event"
import {
  filteredPickupLocations as pickupLocations,
  processedHolds,
} from "../../../../__test__/fixtures/processedMyAccountData"
import { BASE_URL } from "../../../config/constants"

global.fetch = jest
  .fn()
  .mockResolvedValueOnce({
    json: async () => "updated",
    status: 200,
  } as Response)
  .mockResolvedValueOnce({
    json: async () => "updated",
    status: 200,
  } as Response)
  .mockResolvedValueOnce({
    json: async () => "error",
    status: 500,
  } as Response)

const mockUpdateHoldLocation = jest.fn()

describe("UpdateLocation modal trigger", () => {
  const openModal = async () => {
    const modalTrigger = screen.getByText("Change location")
    await userEvent.click(modalTrigger)
  }
  beforeEach(() => {
    render(
      <>
        <UpdateLocation
          updateHoldLocation={mockUpdateHoldLocation}
          pickupLocationOptions={pickupLocations}
          data-testId="click me"
          hold={processedHolds[0]}
          patronId={1234567}
          pickupLocation={{ name: "SNFL", code: "sn" }}
          key={1}
        />
      </>
    )
  })
  it("opens a modal with selected location as first option", async () => {
    await openModal()
    const selectedOption = screen.getByText("SNFL", {
      exact: false,
    })
    expect(selectedOption).toBeInTheDocument()
  })
  describe("submission", () => {
    it("submits a hold update request with patron id and new location as body", async () => {
      const fetchSpy = jest.spyOn(global, "fetch")
      await openModal()
      const select = screen.getByLabelText("Pickup location")
      await userEvent.selectOptions(select, "mp   ")
      const submitButton = screen.getByText("Confirm location")
      await userEvent.click(submitButton)
      expect(fetchSpy).toHaveBeenCalledWith(
        `${BASE_URL}/api/account/holds/update/${processedHolds[0].id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            pickupLocation: "mp   ",
            patronId: "1234567",
          }),
        }
      )
    })
    it("displays success modal on successful update and updates hold location", async () => {
      await openModal()
      const select = screen.getByLabelText("Pickup location")
      await userEvent.selectOptions(select, "mp   ")
      const submitButton = screen.getByText("Confirm location")
      await userEvent.click(submitButton)
      const successMessage = screen.getByText("Location change successful", {
        exact: false,
      })
      expect(successMessage).toBeInTheDocument()
      await userEvent.click(screen.getByText("OK"))
      expect(mockUpdateHoldLocation).toHaveBeenCalled()
      mockUpdateHoldLocation.mockReset()
    })
    it("displays failure modal on failed update and does not update hold location", async () => {
      await openModal()
      const select = screen.getByLabelText("Pickup location")
      await userEvent.selectOptions(select, "mp   ")
      const submitButton = screen.getByText("Confirm location")
      await userEvent.click(submitButton)
      const errorMessage = screen.getByText("Location change failed")
      expect(errorMessage).toBeInTheDocument()
      await userEvent.click(screen.getByText("OK"))
      expect(mockUpdateHoldLocation).not.toHaveBeenCalled()
    })
  })
})
