import HoldRequestPage, {
  getServerSideProps,
} from "../../../pages/hold/request/[id]"
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "../../../src/utils/testUtils"
import userEvent from "@testing-library/user-event"

import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
} from "../../../src/server/auth"
import { fetchBib } from "../../../src/server/api/bib"
import { bibWithItems, bibWithSingleAeonItem } from "../../fixtures/bibFixtures"
import { BASE_URL, PATHS, NYPL_LOCATIONS } from "../../../src/config/constants"
import { fetchDeliveryLocations } from "../../../src/server/api/hold"

jest.mock("../../../src/server/auth")
jest.mock("../../../src/server/api/bib")
jest.mock("../../../src/server/sierraClient")
jest.mock("../../../src/server/api/hold")

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

const mockRes = {
  setHeader: jest.fn(),
}
const id = "b15080796-i39333697"
const mockReq = {
  headers: {
    host: "local.nypl.org:8080",
  },
  url: `/hold/request/${id}`,
  cookies: {
    nyplIdentityPatron: '{"access_token":123}',
  },
}

describe("Hold Request page", () => {
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
        deliveryLocations: [
          {
            key: "schwarzman",
            value: "mag",
            address: "476 Fifth Avenue (42nd St and Fifth Ave)",
            label: "Schwarzman Building - Milstein Division Room 121",
          },
          {
            key: "lpa",
            value: "par",
            address: "40 Lincoln Center Plaza",
            label: "Library for the Performing Arts",
          },
        ],
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
  describe("Hold Request page UI", () => {
    beforeEach(() => {
      render(
        <HoldRequestPage
          discoveryBibResult={bibWithItems.resource}
          discoveryItemResult={bibWithItems.resource.items[0]}
          patronId="123"
          deliveryLocations={[
            {
              key: "schwarzman",
              label: "Schwarzman",
              value: "loc:mal17",
              address: NYPL_LOCATIONS["schwarzman"].address,
            },
          ]}
          isAuthenticated={true}
        />
      )
    })

    it("renders an H2", () => {
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Request for on-site use"
      )
    })

    it("renders the top bib and item details", () => {
      expect(screen.getAllByTestId("title")[0]).toHaveTextContent(
        "Urban spaghetti."
      )
      expect(screen.getByTestId("call-number")).toHaveTextContent(
        "JFK 01-374 no. 4 (2001)"
      )
      expect(screen.getByTestId("volume-date")).toHaveTextContent(
        "no. 4 (2001)"
      )
    })

    it("renders a hold request form", () => {
      expect(screen.getByTestId("hold-request-form")).toBeInTheDocument()
    })
  })
  describe("Hold Request error handling", () => {
    beforeEach(async () => {
      render(
        <HoldRequestPage
          discoveryBibResult={bibWithItems.resource}
          discoveryItemResult={bibWithItems.resource.items[0]}
          patronId="123"
          deliveryLocations={[
            {
              key: "schwarzman",
              label: "Schwarzman",
              value: "loc:mal17",
              address: NYPL_LOCATIONS["schwarzman"].address,
            },
          ]}
          isAuthenticated={true}
        />
      )

      global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
          status: 404,
          json: () => Promise.resolve({ success: true }),
        })
      )

      await fireEvent(
        screen.getByText("Submit request"),
        new MouseEvent("click")
      )
    })

    it("shows an error when there is a bad response from the hold api", async () => {
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
  })
})
