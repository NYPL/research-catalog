import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "../../../src/utils/testUtils"
import userEvent from "@testing-library/user-event"
import mockRouter from "next-router-mock"

import EDDRequestPage, {
  getServerSideProps,
} from "../../../pages/hold/request/[id]/edd"

import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
} from "../../../src/server/auth"
import { fetchBib } from "../../../src/server/api/bib"
import { bibWithItems, bibWithSingleAeonItem } from "../../fixtures/bibFixtures"
import {
  EDD_FORM_FIELD_COPY,
  HOLD_PAGE_ERROR_HEADINGS,
  PATHS,
} from "../../../src/config/constants"
import {
  fetchDeliveryLocations,
  fetchPatronEligibility,
} from "../../../src/server/api/hold"

jest.mock("../../../src/server/auth")
jest.mock("../../../src/server/api/bib")
jest.mock("../../../src/server/sierraClient")
jest.mock("../../../src/server/api/hold")
jest.mock("../../../src/models/MyAccount")

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

const mockRes = {
  setHeader: jest.fn(),
}
const id = "b15080796-i39333697"
const mockReq = {
  headers: {
    host: "local.nypl.org:8080",
  },
  url: `/hold/request/${id}/edd`,
  cookies: {
    nyplIdentityPatron: '{"access_token":123}',
  },
}

const fillRequiredEDDFormFields = async () => {
  // Fill in all required form fields
  await userEvent.type(
    screen.getByPlaceholderText(EDD_FORM_FIELD_COPY.emailAddress.placeholder),
    EDD_FORM_FIELD_COPY.emailAddress.placeholder
  )
  await userEvent.type(
    screen.getByPlaceholderText(EDD_FORM_FIELD_COPY.startPage.placeholder),
    EDD_FORM_FIELD_COPY.startPage.placeholder
  )
  await userEvent.type(
    screen.getByPlaceholderText(EDD_FORM_FIELD_COPY.endPage.placeholder),
    EDD_FORM_FIELD_COPY.endPage.placeholder
  )
  await userEvent.type(
    screen.getByPlaceholderText(EDD_FORM_FIELD_COPY.chapterTitle.placeholder),
    EDD_FORM_FIELD_COPY.chapterTitle.placeholder
  )
}

describe("EDD Request page", () => {
  describe("logout redirect handling", () => {
    beforeEach(() => {
      ;(initializePatronTokenAuth as jest.Mock).mockResolvedValue({
        isTokenValid: true,
        errorCode: null,
        decodedPatron: { sub: "123" },
      })
      ;(fetchBib as jest.Mock).mockResolvedValue({
        discoveryBibResult: bibWithItems.resource,
        status: 200,
      })
      ;(fetchDeliveryLocations as jest.Mock).mockResolvedValue({
        eddRequestable: true,
        status: 200,
      })
    })

    it("redirects if cookie count is less than 3", async () => {
      ;(doRedirectBasedOnNyplAccountRedirects as jest.Mock).mockReturnValue(
        true
      )
      ;(initializePatronTokenAuth as jest.Mock).mockResolvedValue({
        isTokenValid: false,
      })

      const responseWithZeroRedirects = await getServerSideProps({
        params: { id },
        req: mockReq,
        res: mockRes,
        query: {},
      })
      expect(responseWithZeroRedirects.redirect).toBeDefined()
      const responseWithTwoRedirects = await getServerSideProps({
        params: { id: "123-456" },
        req: { ...mockReq, cookies: { nyplAccountRedirects: 2 } },
        res: mockRes,
        query: {},
      })
      expect(responseWithTwoRedirects.redirect).toBeDefined()
    })
    it("does not redirect if doRedirect method returns false", async () => {
      ;(doRedirectBasedOnNyplAccountRedirects as jest.Mock).mockReturnValue(
        false
      )
      ;(initializePatronTokenAuth as jest.Mock).mockResolvedValue({
        decodedPatron: { sub: "123" },
        isTokenValid: false,
      })

      const responseWithoutRedirect = await getServerSideProps({
        params: { id },
        req: mockReq,
        res: mockRes,
        query: {},
      })
      expect(responseWithoutRedirect.redirect).not.toBeDefined()
    })
    it("does not redirect if patron is authenticated", async () => {
      const response = await getServerSideProps({
        params: { id },
        req: mockReq,
        res: mockRes,
        query: {},
      })
      expect(response.redirect).toBeUndefined()
    })
    it("updates the nyplAccountRedirectsCookie upon redirecting", async () => {
      ;(doRedirectBasedOnNyplAccountRedirects as jest.Mock).mockReturnValue(
        true
      )
      ;(initializePatronTokenAuth as jest.Mock).mockResolvedValue({
        decodedPatron: { sub: "123" },
        isTokenValid: false,
      })
      await getServerSideProps({
        params: { id },
        res: mockRes,
        req: mockReq,
        query: {},
      })
      expect(mockRes.setHeader.mock.calls[0]).toStrictEqual([
        "Set-Cookie",
        "nyplAccountRedirects=1; Max-Age=10; path=/; domain=.nypl.org;",
      ])
    })
  })
  describe("aeon redirect handling", () => {
    beforeEach(() => {
      ;(initializePatronTokenAuth as jest.Mock).mockResolvedValue({
        isTokenValid: true,
        errorCode: null,
        decodedPatron: { sub: "123" },
      })
      ;(fetchBib as jest.Mock).mockResolvedValue({
        discoveryBibResult: bibWithSingleAeonItem.resource,
        status: 200,
      })
    })

    it("redirects to aeonUrl when present in the fetched item", async () => {
      const responseWithAeonRedirect = await getServerSideProps({
        params: { id },
        res: mockRes,
        req: mockReq,
        query: {},
      })
      expect(responseWithAeonRedirect.redirect).toStrictEqual({
        destination: bibWithSingleAeonItem.resource.items[0].aeonUrl[0],
        permanent: false,
      })
    })
  })
  describe("server-side validation", () => {
    beforeEach(() => {
      ;(initializePatronTokenAuth as jest.Mock).mockResolvedValue({
        isTokenValid: true,
        errorCode: null,
        decodedPatron: { sub: "123" },
      })
      ;(fetchBib as jest.Mock).mockResolvedValue({
        discoveryBibResult: {
          ...bibWithItems.resource,
          items: [{ ...bibWithItems.resource.items[0], eddRequestable: true }],
        },
        status: 200,
      })
      ;(fetchPatronEligibility as jest.Mock).mockResolvedValue({
        eligibility: true,
        status: 200,
      })
      ;(fetchDeliveryLocations as jest.Mock).mockResolvedValue({
        eddRequestable: true,
        status: 200,
      })
    })

    it("initializes holdErrorStatus as invalid when formInvalid query param is present url ", async () => {
      const response = await getServerSideProps({
        params: { id },
        res: mockRes,
        req: mockReq,
        query: { formInvalid: "true" },
      })
      expect(response.props.holdErrorStatus).toStrictEqual("invalid")
    })
  })
  describe("EDD Request page UI", () => {
    beforeEach(() => {
      render(
        <EDDRequestPage
          discoveryBibResult={bibWithItems.resource}
          discoveryItemResult={bibWithItems.resource.items[2]}
          patronId="123"
          isAuthenticated={true}
        />
      )
    })

    it("renders an H2", () => {
      expect(screen.getAllByRole("heading", { level: 2 })[0]).toHaveTextContent(
        "Request scan"
      )
    })

    it("renders the top bib and item details", () => {
      expect(screen.getAllByTestId("title")[0]).toHaveTextContent(
        "Urban spaghetti."
      )
      expect(screen.getByTestId("call-number")).toHaveTextContent(
        "JFK 01-374 v. 2, no. 1 (1999)"
      )
      expect(screen.getByTestId("volume-date")).toHaveTextContent(
        "v. 2, no. 1 (1999)"
      )
    })

    it("renders an edd request form", () => {
      expect(screen.getByTestId("edd-request-form")).toBeInTheDocument()
    })
  })
  describe("EDD Request prepopulated form fields", () => {
    it("prepopulates the email field with the patron's email address if present", () => {
      render(
        <EDDRequestPage
          discoveryBibResult={bibWithItems.resource}
          discoveryItemResult={bibWithItems.resource.items[2]}
          patronId="123"
          patronEmail="test@test.com"
          isAuthenticated={true}
        />
      )

      expect(screen.getByDisplayValue("test@test.com")).toBeInTheDocument()
    })
    it("prepopulates all form fields and overwrites patron email when form fields are present in url", () => {
      mockRouter.push(
        `${PATHS.HOLD_REQUEST}/123-456/edd?formState={%22source%22:%22sierra-nypl%22,%22emailAddress%22:%22test@test.com%22,%22startPage%22:%22ch%201%22,%22endPage%22:%22ch%205%22,%22chapterTitle%22:%22on%20spaghetti%22,%22author%22:%22%22,%22date%22:%22%22,%22volume%22:%22%22,%22issue%22:%22%22,%22requestNotes%22:%22%22}`
      )
      render(
        <EDDRequestPage
          discoveryBibResult={bibWithItems.resource}
          discoveryItemResult={bibWithItems.resource.items[2]}
          patronId="123"
          patronEmail="patron@test.com"
          isAuthenticated={true}
        />
      )

      expect(screen.getByDisplayValue("test@test.com")).toBeInTheDocument()
      expect(screen.getByDisplayValue("ch 1")).toBeInTheDocument()
      expect(screen.getByDisplayValue("ch 5")).toBeInTheDocument()
      expect(screen.getByDisplayValue("on spaghetti")).toBeInTheDocument()

      // Clear query params for next test
      // TODO: Investigate if there's a more optimal way to test router changes without requiring cleanup for the next test
      mockRouter.push(`${PATHS.HOLD_REQUEST}/123-456/edd`)
    })
  })
  describe("EDD Request form validation", () => {
    beforeEach(async () => {
      render(
        <EDDRequestPage
          discoveryBibResult={bibWithItems.resource}
          discoveryItemResult={bibWithItems.resource.items[0]}
          patronId="123"
          isAuthenticated={true}
        />
      )
    })

    it("shows an error when there is a 500 error response from the edd api", async () => {
      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 500,
          json: () => Promise.resolve({ success: true }),
        })
      )

      await fillRequiredEDDFormFields()

      fireEvent(screen.getByText("Submit request"), new MouseEvent("click"))
      await waitFor(() => {
        expect(screen.getByTestId("hold-request-error")).toBeInTheDocument()
      })

      expect(
        screen.getByText("Request failed.", { exact: false })
      ).toBeInTheDocument()

      expect(
        screen.queryByText(
          "We were unable to process your request at this time. Please ",
          { exact: false }
        )
      ).toBeInTheDocument()

      expect(
        screen.getByRole("button", { name: "contact us" })
      ).toBeInTheDocument()
    })

    it("shows an error when there is a invalid patron response response from the edd api", async () => {
      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 403,
          json: () => Promise.resolve({ success: true }),
        })
      )

      await fillRequiredEDDFormFields()

      fireEvent(screen.getByText("Submit request"), new MouseEvent("click"))
      await waitFor(() => {
        expect(screen.getByTestId("hold-request-error")).toBeInTheDocument()
      })

      expect(
        screen.getByText("Request failed.", { exact: false })
      ).toBeInTheDocument()

      expect(
        screen.queryByText(
          "We were unable to process your request at this time. Please ",
          { exact: false }
        )
      ).toBeInTheDocument()

      expect(
        screen.getByRole("button", { name: "contact us" })
      ).toBeInTheDocument()
    })

    it("populates the feedback form with the call number and appropriate copy when the request fails", async () => {
      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 500,
          json: () => Promise.resolve({ success: true }),
        })
      )

      await fillRequiredEDDFormFields()

      fireEvent(screen.getByText("Submit request"), new MouseEvent("click"))

      await waitFor(() => {
        expect(screen.getByTestId("hold-request-error")).toBeInTheDocument()
      })

      await userEvent.click(screen.getByText("contact us"))

      await waitFor(() => {
        expect(
          screen.queryByText("We are here to help!", { exact: false })
        ).toBeInTheDocument()

        expect(
          screen.queryByText(
            `Request failed for call number ${bibWithItems.resource.items[0].shelfMark[0]}`,
            {
              exact: false,
            }
          )
        ).toBeInTheDocument()
      })
    })

    it("shows an error when any field is invalid", async () => {
      fireEvent.change(
        screen.getByPlaceholderText(
          EDD_FORM_FIELD_COPY.emailAddress.placeholder
        ),
        { target: { value: "bademail" } }
      )
      fireEvent(screen.getByText("Submit request"), new MouseEvent("click"))

      await waitFor(() => {
        expect(screen.getByTestId("hold-request-error")).toBeInTheDocument()
      })
      expect(
        screen.getByText(
          "Some fields contain errors. Please correct and submit again."
        )
      ).toBeInTheDocument()
    })
    it("shows a field errors when invalid field state is passed as a query param", async () => {
      mockRouter.push(
        `${PATHS.HOLD_REQUEST}/123-456/edd?formInvalid=true&validatedFields=[{%22key%22:%22emailAddress%22,%22isInvalid%22:true},{%22key%22:%22startPage%22,%22isInvalid%22:true},{%22key%22:%22endPage%22,%22isInvalid%22:true},{%22key%22:%22chapterTitle%22,%22isInvalid%22:true}]`
      )
      render(
        <EDDRequestPage
          discoveryBibResult={bibWithItems.resource}
          discoveryItemResult={bibWithItems.resource.items[0]}
          patronId="123"
          isAuthenticated={true}
        />
      )
      expect(
        screen.getByText(
          "There was a problem. Enter a valid email address. Your request will be delivered to the email address you enter above."
        )
      ).toBeInTheDocument()
      expect(
        screen.getAllByText(
          "There was a problem. Enter a page number. You may request a maximum of 50 pages."
        )
      ).toHaveLength(2)
      expect(
        screen.getByText(
          "There was a problem. Indicate the title of the chapter or article you are requesting."
        )
      ).toBeInTheDocument()
    })
  })
  describe("EDD page status banner messages", () => {
    it("shows an unavailable error message when the page loads with an unavailable status", async () => {
      render(
        <EDDRequestPage
          discoveryBibResult={bibWithItems.resource}
          discoveryItemResult={bibWithItems.resource.items[0]}
          patronId="123"
          isAuthenticated={true}
          holdErrorStatus="eddUnavailable"
        />
      )
      expect(
        screen.getByText(HOLD_PAGE_ERROR_HEADINGS.eddUnavailable)
      ).toBeInTheDocument()
    })
    it("shows a failed error message when the page loads with an failed status", async () => {
      render(
        <EDDRequestPage
          discoveryBibResult={bibWithItems.resource}
          discoveryItemResult={bibWithItems.resource.items[0]}
          patronId="123"
          isAuthenticated={true}
          holdErrorStatus="failed"
        />
      )
      expect(
        screen.getByText(HOLD_PAGE_ERROR_HEADINGS.failed)
      ).toBeInTheDocument()
    })
    it("shows an invalid error message when the page loads with an invalid status", async () => {
      render(
        <EDDRequestPage
          discoveryBibResult={bibWithItems.resource}
          discoveryItemResult={bibWithItems.resource.items[0]}
          patronId="123"
          isAuthenticated={true}
          holdErrorStatus="invalid"
        />
      )
      expect(
        screen.getByText(
          "Some fields contain errors. Please correct and submit again."
        )
      ).toBeInTheDocument()
    })
  })
  describe("EDD Request patron ineligibility messaging", () => {
    beforeEach(async () => {
      render(
        <EDDRequestPage
          discoveryBibResult={bibWithItems.resource}
          discoveryItemResult={bibWithItems.resource.items[0]}
          patronId="123"
          isAuthenticated={true}
        />
      )

      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 401,
          json: () =>
            Promise.resolve({
              success: false,
              patronEligibilityStatus: {
                eligibility: false,
                expired: true,
                moneyOwed: true,
                ptypeDisallowsHolds: true,
                reachedHoldLimit: true,
              },
            }),
        })
      )

      await fillRequiredEDDFormFields()

      await fireEvent(
        screen.getByText("Submit request"),
        new MouseEvent("click")
      )
    })

    it("shows an error listing ineligibility reasons when the patron is ineligibile to place holds", async () => {
      await waitFor(() => {
        expect(screen.getByTestId("hold-request-error")).toBeInTheDocument()
      })

      expect(
        screen.getByText(HOLD_PAGE_ERROR_HEADINGS.patronIneligible, {
          exact: false,
        })
      ).toBeInTheDocument()

      expect(
        screen.getByText("Your account has expired", {
          exact: false,
        })
      ).toBeInTheDocument()

      expect(
        screen.getByText("Your fines have exceeded the limit", {
          exact: false,
        })
      ).toBeInTheDocument()

      expect(
        screen.getByText(
          "Your card does not permit placing holds on ReCAP materials.",
          {
            exact: false,
          }
        )
      ).toBeInTheDocument()

      expect(
        screen.getByText("You have reached the allowed number of holds.", {
          exact: false,
        })
      ).toBeInTheDocument()

      expect(screen.getByText("Submit request")).toBeDisabled()
    })
  })
  describe("EDD request already completed renders warning banner", () => {
    // Item ID from bibWithItems
    sessionStorage.setItem("holdCompleted-i39333697", "true")
    render(
      <EDDRequestPage
        discoveryBibResult={bibWithItems.resource}
        discoveryItemResult={bibWithItems.resource.items[0]}
        patronId="123"
        isAuthenticated={true}
      />
    )
    expect(
      screen.getByText("You've already requested a scan of this item")
    ).toBeInTheDocument()
  })
  describe("EDD request not found", () => {
    render(
      <EDDRequestPage
        discoveryBibResult={undefined}
        discoveryItemResult={undefined}
        patronId="123"
        isAuthenticated={true}
        bibItemErrorStatus={404}
      />
    )
    expect(screen.getByText("We couldn't find that page")).toBeInTheDocument()
  })
})
