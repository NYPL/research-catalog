import Browse from "../../../pages/browse"
import { render, screen } from "../../../src/utils/testUtils"
import { discoverySubjectsResult } from "../../fixtures/subjectFixtures"

jest.mock("next/router", () => jest.requireActual("next-router-mock"))

describe("Browse index page", () => {
  it("renders the subnav and banner", () => {
    render(
      <Browse
        results={{
          status: 200,
          totalResults: 4,
          subjects: discoverySubjectsResult,
        }}
        isAuthenticated={false}
      />
    )
    expect(screen.queryByText("Browse the Catalog")).toBeInTheDocument()
  })
})
