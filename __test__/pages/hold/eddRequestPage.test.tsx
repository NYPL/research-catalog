import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "../../../src/utils/testUtils"
import userEvent from "@testing-library/user-event"

import EDDRequestPage, {
  getServerSideProps,
} from "../../../pages/hold/request/[id]/edd"

import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
} from "../../../src/server/auth"
import { fetchBib } from "../../../src/server/api/bib"
import { bibWithItems, bibWithSingleAeonItem } from "../../fixtures/bibFixtures"
import {
  BASE_URL,
  PATHS,
  EDD_FORM_FIELD_COPY,
  HOLD_PAGE_ERROR_HEADINGS,
} from "../../../src/config/constants"
import { fetchDeliveryLocations } from "../../../src/server/api/hold"

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
      })
      expect(responseWithZeroRedirects.redirect).toBeDefined()
      const responseWithTwoRedirects = await getServerSideProps({
        params: { id: "123-456" },
        req: { ...mockReq, cookies: { nyplAccountRedirects: 2 } },
        res: mockRes,
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
      })
      expect(responseWithoutRedirect.redirect).not.toBeDefined()
    })
    it("does not redirect if patron is authenticated", async () => {
      const response = await getServerSideProps({
        params: { id },
        req: mockReq,
        res: mockRes,
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
      })
      expect(responseWithAeonRedirect.redirect).toStrictEqual({
        destination: bibWithSingleAeonItem.resource.items[0].aeonUrl[0],
        permanent: false,
      })
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
    beforeEach(() => {
      render(
        <EDDRequestPage
          discoveryBibResult={bibWithItems.resource}
          discoveryItemResult={bibWithItems.resource.items[2]}
          patronId="123"
          patronEmail="test@test.com"
          isAuthenticated={true}
        />
      )
    })
    it("prepopulates the email field with the patron's email address if present", () => {
      expect(screen.getByDisplayValue("test@test.com")).toBeInTheDocument()
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

      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 500,
          json: () => Promise.resolve({ success: true }),
        })
      )

      await fillRequiredEDDFormFields()
    })

    it("shows an error when the request fails", async () => {
      fireEvent(screen.getByText("Submit request"), new MouseEvent("click"))
      await waitFor(() => {
        expect(screen.getByTestId("hold-request-error")).toBeInTheDocument()
      })

      expect(
        screen.getByText("Request failed.", { exact: false })
      ).toBeInTheDocument()

      expect(
        screen.queryByText(
          "We were unable to process your request at this time. Please try again, ",
          { exact: false }
        )
      ).toBeInTheDocument()

      expect(
        screen.getByRole("button", { name: "contact us" })
      ).toBeInTheDocument()

      expect(
        screen.getByText("start a new search", { exact: false })
      ).toHaveAttribute("href", `${BASE_URL}${PATHS.SEARCH}`)
    })

    it("populates the feedback form with the call number and appropriate copy when the request fails", async () => {
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
  })
  describe("EDD page status banner messages", () => {
    it("shows an unavailable error message when the page loads with an unavailable status", async () => {
      render(
        <EDDRequestPage
          discoveryBibResult={bibWithItems.resource}
          discoveryItemResult={bibWithItems.resource.items[0]}
          patronId="123"
          isAuthenticated={true}
          errorStatus="eddUnavailable"
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
          errorStatus="failed"
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
          errorStatus="invalid"
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
        screen.getByText("This is because:", {
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
    })
  })
})
