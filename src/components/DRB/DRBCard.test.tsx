import { render, screen } from "@testing-library/react"

import DRBCard from "./DRBCard"
import DRBResult from "../../models/DRBResult"

const drbWorkMarkTwain = {
  title: "The Adventures of Tom Sawyer",
  uuid: "123",
  editions: [
    {
      title: "The Adventures of Tom Sawyer",
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
  authors: [{ name: "Mark Twain" }],
  agents: [],
}

describe("DRBCard", () => {
  it("renders the DRBCard component with a read online link", () => {
    const drbResultTwain = new DRBResult(drbWorkMarkTwain)
    render(<DRBCard drbResult={drbResultTwain} />)

    const authorLink = screen.getByText(/Mark Twain/i)
    const readOnlineLink = screen.getByText(/Read Online/i)
    const downloadLink = screen.queryByText(/Download PDF/i)

    expect(
      screen.getByText(/The Adventures of Tom Sawyer/i)
    ).toBeInTheDocument()

    expect(authorLink).toBeInTheDocument()
    expect(authorLink).toHaveAttribute(
      "href",
      "https://digital-research-books-beta.nypl.org/search?source=catalog&query=author:Mark Twain"
    )

    expect(readOnlineLink).toBeInTheDocument()
    expect(readOnlineLink).toHaveAttribute("href", drbResultTwain.readOnlineUrl)

    expect(downloadLink).not.toBeInTheDocument()
  })
})
