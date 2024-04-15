import MyAccount, {
  getServerSideProps,
} from "../../../pages/account/[[...index]]"
import { MyAccountFactory } from "../../../src/models/MyAccount"
import { render, screen } from "../../../src/utils/testUtils"
import initializePatronTokenAuth from "../../../src/server/auth"
import {
  mockCheckouts,
  mockFines,
  mockHolds,
  mockPatron,
} from "../../fixtures/myAccountFixtures"

jest.mock("../../../src/server/auth")
jest.mock("../../../src/models/MyAccount")

describe("MyAccount page", () => {
  it("displays an error message when patron is empty", () => {
    render(<MyAccount isAuthenticated={true} />)
    expect(screen.getByText("We are unable to display", { exact: false }))
  })

  beforeEach(() => {
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValueOnce({
      isTokenValid: true,
      errorCode: null,
      decodedPatron: { sub: "123" },
    })
  })

  it("redirects /overdues to /account if user has no fees", async () => {
    ;(MyAccountFactory as jest.Mock).mockResolvedValueOnce({
      checkouts: mockCheckouts,
      patron: mockPatron,
      fines: { total: 0, entries: [] },
      holds: mockHolds,
    })

    const mockReq = {
      headers: {
        host: "local.nypl.org:8080",
      },
      url: "/account/overdues",
      cookies: {
        nyplIdentityPatron: '{"access_token":123}',
      },
    }

    const result = await getServerSideProps({ req: mockReq })
    expect(result).toStrictEqual({
      redirect: { destination: "/account", permanent: false },
    })
  })

  it("redirects invalid paths to /account", async () => {
    ;(MyAccountFactory as jest.Mock).mockResolvedValueOnce({
      checkouts: mockCheckouts,
      patron: mockPatron,
      fines: mockFines,
      holds: mockHolds,
    })

    const mockReq = {
      headers: {
        host: "local.nypl.org:8080",
      },
      url: "/account/spaghetti",
      cookies: {
        nyplIdentityPatron: '{"access_token":123}',
      },
    }

    const result = await getServerSideProps({ req: mockReq })
    expect(result).toStrictEqual({
      redirect: { destination: "/account", permanent: false },
    })
  })

  it("corrects invalid path to correct path, ex. /account/settings", async () => {
    ;(MyAccountFactory as jest.Mock).mockResolvedValueOnce({
      checkouts: mockCheckouts,
      patron: mockPatron,
      fines: mockFines,
      holds: mockHolds,
    })

    const mockReq = {
      headers: {
        host: "local.nypl.org:8080",
      },
      url: "/account/settings/spaghetti",
      cookies: {
        nyplIdentityPatron: '{"access_token":123}',
      },
    }

    const result = await getServerSideProps({ req: mockReq })
    expect(result).toStrictEqual({
      redirect: { destination: "/account/settings", permanent: false },
    })
  })

  it("allows valid path to /account/settings", async () => {
    ;(MyAccountFactory as jest.Mock).mockResolvedValueOnce({
      checkouts: mockCheckouts,
      patron: mockPatron,
      fines: mockFines,
      holds: mockHolds,
    })

    const mockReq = {
      headers: {
        host: "local.nypl.org:8080",
      },
      url: "/account/settings",
      cookies: {
        nyplIdentityPatron: '{"access_token":123}',
      },
    }

    const result = await getServerSideProps({ req: mockReq })
    expect(result.props.tabsPath).toBe("settings")
  })

  it("allows valid path to /account/overdues", async () => {
    ;(MyAccountFactory as jest.Mock).mockResolvedValueOnce({
      checkouts: mockCheckouts,
      patron: mockPatron,
      fines: mockFines,
      holds: mockHolds,
    })

    const mockReq = {
      headers: {
        host: "local.nypl.org:8080",
      },
      url: "/account/overdues",
      cookies: {
        nyplIdentityPatron: '{"access_token":123}',
      },
    }

    const result = await getServerSideProps({ req: mockReq })
    expect(result.props.tabsPath).toBe("overdues")
  })
})
