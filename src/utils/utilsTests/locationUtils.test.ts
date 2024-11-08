import type {
  DiscoveryLocationElement,
  NYPLocationKey,
} from "../../types/locationTypes"
import { NYPL_LOCATIONS } from "../../config/constants"

import {
  mapLocationElementToDeliveryLocation,
  locationIsClosed,
  getLocationSierraId,
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
        key: "schwarzman",
        address: NYPL_LOCATIONS["schwarzman"].address,
        label: `${NYPL_LOCATIONS["schwarzman"].shortName} - Scholar Room 217`,
        value: getLocationSierraId(locationElement),
      })

      // mal
      locationElement = {
        "@id": "loc:mal",
        prefLabel: "Schwarzman Building - Main Reading Room 315",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        key: "schwarzman",
        address: NYPL_LOCATIONS["schwarzman"].address,
        label: `${NYPL_LOCATIONS["schwarzman"].shortName} - Main Reading Room 315`,
        value: getLocationSierraId(locationElement),
      })

      // mab
      locationElement = {
        "@id": "loc:mab",
        prefLabel: "Schwarzman Building - Art & Architecture Room 300",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        key: "schwarzman",
        address: NYPL_LOCATIONS["schwarzman"].address,
        label: `${NYPL_LOCATIONS["schwarzman"].shortName} - Art & Architecture Room 300`,
        value: getLocationSierraId(locationElement),
      })

      // maf
      locationElement = {
        "@id": "loc:maf",
        prefLabel: "Schwarzman Building - Dorot Jewish Division Room 111",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        key: "schwarzman",
        address: NYPL_LOCATIONS["schwarzman"].address,
        label: `${NYPL_LOCATIONS["schwarzman"].shortName} - Dorot Jewish Division Room 111`,
        value: getLocationSierraId(locationElement),
      })

      // maf
      locationElement = {
        "@id": "loc:map",
        prefLabel: "Schwarzman Building - Map Division Room 117",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        key: "schwarzman",
        address: NYPL_LOCATIONS["schwarzman"].address,
        label: `${NYPL_LOCATIONS["schwarzman"].shortName} - Map Division Room 117`,
        value: getLocationSierraId(locationElement),
      })

      // map
      locationElement = {
        "@id": "loc:map",
        prefLabel: "Schwarzman Building - Map Division Room 117",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        key: "schwarzman",
        address: NYPL_LOCATIONS["schwarzman"].address,
        label: `${NYPL_LOCATIONS["schwarzman"].shortName} - Map Division Room 117`,
        value: getLocationSierraId(locationElement),
      })

      // mag
      locationElement = {
        "@id": "loc:mag",
        prefLabel: "Schwarzman Building - Milstein Division Room 121",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        key: "schwarzman",
        address: NYPL_LOCATIONS["schwarzman"].address,
        label: `${NYPL_LOCATIONS["schwarzman"].shortName} - Milstein Division Room 121`,
        value: getLocationSierraId(locationElement),
      })

      // par
      locationElement = {
        "@id": "loc:par",
        prefLabel: "Performing Arts Research Collections",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        key: "lpa",
        address: NYPL_LOCATIONS["lpa"].address,
        label: NYPL_LOCATIONS["lpa"].shortName,
        value: getLocationSierraId(locationElement),
      })

      // sc
      locationElement = {
        "@id": "loc:sc",
        prefLabel: "Schomburg Center - Research and Reference Division",
      }

      expect(mapLocationElementToDeliveryLocation(locationElement)).toEqual({
        key: "schomburg",
        address: NYPL_LOCATIONS["schomburg"].address,
        label: `${NYPL_LOCATIONS["schomburg"].shortName} - Research and Reference Division`,
        value: getLocationSierraId(locationElement),
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
        key: "schomburg",
        address: NYPL_LOCATIONS["schomburg"].address,
        label: NYPL_LOCATIONS["schomburg"].shortName,
        value: getLocationSierraId(locationElement),
      })
    })
  })

  describe("locationIsClosed", () => {
    it("determines if the location is closed based on the key and the closedLocations array set in config", () => {
      let closedLocations = []
      const deliveryLocation = {
        key: "schwarzman" as NYPLocationKey,
        address: "476 Fifth Avenue (42nd St and Fifth Ave)",
        label: "Schwarzman Building - Scholar Room 217",
      }

      expect(locationIsClosed(deliveryLocation, closedLocations)).toEqual(false)

      closedLocations = ["schwarzman"]
      expect(locationIsClosed(deliveryLocation, closedLocations)).toEqual(true)
    })
    it("always returns true if 'all' is in the closedLocations array", () => {
      let closedLocations = ["all"]
      let deliveryLocation = {
        key: "schwarzman" as NYPLocationKey,
        address: "476 Fifth Avenue (42nd St and Fifth Ave)",
        label: "Schwarzman Building - Scholar Room 217",
      }

      expect(locationIsClosed(deliveryLocation, closedLocations)).toEqual(true)

      closedLocations = ["Schwarzman", "all"]
      deliveryLocation = {
        key: "lpa" as NYPLocationKey,
        address: "40 Lincoln Center Plaza",
        label: "Library for the Performing Arts",
      }
      expect(locationIsClosed(deliveryLocation, closedLocations)).toEqual(true)
    })
  })
})
