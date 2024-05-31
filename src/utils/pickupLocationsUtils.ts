import { type SierraCodeName } from "../types/myAccountTypes"

const cache = {
  pickupLocations: null,
  lastUpdated: null,
  isStillValid: function () {
    const now = Date.now()
    return this.lastUpdated && now - this.lastUpdated < 360000
  },
}

export const testUtils = {
  getCache: () => cache,
  resetCache: () => {
    cache.pickupLocations = null
    cache.lastUpdated = null
  },
}

export const getPickupLocations = async (sierraClient) => {
  if (!cache.pickupLocations && !cache.isStillValid()) {
    console.log("fetching")
    const locations = await fetchPickupLocations(sierraClient)
    cache.pickupLocations = filterPickupLocations(locations)
    cache.lastUpdated = Date.now()
  } else console.log("using cache", cache.lastUpdated)
  return cache.pickupLocations
}

const fetchPickupLocations = async (client) => {
  return await client.get("/branches/pickupLocations")
}

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
