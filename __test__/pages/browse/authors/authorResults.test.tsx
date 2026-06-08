import ContributorResults, {
  getServerSideProps,
} from "../../../../pages/browse/authors/[slug]"
import { fireEvent, render, screen } from "../../../../src/utils/testUtils"
import mockRouter from "next-router-mock"
import { fetchSearchResults } from "../../../../src/server/api/search"
import { results } from "../../../fixtures/searchResultsManyBibs"
import userEvent from "@testing-library/user-event"
import initializePatronTokenAuth from "../../../../src/server/auth"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))
jest.mock("../../../../src/server/auth")
jest.mock("../../../../src/server/api/search")

describe("Browse author/contributor results page", () => {
  it("displays bibs and contributor heading", async () => {
    await mockRouter.push({
      pathname: "/browse/authors/test",
    })

    render(
      <ContributorResults
        slug="test"
        isAuthenticated={true}
        results={{ results, status: 200 }}
      />
    )

    const displayingText = screen.queryByText(
      'Displaying 1-50 of 423 results for author/contributor "test"'
    )
    expect(displayingText).toBeInTheDocument()

    const cards = screen.getAllByRole("heading", { level: 3 })
    expect(cards).toHaveLength(50)
  })

  it("displays pagination and updates the router on page button clicks", async () => {
    await mockRouter.push({
      pathname: "/browse/authors/test",
    })

    render(
      <ContributorResults
        isAuthenticated={true}
        slug="test"
        results={{ results, status: 200 }}
      />
    )

    const pageButton = screen.getByLabelText("Page 2")
    fireEvent.click(pageButton)

    expect(mockRouter.asPath).toBe("/browse/authors/test?page=2")
  })

  it("renders the sort select fields and updates the query string in the url on changes", async () => {
    await mockRouter.push({
      pathname: "/browse/authors/test",
    })

    render(
      <ContributorResults
        isAuthenticated={true}
        slug="test"
        results={{ results, status: 200 }}
      />
    )

    const sortBy = screen.getAllByLabelText("Sort by", { exact: false })[0]
    userEvent.click(sortBy)

    await userEvent.click(screen.getByText("Title (A - Z)"))

    const sortByPost = screen.getAllByLabelText("Sort by", { exact: false })[0]
    expect(sortByPost).toHaveTextContent("Sort by: Title (A - Z)")
    expect(mockRouter.asPath).toBe(
      "/browse/authors/test?sort=title&sort_direction=asc&page=1"
    )
  })

  it("passes and displays role", async () => {
    await mockRouter.push({
      pathname: "/browse/authors/test?role=performer",
    })

    render(
      <ContributorResults
        isAuthenticated={true}
        slug="test"
        role="performer"
        results={{ results, status: 200 }}
      />
    )

    const displayingText = screen.queryByText(
      'Displaying 1-50 of 423 results for author/contributor "test, performer"'
    )
    expect(displayingText).toBeInTheDocument()
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
    const query = { page: "2", role: "performer" }
    const req = { cookies: {} }

    await getServerSideProps({ req, query, params })

    expect(fetchSearchResults).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        filters: { contributorLiteral: ["test"] },
        page: 2,
        role: "performer",
      })
    )
  })
})
