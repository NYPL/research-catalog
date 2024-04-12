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
  languages: [
    {
      iso_2: "en",
    },
  ],
}

const drbWorkSpanish = {
  title: "Spanish Title",
  uuid: "123",
  languages: [
    {
      iso_2: "es",
    },
  ],
}

describe("DRBCard", () => {
  it("renders the DRBCard component with a read online link", () => {
    const drbResultTwain = new DRBResult(drbWorkMarkTwain)
    render(<DRBCard drbResult={drbResultTwain} />)

    const titleLink = screen.getByText(/The Adventures of Tom Sawyer/i)
    const authorLink = screen.getByText(/Mark Twain/i)
    const readOnlineLink = screen.getByText(/Read Online/i)
    const downloadLink = screen.queryByText(/Download PDF/i)

    expect(titleLink).toBeInTheDocument()
    expect(titleLink).not.toHaveAttribute("lang", "en")

    expect(authorLink).toBeInTheDocument()
    expect(authorLink).toHaveAttribute(
      "href",
      "http://sfr-front-end-development.us-east-1.elasticbeanstalk.com/search?source=catalog&query=author:Mark Twain"
    )

    expect(readOnlineLink).toBeInTheDocument()
    expect(readOnlineLink).toHaveAttribute("href", drbResultTwain.readOnlineUrl)

    expect(downloadLink).not.toBeInTheDocument()
  })

  it("includes the lang prop in the title when the language is not english", () => {
    const spanishWork = new DRBResult(drbWorkSpanish)
    render(<DRBCard drbResult={spanishWork} />)

    const titleLink = screen.getByText(/Spanish Title/i)

    expect(titleLink).toBeInTheDocument()
    expect(titleLink).toHaveAttribute("lang", "es")
  })
})
