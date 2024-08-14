import userEvent from "@testing-library/user-event"
import {
  bibManyEResources,
  yiddishBib as bibWithTwoEResouces,
} from "../../../__test__/fixtures/bibFixtures"
import Bib from "../../models/Bib"
import ElectronicResources from "./ElectronicResources"

import { render, screen } from "@testing-library/react"

describe("ElectronicResources component", () => {
  describe("Many eResources", () => {
    const bib = new Bib(bibManyEResources.resource)
    beforeEach(() => {
      render(
        <ElectronicResources electronicResources={bib.electronicResources} />
      )
    })

    it("renders the correct heading", () => {
      expect(screen.queryByText("Available Online")).toBeInTheDocument()
    })

    it("renders 3 link and a display more button when there are more than 3 eResources", () => {
      const eResourcesContainer = screen.queryByTestId("electronic-resources")
      expect(eResourcesContainer).toBeInTheDocument()

      const eResourcesList = eResourcesContainer.querySelector("ul")
      expect(eResourcesList.children).toHaveLength(3)

      expect(
        screen.queryByTestId("see-more-eresources-button")
      ).toBeInTheDocument()
    })

    it("displays all eResources when view all button is clicked", async () => {
      await userEvent.click(screen.queryByTestId("see-more-eresources-button"))

      const eResourcesList = screen
        .queryByTestId("electronic-resources")
        .querySelector("ul")

      expect(eResourcesList.children).toHaveLength(368)
    })
  })
})
