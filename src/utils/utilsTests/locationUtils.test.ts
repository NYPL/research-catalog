import type { DiscoveryLocationElement } from "../../types/locationTypes"
import { NYPL_LOCATIONS } from "../../config/constants"

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
        address: NYPL_LOCATIONS["schwarzman"].address,
        label: `${NYPL_LOCATIONS["schwarzman"].shortName} - Scholar Room 217`,
        shortName: NYPL_LOCATIONS["schwarzman"].shortName,
      })

      // mal
      locationElement = {
        "@id": "loc:mal",
        prefLabel: "Schwarzman Building - Main Reading Room 315",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: NYPL_LOCATIONS["schwarzman"].address,
        label: `${NYPL_LOCATIONS["schwarzman"].shortName} - Main Reading Room 315`,
        shortName: NYPL_LOCATIONS["schwarzman"].shortName,
      })

      // mab
      locationElement = {
        "@id": "loc:mab",
        prefLabel: "Schwarzman Building - Art & Architecture Room 300",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: NYPL_LOCATIONS["schwarzman"].address,
        label: `${NYPL_LOCATIONS["schwarzman"].shortName} - Art & Architecture Room 300`,
        shortName: NYPL_LOCATIONS["schwarzman"].shortName,
      })

      // maf
      locationElement = {
        "@id": "loc:maf",
        prefLabel: "Schwarzman Building - Dorot Jewish Division Room 111",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: NYPL_LOCATIONS["schwarzman"].address,
        label: `${NYPL_LOCATIONS["schwarzman"].shortName} - Dorot Jewish Division Room 111`,
        shortName: NYPL_LOCATIONS["schwarzman"].shortName,
      })

      // maf
      locationElement = {
        "@id": "loc:map",
        prefLabel: "Schwarzman Building - Map Division Room 117",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: NYPL_LOCATIONS["schwarzman"].address,
        label: `${NYPL_LOCATIONS["schwarzman"].shortName} - Map Division Room 117`,
        shortName: NYPL_LOCATIONS["schwarzman"].shortName,
      })

      // map
      locationElement = {
        "@id": "loc:map",
        prefLabel: "Schwarzman Building - Map Division Room 117",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: NYPL_LOCATIONS["schwarzman"].address,
        label: `${NYPL_LOCATIONS["schwarzman"].shortName} - Map Division Room 117`,
        shortName: NYPL_LOCATIONS["schwarzman"].shortName,
      })

      // mag
      locationElement = {
        "@id": "loc:mag",
        prefLabel: "Schwarzman Building - Milstein Division Room 121",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: NYPL_LOCATIONS["schwarzman"].address,
        label: `${NYPL_LOCATIONS["schwarzman"].shortName} - Milstein Division Room 121`,
        shortName: NYPL_LOCATIONS["schwarzman"].shortName,
      })

      // par
      locationElement = {
        "@id": "loc:par",
        prefLabel: "Performing Arts Research Collections",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: NYPL_LOCATIONS["lpa"].address,
        label: NYPL_LOCATIONS["lpa"].shortName,
        shortName: NYPL_LOCATIONS["lpa"].shortName,
      })

      // sc
      locationElement = {
        "@id": "loc:sc",
        prefLabel: "Schomburg Center - Research and Reference Division",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: NYPL_LOCATIONS["schomburg"].address,
        label: `${NYPL_LOCATIONS["schomburg"].shortName} - Research and Reference Division`,
        shortName: NYPL_LOCATIONS["schomburg"].shortName,
      })

      // lpa
      locationElement = {
        "@id": "loc:lpa",
        prefLabel: "Library of Performing Arts - Music Division",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: NYPL_LOCATIONS["lpa"].address,
        label: `${NYPL_LOCATIONS["lpa"].shortName} - Music Division`,
        shortName: NYPL_LOCATIONS["lpa"].shortName,
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

    it("doesn't add the delivery room when the prefLabel doesn't include a dash", () => {
      const locationElement: DiscoveryLocationElement = {
        "@id": "loc:sc",
        prefLabel: NYPL_LOCATIONS["schomburg"].shortName,
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        address: NYPL_LOCATIONS["schomburg"].address,
        label: NYPL_LOCATIONS["schomburg"].shortName,
        shortName: NYPL_LOCATIONS["schomburg"].shortName,
      })
    })
  })

  describe("locationIsClosed", () => {
    it("determines if the location is closed based on the label and the closedLocations array set in config", () => {
      let closedLocations = []
      const deliveryLocation = {
        address: "476 Fifth Avenue (42nd St and Fifth Ave)",
        label: "Schwarzman Building - Scholar Room 217",
        shortName: "Schwarzman Building",
      }

      expect(locationIsClosed(deliveryLocation, closedLocations)).toEqual(false)

      closedLocations = ["Schwarzman"]
      expect(locationIsClosed(deliveryLocation, closedLocations)).toEqual(true)
    })
    it("always returns true if 'all' is in the closedLocations array", () => {
      let closedLocations = ["all"]
      let deliveryLocation = {
        address: "476 Fifth Avenue (42nd St and Fifth Ave)",
        label: "Schwarzman Building - Scholar Room 217",
        shortName: "Schwarzman Building",
      }

      expect(locationIsClosed(deliveryLocation, closedLocations)).toEqual(true)

      closedLocations = ["Schwarzman", "all"]
      deliveryLocation = {
        address: "40 Lincoln Center Plaza",
        label: "Library for the Performing Arts",
        shortName: "Library for the Performing Arts",
      }
      expect(locationIsClosed(deliveryLocation, closedLocations)).toEqual(true)
    })
  })
})
