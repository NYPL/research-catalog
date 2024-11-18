import EDDRequestPage, {
  getServerSideProps,
} from "../../../pages/hold/request/[id]/edd"
import { render, screen } from "../../../src/utils/testUtils"

import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
} from "../../../src/server/auth"
import { fetchBib } from "../../../src/server/api/bib"
import { bibWithItems, bibWithSingleAeonItem } from "../../fixtures/bibFixtures"
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
  url: `/hold/request/${id}/edd`,
  cookies: {
    nyplIdentityPatron: '{"access_token":123}',
  },
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
          eddRequestable={true}
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
})
