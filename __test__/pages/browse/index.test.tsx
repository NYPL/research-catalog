import Browse, {
  getServerSideProps,
} from "../../../pages/browse/[[...browseType]]"
import { render, screen } from "../../../src/utils/testUtils"
import mockRouter from "next-router-mock"
import userEvent from "@testing-library/user-event"
import { discoverySubjectsResult } from "../../fixtures/subjectFixtures"
import { fetchBrowse } from "../../../src/server/api/browse"
import initializePatronTokenAuth from "../../../src/server/auth"
import type { HTTPStatusCode } from "../../../src/types/appTypes"
import { discoveryContributorsResult } from "../../fixtures/contributorFixtures"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))
jest.mock("../../../src/server/api/browse")
jest.mock("../../../src/server/auth")

const mockSubjectResults = {
  status: 200 as HTTPStatusCode,
  totalResults: 4,
  subjects: discoverySubjectsResult,
}

const mockContributorResults = {
  status: 200 as HTTPStatusCode,
  totalResults: 4,
  contributors: discoveryContributorsResult,
}

describe("Browse index page", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/browse")
  })

  it("renders empty state when no query is present", () => {
    //@ts-ignore
    render(<Browse results={{}} isAuthenticated={false} />)

    expect(
      screen.getByText(/Use the search bar above to start browsing/i)
    ).toBeInTheDocument()
  })

  it("renders subject results when query is present", async () => {
    await mockRouter.push("/browse?q=test")

    render(<Browse results={mockSubjectResults} isAuthenticated={false} />)

    expect(screen.getByTestId("browse-results-heading")).toBeInTheDocument()
  })

  it("renders contributor results when browseType is authors", async () => {
    await mockRouter.push("/browse/authors?q=test")

    render(<Browse results={mockContributorResults} isAuthenticated={false} />)

    expect(screen.getByTestId("browse-results-heading")).toBeInTheDocument()
  })

  it("updates query string when sort is changed", async () => {
    await mockRouter.push("/browse?q=test")

    render(<Browse results={mockSubjectResults} isAuthenticated={false} />)

    const sortBy = screen.getAllByLabelText("Sort by", { exact: false })[0]
    userEvent.click(sortBy)

    await userEvent.click(screen.getByText(/A - Z/i))

    expect(mockRouter.asPath).toContain("sort=termLabel&sort_direction=asc")
  })

  it("renders error state when errorStatus is provided", () => {
    render(
      <Browse
        results={mockSubjectResults}
        isAuthenticated={false}
        errorStatus={500}
      />
    )

    expect(
      screen.getByText(/We encountered an error while trying to load the page/)
    ).toBeInTheDocument()
  })
})

describe("getServerSideProps", () => {
  beforeEach(() => {
    ;(initializePatronTokenAuth as jest.Mock).mockResolvedValue({
      isTokenValid: true,
      errorCode: null,
      decodedPatron: { sub: "123" },
    })
  })

  it("skips fetchBrowse when no query is provided", async () => {
    const result = await getServerSideProps({
      req: { cookies: {} },
      params: {},
      query: {},
    } as any)

    expect(result).toEqual({
      props: {
        isAuthenticated: true,
        results: {},
      },
    })
  })

  it("calls fetchBrowse with subjects by default", async () => {
    ;(fetchBrowse as jest.Mock).mockResolvedValue({
      status: 200,
      totalResults: 0,
      subjects: [],
    })

    await getServerSideProps({
      req: { cookies: {} },
      params: {},
      query: { q: "test" },
    } as any)

    expect(fetchBrowse).toHaveBeenCalledWith(
      "subjects",
      expect.objectContaining({ q: "test" })
    )
  })

  it("calls fetchBrowse with contributors when authors route is used", async () => {
    ;(fetchBrowse as jest.Mock).mockResolvedValue({
      status: 200,
      totalResults: 0,
      contributors: [],
    })

    await getServerSideProps({
      req: { cookies: {} },
      params: { browseType: ["authors"] },
      query: { q: "test" },
    } as any)

    expect(fetchBrowse).toHaveBeenCalledWith(
      "contributors",
      expect.objectContaining({ q: "test" })
    )
  })

  it("returns errorStatus when fetchBrowse fails", async () => {
    ;(fetchBrowse as jest.Mock).mockResolvedValue({
      status: 500,
    })

    const result = await getServerSideProps({
      req: { cookies: {} },
      params: {},
      query: { q: "test" },
    } as any)

    expect(result).toEqual({
      props: { errorStatus: 500 },
    })
  })
})
