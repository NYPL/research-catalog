import type {
  DiscoveryLocationElement,
  DiscoveryLocation,
} from "../../types/locationTypes"

import {
  mapLocationElementToDeliveryLocation,
  locationIsClosed,
} from "../locationUtils"

describe("itemUtils", () => {
  describe("mapLocationElementToDeliveryLocation", () => {
    it("maps single location response elements with different location slugs to the correctly formatted DeliveryLocation type", () => {
      // mal17
      let locationElement: DiscoveryLocationElement = {
        "@id": "loc:mal17",
        prefLabel: "Schwarzman Building - Scholar Room 217",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: "476 Fifth Avenue (42nd St and Fifth Ave)",
        label: "Schwarzman Building - Scholar Room 217",
        shortName: "Schwarzman Building",
      })

      // mal
      locationElement = {
        "@id": "loc:mal",
        prefLabel: "Schwarzman Building - Main Reading Room 315",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: "476 Fifth Avenue (42nd St and Fifth Ave)",
        label: "Schwarzman Building - Main Reading Room 315",
        shortName: "Schwarzman Building",
      })

      // mab
      locationElement = {
        "@id": "loc:mab",
        prefLabel: "Schwarzman Building - Art & Architecture Room 300",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: "476 Fifth Avenue (42nd St and Fifth Ave)",
        label: "Schwarzman Building - Art & Architecture Room 300",
        shortName: "Schwarzman Building",
      })

      // maf
      locationElement = {
        "@id": "loc:maf",
        prefLabel: "Schwarzman Building - Dorot Jewish Division Room 111",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: "476 Fifth Avenue (42nd St and Fifth Ave)",
        label: "Schwarzman Building - Dorot Jewish Division Room 111",
        shortName: "Schwarzman Building",
      })

      // maf
      locationElement = {
        "@id": "loc:map",
        prefLabel: "Schwarzman Building - Map Division Room 117",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: "476 Fifth Avenue (42nd St and Fifth Ave)",
        label: "Schwarzman Building - Map Division Room 117",
        shortName: "Schwarzman Building",
      })

      // map
      locationElement = {
        "@id": "loc:map",
        prefLabel: "Schwarzman Building - Map Division Room 117",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: "476 Fifth Avenue (42nd St and Fifth Ave)",
        label: "Schwarzman Building - Map Division Room 117",
        shortName: "Schwarzman Building",
      })

      // mag
      locationElement = {
        "@id": "loc:mag",
        prefLabel: "Schwarzman Building - Milstein Division Room 121",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: "476 Fifth Avenue (42nd St and Fifth Ave)",
        label: "Schwarzman Building - Milstein Division Room 121",
        shortName: "Schwarzman Building",
      })

      // par
      locationElement = {
        "@id": "loc:par",
        prefLabel: "Performing Arts Research Collections",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: "40 Lincoln Center Plaza",
        label: "Library for the Performing Arts",
        shortName: "Library for the Performing Arts",
      })

      // sc
      locationElement = {
        "@id": "loc:sc",
        prefLabel: "Schomburg Center - Research and Reference Division",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: "515 Malcolm X Boulevard",
        label: "Schomburg Center - Research and Reference Division",
        shortName: "Schomburg Center",
      })

      // lpa
      locationElement = {
        "@id": "loc:lpa",
        prefLabel: "Library of Performing Arts - Music Division",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: "40 Lincoln Center Plaza",
        label: "Library for the Performing Arts - Music Division",
        shortName: "Library for the Performing Arts",
      })
    })
    it("returns null when the location is not found in the location details mapping found in this repo", () => {
      const locationElement: DiscoveryLocationElement = {
        "@id": "loc:spaghetti",
        prefLabel: "Spaghetti Building - Scholar Room 1000",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual(
        null
      )
    })
    it("returns null when the the id is absent", () => {
      const locationElement: DiscoveryLocationElement = {
        prefLabel: "Spaghetti Building - Scholar Room 217",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual(
        null
      )
    })

    // TODO: This behavior comes from DFE, determine if this is the desired behavior.
    it("returns an empty label when prefLabel is missing", () => {
      const locationElement: DiscoveryLocationElement = {
        "@id": "loc:sc",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: "515 Malcolm X Boulevard",
        label: "",
        shortName: "Schomburg Center",
      })
    })
  })

  describe("locationIsClosed", () => {
    it("determines if the location is closed based on the label and the closedLocations array set in config", () => {
      let closedLocations = []
      const deliveryLocation: DiscoveryLocation = {
        address: "476 Fifth Avenue (42nd St and Fifth Ave)",
        label: "Schwarzman Building - Scholar Room 217",
        shortName: "Schwarzman Building",
      }

      expect(locationIsClosed(deliveryLocation, [])).toEqual(false)

      closedLocations = ["Schwarzman"]
      expect(locationIsClosed(deliveryLocation, closedLocations)).toEqual(true)
    })
  })
})
