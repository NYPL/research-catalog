import MyAccount, {
  getServerSideProps,
} from "../../../pages/account/[[...index]]"
import { MyAccountFactory } from "../../../src/models/MyAccount"
import { render, screen } from "../../../src/utils/testUtils"
import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
} from "../../../src/server/auth"
import {
  processedPatron,
  processedCheckouts,
  processedHolds,
  processedFines,
  filteredPickupLocations,
} from "../../fixtures/processedMyAccountData"

jest.mock("../../../src/server/auth")
jest.mock("../../../src/models/MyAccount")
jest.mock("../../../src/server/sierraClient")

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

const mockRes = {
  setHeader: jest.fn(),
}
const mockReq = {
  headers: {
    host: "local.nypl.org:8080",
  },
  url: "/account",
  cookies: {
    nyplIdentityPatron: '{"access_token":123}',
  },
}

describe("MyAccount page", () => {
  beforeEach(() => {
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValue({
      isTokenValid: true,
      errorCode: null,
      decodedPatron: { sub: "123" },
    })
  })
  describe("logout redirect handling", () => {
    beforeAll(() => {
      ;(MyAccountFactory as jest.Mock).mockResolvedValue({
        pickupLocations: filteredPickupLocations,
        checkouts: processedCheckouts,
        patron: processedPatron,
        fines: processedFines,
        holds: processedHolds,
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
        req: mockReq,
        res: mockRes,
      })
      expect(responseWithZeroRedirects.redirect).toBeDefined()
      const responseWithTwoRedirects = await getServerSideProps({
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
        req: mockReq,
        res: mockRes,
      })
      expect(responseWithoutRedirect.props.renderAuthServerError).toBe(true)
    })
    it("does not redirect if patron is authenticated", async () => {
      const response = await getServerSideProps({ req: mockReq, res: mockRes })
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
      await getServerSideProps({ res: mockRes, req: mockReq })
      expect(mockRes.setHeader.mock.calls[0]).toStrictEqual([
        "Set-Cookie",
        "nyplAccountRedirects=1; Max-Age=10; path=/; domain=.nypl.org;",
      ])
    })
  })
  it("can handle null values for checkouts, holds, fines", () => {
    expect(() =>
      render(
        <MyAccount
          accountData={{
            pickupLocations: filteredPickupLocations,
            checkouts: null,
            holds: null,
            fines: null,
            patron: processedPatron,
          }}
          isAuthenticated={true}
        />
      )
    ).not.toThrow()
  })
  it("displays an error message when patron is empty", () => {
    render(
      <MyAccount
        accountData={{
          pickupLocations: filteredPickupLocations,
          checkouts: null,
          holds: null,
          fines: null,
          patron: null,
        }}
        isAuthenticated={true}
      />
    )
    expect(screen.getByText("We are unable to display", { exact: false }))
  })

  it("redirects /overdues to /account if user has no fees", async () => {
    ;(MyAccountFactory as jest.Mock).mockResolvedValueOnce({
      pickupLocations: filteredPickupLocations,
      checkouts: processedCheckouts,
      patron: processedPatron,
      fines: { total: 0, entries: [] },
      holds: processedHolds,
    })

    const req = {
      ...mockReq,
      url: "/account/overdues",
    }

    const result = await getServerSideProps({ req, res: mockRes })
    expect(result).toStrictEqual({
      redirect: { destination: "/account", permanent: false },
    })
  })

  it("redirects invalid paths to /account", async () => {
    ;(MyAccountFactory as jest.Mock).mockResolvedValueOnce({
      pickupLocations: filteredPickupLocations,
      checkouts: processedCheckouts,
      patron: processedPatron,
      fines: processedFines,
      holds: processedHolds,
    })

    const req = {
      ...mockReq,
      url: "/account/spaghetti",
    }

    const result = await getServerSideProps({ req: req, res: mockRes })
    expect(result).toStrictEqual({
      redirect: { destination: "/account", permanent: false },
    })
  })

  it("corrects invalid path to correct path, ex. /account/settings", async () => {
    ;(MyAccountFactory as jest.Mock).mockResolvedValueOnce({
      checkouts: processedCheckouts,
      patron: processedPatron,
      fines: processedFines,
      holds: processedHolds,
    })

    const req = {
      ...mockReq,
      url: "/account/settings/spaghetti",
    }

    const result = await getServerSideProps({ req: req, res: mockRes })
    expect(result).toStrictEqual({
      redirect: { destination: "/account/settings", permanent: false },
    })
  })

  it("allows valid path to /account/settings", async () => {
    ;(MyAccountFactory as jest.Mock).mockResolvedValueOnce({
      checkouts: processedCheckouts,
      patron: processedPatron,
      fines: processedFines,
      holds: processedHolds,
    })

    const req = {
      ...mockReq,
      url: "/account/settings",
    }

    const result = await getServerSideProps({ req: req, res: mockRes })
    expect(result.props.tabsPath).toBe("settings")
  })

  it("allows valid path to /account/overdues", async () => {
    ;(MyAccountFactory as jest.Mock).mockResolvedValueOnce({
      checkouts: processedCheckouts,
      patron: processedPatron,
      fines: processedFines,
      holds: processedHolds,
    })

    const req = {
      ...mockReq,
      url: "/account/overdues",
    }

    const result = await getServerSideProps({ req: req, res: mockRes })
    expect(result.props.tabsPath).toBe("overdues")
  })
  it("renders notification banner if user has fines", () => {
    render(
      <MyAccount
        isAuthenticated={true}
        accountData={{
          checkouts: processedCheckouts,
          holds: processedHolds,
          patron: processedPatron,
          fines: processedFines,
          pickupLocations: filteredPickupLocations,
        }}
      />
    )
    const notification = screen.queryByText("You have outstanding fees", {
      exact: false,
    })
    expect(notification).toBeInTheDocument()
  })

  it("does not render notification banner if user does not have fines", () => {
    render(
      <MyAccount
        isAuthenticated={true}
        accountData={{
          pickupLocations: filteredPickupLocations,
          patron: processedPatron,
          checkouts: processedCheckouts,
          holds: processedHolds,
          fines: { total: 0, entries: [] },
        }}
      />
    )
    const notification = screen.queryByText("You have outstanding fees", {
      exact: false,
    })
    expect(notification).not.toBeInTheDocument()
  })

  it("renders user guide banner", () => {
    render(
      <MyAccount
        isAuthenticated={true}
        accountData={{
          pickupLocations: filteredPickupLocations,
          patron: processedPatron,
          checkouts: processedCheckouts,
          holds: processedHolds,
          fines: { total: 0, entries: [] },
        }}
      />
    )
    const userGuideText = screen.queryByText(
      "learn more about using the Research Catalog and requesting research materials",
      {
        exact: false,
      }
    )
    expect(userGuideText).toBeInTheDocument()
  })
})
