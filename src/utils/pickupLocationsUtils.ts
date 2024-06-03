import { type SierraCodeName } from "../types/myAccountTypes"

const cache = {
  pickupLocations: null,
  lastUpdated: null,
  isStillValid: function () {
    const now = Date.now()
    return this.lastUpdated && now - this.lastUpdated < 1000 * 60 * 60
  },
}

export const getPickupLocations = async (sierraClient) => {
  if (!cache.pickupLocations && !cache.isStillValid()) {
    const locations = await fetchPickupLocations(sierraClient)
    cache.pickupLocations = filterPickupLocations(locations)
    cache.lastUpdated = Date.now()
  }
  return cache.pickupLocations
}

const fetchPickupLocations = async (client) => {
  return await client.get("/branches/pickupLocations")
}

// Sierra returns all pickup locations, including ones that totally invalid
// options for circulating materials. Filter those out.
export const filterPickupLocations = (locations) => {
  const branchLocationDisqualification = [
    "closed",
    "onsite",
    "staff only",
    "edd",
    "performing arts",
    "reopening",
  ]
  const disqualified = (locationName, testString) =>
    locationName.toLowerCase().includes(testString)
  const isOpenBranchLocation = ({ name }: SierraCodeName) =>
    !branchLocationDisqualification.find((testString: string) =>
      disqualified(name, testString)
    )
  return locations.filter(isOpenBranchLocation)
}

// These are only used for verifying and resetting the cache for testing purposes
export const testUtils = {
  getCache: () => cache,
  resetCache: () => {
    cache.pickupLocations = null
    cache.lastUpdated = null
  },
}
