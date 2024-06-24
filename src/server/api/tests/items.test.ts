import { fetchItems } from "../items"
import type { ItemsResponse } from "../../../types/itemTypes"

jest.mock("../../nyplApiClient", () => {
  return jest
    .fn()
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest.fn().mockResolvedValueOnce({
            items: [{}, {}, {}, {}],
            status: 200,
          }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest
            .fn()
            .mockResolvedValueOnce({
              numItemsTotal: 0,
              status: 400,
            })
            .mockResolvedValueOnce({
              items: [],
              status: 400,
            }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest
            .fn()
            .mockResolvedValueOnce({
              numItemsTotal: 4,
              status: 200,
            })
            .mockResolvedValueOnce({
              items: [{}, {}],
              status: 200,
            })
            .mockResolvedValueOnce({
              items: [{}, {}],
              status: 200,
            }),
        })
      })
    })
    .mockImplementationOnce(async () => {
      return await new Promise((resolve) => {
        resolve({
          get: jest
            .fn()
            .mockResolvedValueOnce({
              numItemsTotal: 4,
              status: 200,
            })
            .mockResolvedValueOnce({
              items: [{}, {}],
              status: 200,
            })
            .mockResolvedValueOnce({
              items: [],
              status: 400,
            }),
        })
      })
    })
})

describe("fetchItems", () => {
  it("should return bib's paginated and filtered items for a given query when viewAllItems is false", async () => {
    const itemsResponse = (await fetchItems(
      "b17418167",
      {
        items_from: 0,
      },
      false
    )) as ItemsResponse
    expect(itemsResponse.items.length).toEqual(4)
    expect(itemsResponse.status).toEqual(200)
  })
  it("should return a 400 status code when the initial bib fetch fails or returns no items", async () => {
    const itemsResponse = (await fetchItems(
      "b17418167",
      {
        items_from: 0,
      },
      false
    )) as ItemsResponse
    expect(itemsResponse.items.length).toEqual(0)
    expect(itemsResponse.status).toEqual(400)
  })
  it("should fetch items in batches when viewAllItems is true", async () => {
    const itemsResponse = (await fetchItems(
      "b17418167",
      {},
      true,
      2
    )) as ItemsResponse
    expect(itemsResponse.items.length).toEqual(4)
    expect(itemsResponse.status).toEqual(200)
  })
  it("should return a 400 status code when any of the batched fetches fails", async () => {
    const itemsResponse = (await fetchItems(
      "b17418167",
      {},
      true,
      2
    )) as ItemsResponse
    expect(itemsResponse.items.length).toEqual(0)
    expect(itemsResponse.status).toEqual(400)
  })
})