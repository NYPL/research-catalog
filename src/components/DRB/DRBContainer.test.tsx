import { render, screen } from "@testing-library/react"

import DRBContainer from "./DRBContainer"
import DRBResult from "../../models/DRBResult"

describe("DRBContainer", () => {
  it("renders the DRBContainer component but with no results", () => {
    render(<DRBContainer drbResults={[]} totalWorks={0} searchParams={{}} />)

    expect(
      screen.getByText(/Results from Digital Research Books Beta/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/books for research from multiple sources world wide-/i)
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/See 0 results from Digital Research Books Beta/i)
    ).not.toBeInTheDocument()
  })

  it("renders the DRBContainer component with results", () => {
    const drbWorks = [
      {
        title: "Test Title",
        uuid: "123",
        editions: [
          {
            title: "Test Title",
            items: [
              {
                links: [
                  {
                    link_id: "1234",
                    mediaType: "application/epub+xml",
                    url: "https://nypl.org",
                  },
                ],
              },
            ],
          },
        ],
        authors: [],
        agents: [],
      },
    ]
    const drbResults = drbWorks.map((work) => new DRBResult(work))
    render(
      <DRBContainer
        drbResults={drbResults}
        totalWorks={1}
        searchParams={{
          q: "toast",
          field: "title",
          filters: { language: "eng" },
        }}
      />
    )
    expect(screen.getByText(/Test Title/i)).toBeInTheDocument()
    expect(screen.getByText(/Read Online/i)).toBeInTheDocument()
  })
})
