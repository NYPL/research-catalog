import SubjectHeadingResults, {
  getServerSideProps,
} from "../../../../pages/browse/subjects/[slug]"
import { fireEvent, render, screen } from "../../../../src/utils/testUtils"
import mockRouter from "next-router-mock"
import { fetchSearchResults } from "../../../../src/server/api/search"
import { results } from "../../../fixtures/searchResultsManyBibs"
import userEvent from "@testing-library/user-event"
import initializePatronTokenAuth from "../../../../src/server/auth"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))
jest.mock("../../../../src/server/auth")
jest.mock("../../../../src/server/api/search")

describe("Browse subject heading results page", () => {
  it("displays bibs and heading", async () => {
    await mockRouter.push({
      pathname: "/browse/subjects/test",
    })
    render(
      <SubjectHeadingResults
        slug="test"
        isAuthenticated={true}
        results={{ results, status: 200 }}
      />
    )

    const displayingText = screen.queryByText(
      'Displaying 1-50 of 423 results for Subject Heading "test"'
    )
    expect(displayingText).toBeInTheDocument()

    const cards = screen.getAllByRole("heading", { level: 3 })
    expect(cards).toHaveLength(50)
  })

  it("displays pagination and updates the router on page button clicks", async () => {
    await mockRouter.push({
      pathname: "/browse/subjects/test",
    })
    render(
      <SubjectHeadingResults
        isAuthenticated={true}
        slug="test"
        results={{ results, status: 200 }}
      />
    )
    screen.getByLabelText("Pagination")

    const pageButton = screen.getByLabelText("Page 2")
    fireEvent.click(pageButton)
    expect(mockRouter.asPath).toBe("/browse/subjects/test?page=2")
  })

  it("renders the sort select fields and updates the query string in the url on changes", async () => {
    await mockRouter.push({
      pathname: "/browse/subjects/test",
    })
    render(
      <SubjectHeadingResults
        isAuthenticated={true}
        slug="test"
        results={{ results, status: 200 }}
      />
    )
    const sortBy = screen.getAllByLabelText("Sort by", { exact: false })[0]
    userEvent.click(sortBy)
    await userEvent.click(screen.getByText("Title (A - Z)"))
    expect(sortBy).toHaveTextContent("Sort by: Title (A - Z)")
    expect(mockRouter.asPath).toBe(
      "/browse/subjects/test?sort=title&sort_direction=asc&page=1"
    )
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

  it("returns errorStatus if fetchSearchResults fails", async () => {
    ;(fetchSearchResults as jest.Mock).mockResolvedValue({ status: 500 })

    const args = {
      req: { cookies: {} },
      query: {},
      params: { slug: ["test"] },
    }

    const result = await getServerSideProps(args as any)
    expect(result).toEqual({ props: { errorStatus: 500 } })
  })

  it("builds the expected request", async () => {
    ;(fetchSearchResults as jest.Mock).mockResolvedValue({
      status: 200,
      results: [],
    })

    const params = { slug: "test" }
    const query = { page: "2" }
    const req = { cookies: {} }

    await getServerSideProps({ req, query, params })

    expect(fetchSearchResults).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        filters: { subjectLiteral: ["test"] },
        page: 2,
      })
    )
  })
})
