import React from "react"
import { render, screen } from "../../../src/utils/testUtils"

import BibPage from "../../../pages/bib/[id]"
import { bibWithSupplementaryContent } from "../../fixtures/bibFixtures"

describe("Bib Page", () => {
  beforeEach(() => {
    render(
      <BibPage
        bibResult={bibWithSupplementaryContent.resource}
        annotatedMarc={bibWithSupplementaryContent.annotatedMarc}
        isAuthenticated={false}
      />
    )
  })

  it("should render the bib title as an H2", () => {
    const header = screen.getByRole("heading", { level: 2 })
    const headerText =
      "Stick Dog slurps spaghetti / by Tom Watson ; [illustrations by Ethan Long based on original sketches by Tom Watson]."
    expect(header).toHaveTextContent(headerText)
  })
})
