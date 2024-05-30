import {
  filterPickupLocations,
  getPickupLocations,
  testUtils,
} from "../pickupLocationsUtils"
import { filteredPickupLocations } from "../../utils/myAccountUtils"
import { pickupLocations } from "../../../__test__/fixtures/rawSierraAccountData"

describe("fetchPickupLocations", () => {
  global.Date.now = jest
    .fn()
    .mockReturnValueOnce(1)
    .mockReturnValueOnce(100000)
    .mockReturnValueOnce(20)
    .mockReturnValueOnce(25)

  const client = {
    get: jest.fn().mockImplementation(() => {
      return [{ code: "a", name: "mock" }]
    }),
  }
  it("filters out closed and research branches", () => {
    expect(filterPickupLocations(pickupLocations)).toStrictEqual(
      filteredPickupLocations
    )
  })
  it("fetches locations when cache is invalidated", async () => {
    await getPickupLocations(client)
    expect(client.get).toHaveBeenCalled()
    const cache = testUtils.getCache()
    expect(cache.lastUpdated).toEqual(100000)
    expect(cache.pickupLocations).toHaveLength(1)
    client.get.mockClear()
  })

  it("retrieves from the cache when it is valid", async () => {
    testUtils.resetCache()
    await getPickupLocations(client)
    await getPickupLocations(client)
    const cache = testUtils.getCache()
    expect(cache.lastUpdated).toEqual(25)
    expect(client.get).toHaveBeenCalledTimes(1)
    client.get.mockClear()
  })
})
