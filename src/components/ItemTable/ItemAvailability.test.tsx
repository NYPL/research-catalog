import React from "react"
import { render, screen } from "../../utils/testUtils"
import ItemAvailability from "./ItemAvailability"
import Item from "../../models/Item"
import SearchResultsBib from "../../models/SearchResultsBib"
import { AVAILABILITY_KEYS } from "../../config/constants"
import {
  itemPhysicallyRequestable,
  itemAvailableOnsite,
  itemUnavailable,
  shelfItemAvailable,
  deskItemAvailable,
  itemUnavailableDueDate,
  itemUnavailablePartner,
  itemNYPLReCAP,
} from "../../../__test__/fixtures/itemFixtures"
import { searchResultPhysicalItems } from "../../../__test__/fixtures/searchResultPhysicalItems"

const parentBib = new SearchResultsBib(searchResultPhysicalItems)

const buildItem = (fixture, overrides: Partial<Item> = {}) =>
  Object.assign(new Item(fixture, parentBib), overrides)

const berg = { "@id": "col:1", prefLabel: "Berg Collection" }

describe("ItemAvailability", () => {
  describe("Available items", () => {
    it("renders the desk message for AVAILABLE_DESK", async () => {
      const item = new Item(deskItemAvailable, parentBib)
      render(<ItemAvailability item={item} />)
      expect(
        screen.getByText(
          "Please visit the service desk in this room to request this item."
        )
      ).toBeInTheDocument()
    })

    it("renders the shelf message for AVAILABLE_SHELF", async () => {
      const item = new Item(shelfItemAvailable, parentBib)
      render(<ItemAvailability item={item} />)
      expect(
        screen.getByText(/Item located on open reference shelves/)
      ).toBeInTheDocument()
    })

    it("renders the offsite message for AVAILABLE_OFFSITE_NYPL", async () => {
      const item = new Item(itemNYPLReCAP, parentBib)
      render(<ItemAvailability item={item} />)
      expect(
        screen.getByText(
          "Item stored offsite and must be requested in advance."
        )
      ).toBeInTheDocument()
    })

    it("renders the finding aid message for AVAILABLE_APPT_NO_AEON_FINDING_AID", async () => {
      const item = buildItem(itemPhysicallyRequestable)
      item.availability.key =
        AVAILABILITY_KEYS.AVAILABLE_APPT_NO_AEON_FINDING_AID
      render(<ItemAvailability item={item} />)
      // whitespace workaround
      expect(screen.getByText(/Please view the/)).toBeInTheDocument()
      expect(screen.getByText(/finding aid/)).toBeInTheDocument()
      expect(
        screen.getByText(/to schedule an appointment./)
      ).toBeInTheDocument()
    })

    it("renders the no-finding-aid message for AVAILABLE_APPT_NO_AEON_NO_FINDING_AID", async () => {
      const item = buildItem(itemPhysicallyRequestable)
      item.availability.key =
        AVAILABILITY_KEYS.AVAILABLE_APPT_NO_AEON_NO_FINDING_AID
      render(<ItemAvailability item={item} />)
      expect(
        screen.getByText(
          "Please contact the division to schedule an appointment."
        )
      ).toBeInTheDocument()
    })

    it("renders nothing for AVAILABLE_APPT_AEON", async () => {
      const item = buildItem(itemPhysicallyRequestable)
      item.availability.key = AVAILABILITY_KEYS.AVAILABLE_APPT_AEON
      const { container } = render(<ItemAvailability item={item} />)
      expect(container).toBeEmptyDOMElement()
    })

    it("renders nothing for AVAILABLE_EDGE_CASE", async () => {
      const item = buildItem(itemPhysicallyRequestable)
      item.availability.key = AVAILABILITY_KEYS.AVAILABLE_EDGE_CASE
      const { container } = render(<ItemAvailability item={item} />)
      expect(container).toBeEmptyDOMElement()
    })

    describe("AVAILABLE_GENERAL_NO_BARCODE", () => {
      it("renders a contact a librarian link when the item has no collection", async () => {
        const item = buildItem(itemAvailableOnsite, { collection: null })
        item.availability.key = AVAILABILITY_KEYS.AVAILABLE_GENERAL_NO_BARCODE
        render(<ItemAvailability item={item} />)
        expect(screen.getByText(/contact a librarian/)).toBeInTheDocument()
      })

      it("renders the contact a division text when the item has a collection", async () => {
        const item = buildItem(itemAvailableOnsite, { collection: berg })
        item.availability.key = AVAILABILITY_KEYS.AVAILABLE_GENERAL_NO_BARCODE
        render(<ItemAvailability item={item} />)
        expect(
          screen.getByText("Please contact the division to request this item.")
        ).toBeInTheDocument()
      })
    })
  })

  describe("Not available items", () => {
    it("renders a contact a librarian link when there's no collection and no due date", async () => {
      const item = buildItem(itemUnavailable, {
        collection: null,
        dueDate: null,
      })
      render(<ItemAvailability item={item} />)
      expect(screen.getByText("Not available")).toBeInTheDocument()
      expect(screen.getByText(/contact a librarian/)).toBeInTheDocument()
    })

    it("renders a division message when the item has a collection and no due date", async () => {
      const item = buildItem(itemUnavailable, {
        collection: berg,
        dueDate: null,
      })
      render(<ItemAvailability item={item} />)
      expect(screen.getByText("Not available")).toBeInTheDocument()
      expect(
        screen.getByText(/Please contact the division for assistance/)
      ).toBeInTheDocument()
    })

    it("renders the due date and a contact a librarian link when there's a due date and no collection", async () => {
      const item = buildItem(itemUnavailableDueDate, { collection: null })
      render(<ItemAvailability item={item} />)
      expect(screen.getByText("Not available")).toBeInTheDocument()
      expect(
        screen.getByText(/In use through July 7, 2024\./)
      ).toBeInTheDocument()
      expect(screen.getByText(/contact a librarian/)).toBeInTheDocument()
    })

    it("renders the due date and a division message when there's a due date and a collection", async () => {
      const item = buildItem(itemUnavailableDueDate, { collection: berg })
      render(<ItemAvailability item={item} />)
      expect(
        screen.getByText(
          /In use through July 7, 2024\. Please contact the division for assistance/
        )
      ).toBeInTheDocument()
    })

    it("renders a contact a librarian link for unavailable partner items", async () => {
      const item = buildItem(itemUnavailablePartner, {
        collection: null,
        dueDate: null,
      })
      render(<ItemAvailability item={item} />)
      expect(screen.getByText("Not available")).toBeInTheDocument()
      expect(screen.getByText(/contact a librarian/)).toBeInTheDocument()
    })
  })
})
