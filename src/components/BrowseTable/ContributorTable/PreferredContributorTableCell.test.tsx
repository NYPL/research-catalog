import { render, screen } from "../../../utils/testUtils"
import type { PreferredContributor } from "../../../types/browseTypes"
import PreferredContributorTableCell from "./PreferredContributorTableCell"

const createPreferredContributor = (
  overrides: Partial<PreferredContributor> = {}
): PreferredContributor => ({
  termLabel: "William Shakespeare",
  url: "/browse/authors/William%20Shakespeare",
  count: "123",
  seeAlso: { label: "See also", terms: [] },
  roles: [
    {
      roleLabel: "author",
      count: 120,
      url: "/browse/authors/William%20Shakespeare?role=author",
    },
  ],
  ...overrides,
})

describe("PreferredContributorTableCell", () => {
  it("renders preferred term as a link", () => {
    const contributor = createPreferredContributor()
    render(<PreferredContributorTableCell contributor={contributor} />)

    const link = screen.getByRole("link", { name: "William Shakespeare" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute(
      "href",
      // Full page reload link, not Next Link with CSR
      "/research/research-catalog/browse/authors/William%20Shakespeare"
    )
  })

  it("renders 'See also' section if seeAlso terms exist", () => {
    const contributor = createPreferredContributor({
      seeAlso: {
        label: "See also",
        terms: [
          {
            termLabel: "Francis Bacon",
            url: "/browse/authors?q=Francis%20Bacon&search_scope=starts_with",
            count: "",
          },
          {
            termLabel: "Anne Hathaway",
            url: "/browse/authors?q=Anne%20Hathaway&search_scope=starts_with",
            count: "",
          },
        ],
      },
    })

    render(<PreferredContributorTableCell contributor={contributor} />)

    expect(screen.getByText("See also:")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Francis Bacon" })).toHaveAttribute(
      "href",
      "/browse/authors?q=Francis%20Bacon&search_scope=starts_with"
    )
    expect(screen.getByRole("link", { name: "Anne Hathaway" })).toHaveAttribute(
      "href",
      "/browse/authors?q=Anne%20Hathaway&search_scope=starts_with"
    )
  })

  it("renders 'Earlier heading', 'Later heading' sections", () => {
    const contributor = createPreferredContributor({
      earlierHeadings: {
        label: "Earlier heading",
        terms: [
          {
            termLabel: "An earlier heading",
            url: "/browse/authors?q=An earlier heading&search_scope=starts_with",
            count: "",
          },
        ],
      },
    })

    render(<PreferredContributorTableCell contributor={contributor} />)

    expect(screen.getByText("Earlier heading:")).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: "An earlier heading" })
    ).toHaveAttribute(
      "href",
      "/browse/authors?q=An earlier heading&search_scope=starts_with"
    )
  })
})
