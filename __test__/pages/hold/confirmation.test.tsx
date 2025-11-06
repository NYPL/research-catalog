import HoldConfirmationPage, {
  getServerSideProps,
} from "../../../pages/hold/confirmation/[id]"
import { render, screen } from "../../../src/utils/testUtils"
import { bibWithItems } from "../../fixtures/bibFixtures"

import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
} from "../../../src/server/auth"

import { fetchBib } from "../../../src/server/api/bib"
import {
  fetchHoldDetails,
  fetchDeliveryLocations,
} from "../../../src/server/api/hold"

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
  url: `/hold/confirmation/${id}`,
  cookies: {
    nyplIdentityPatron: '{"access_token":123}',
  },
}

describe("Hold Confirmation page", () => {
  describe("logout redirect handling", () => {
    beforeEach(() => {
      ;(initializePatronTokenAuth as jest.Mock).mockResolvedValue({
        isTokenValid: true,
        errorCode: null,
        decodedPatron: { sub: "123" },
      })
      ;(fetchHoldDetails as jest.Mock).mockResolvedValue({
        patronId: "123",
        pickupLocation: "mal17",
        status: 200,
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

  describe("On-site Confirmation page UI", () => {
    beforeEach(() => {
      render(
        <HoldConfirmationPage
          discoveryBibResult={bibWithItems.resource}
          pickupLocationLabel="Schwarzman Building"
        />
      )
    })

    it("renders an H2", () => {
      expect(screen.getAllByRole("heading", { level: 2 })[0]).toHaveTextContent(
        "Request for on-site use"
      )
    })

    it("renders a success banner with a link to the requested item's bib", () => {
      expect(screen.getAllByRole("heading", { level: 2 })[1]).toHaveTextContent(
        "Request successful"
      )
      expect(
        screen.queryByText(
          "You're all set! We have received your request for",
          {
            exact: false,
          }
        )
      ).toBeInTheDocument()

      const bibLink = screen.getByText("Urban spaghetti.")
      expect(bibLink).toHaveAttribute("href", "/bib/b15080796")
    })
    it("renders an item details table with a pickup location for on-site holds", () => {
      expect(screen.getByTestId("pickup-location")).toHaveTextContent(
        "Schwarzman Building"
      )
      expect(screen.getByTestId("call-number")).toHaveTextContent(
        "JFK 01-374 no. 4 (2001)"
      )
      expect(screen.getByTestId("barcode")).toHaveTextContent("33433130221975")
    })
    it("renders an on-site specific faq accordion", () => {
      expect(screen.getByTestId("on-site-confirmation-faq")).toBeInTheDocument()
    })
    it("renders a back to search link", () => {
      const searchLink = screen.getByText("Start a new search")
      expect(searchLink).toHaveAttribute("href", "/")
    })
  })
  describe("Electronic Delivery Confirmation page UI", () => {
    beforeEach(() => {
      render(
        <HoldConfirmationPage
          discoveryBibResult={bibWithItems.resource}
          isEDD
          itemId="test"
        />
      )
    })

    it("renders an H2", () => {
      expect(screen.getAllByRole("heading", { level: 2 })[0]).toHaveTextContent(
        "Request scan"
      )
    })

    it("renders a success banner with a link to the requested item's bib", () => {
      expect(screen.getAllByRole("heading", { level: 2 })[1]).toHaveTextContent(
        "Request successful"
      )
      expect(
        screen.queryByText(
          "You're all set! We have received your scan request for",
          {
            exact: false,
          }
        )
      ).toBeInTheDocument()

      const bibLink = screen.getByText("Urban spaghetti.")
      expect(bibLink).toHaveAttribute("href", "/bib/b15080796")
    })
    it("renders an item details table without a pickup location for EDD holds", () => {
      expect(screen.queryByTestId("pickup-location")).not.toBeInTheDocument()
      expect(screen.getByTestId("call-number")).toHaveTextContent(
        "JFK 01-374 no. 4 (2001)"
      )
      expect(screen.getByTestId("barcode")).toHaveTextContent("33433130221975")
    })
    it("renders an edd-specific faq accordion", () => {
      expect(screen.getByTestId("edd-confirmation-faq")).toBeInTheDocument()
    })
    it("renders a back to search link", () => {
      const searchLink = screen.getByText("Start a new search")
      expect(searchLink).toHaveAttribute("href", "/")
    })
    it("sets sessionStorage key 'holdCompleted' with item ID to true on mount", () => {
      expect(sessionStorage.getItem("holdCompleted-test")).toBe("true")
    })
  })
  describe("Hold confirmation not found", () => {
    render(
      <HoldConfirmationPage
        discoveryBibResult={undefined}
        pickupLocationLabel={undefined}
        errorStatus={404}
      />
    )
    expect(screen.getByText("We couldn't find that page")).toBeInTheDocument()
  })
})
