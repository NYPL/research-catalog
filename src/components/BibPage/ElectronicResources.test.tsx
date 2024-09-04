import userEvent from "@testing-library/user-event"
import {
  bibManyEResources,
  yiddishBib as bibWithTwoEResouces,
} from "../../../__test__/fixtures/bibFixtures"
import Bib from "../../models/Bib"
import ElectronicResources from "./ElectronicResources"

import { render, screen } from "@testing-library/react"
import exp from "constants"

describe("ElectronicResources component", () => {
  describe("Many eResources", () => {
    const bib = new Bib(bibManyEResources.resource)
    beforeEach(() => {
      render(
        <ElectronicResources electronicResources={bib.electronicResources} />
      )
    })

    it("renders the correct heading", () => {
      expect(screen.queryByText("Available online")).toBeInTheDocument()
    })

    it("renders 3 links and a View All button when there are more than 3 eResources", () => {
      const eResourcesContainer = screen.queryByTestId("electronic-resources")
      expect(eResourcesContainer).toBeInTheDocument()

      const eResourcesList = eResourcesContainer.querySelector("ul")
      expect(eResourcesList.children).toHaveLength(3)

      const moreLink = screen.queryByTestId("see-more-eresources-button")
      expect(moreLink).toBeInTheDocument()
      expect(moreLink).toHaveTextContent(
        "View all 368 available online resources"
      )
    })

    it("displays all eResources when view all button is clicked", async () => {
      const moreLink = screen.queryByTestId("see-more-eresources-button")
      await userEvent.click(moreLink)

      const eResourcesList = screen
        .queryByTestId("electronic-resources")
        .querySelector("ul")

      expect(eResourcesList.children).toHaveLength(368)
      expect(moreLink).toHaveTextContent(
        "View fewer available online resources"
      )
    })
  })

  describe("Few eResources", () => {
    const bib = new Bib(bibWithTwoEResouces.resource)
    beforeEach(() => {
      render(
        <ElectronicResources electronicResources={bib.electronicResources} />
      )
    })

    it("renders the correct heading", () => {
      expect(screen.queryByText("Available online")).toBeInTheDocument()
    })

    it("renders all eResources and does not display a View All button", () => {
      const eResourcesContainer = screen.queryByTestId("electronic-resources")
      expect(eResourcesContainer).toBeInTheDocument()

      const eResourcesList = eResourcesContainer.querySelector("ul")
      expect(eResourcesList.children).toHaveLength(2)

      expect(
        screen.queryByTestId("see-more-eresources-button")
      ).not.toBeInTheDocument()
    })
  })
})
