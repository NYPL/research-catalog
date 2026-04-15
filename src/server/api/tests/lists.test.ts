import {
  fetchLists,
  fetchList,
  createList,
  updateList,
  deleteList,
  deleteRecordsFromList,
  addRecordsToList,
} from "../lists"
import nyplApiClient from "../../nyplApiClient"
import { logServerError } from "../../../utils/logUtils"

jest.mock("../../nyplApiClient")
jest.mock("../../../utils/logUtils", () => ({
  logServerError: jest.fn(),
}))

const mockClient = {
  get: jest.fn(),
  post: jest.fn(),
  delete: jest.fn(),
}

describe("lists", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(nyplApiClient as jest.Mock).mockResolvedValue(mockClient)
  })

  describe("fetchLists", () => {
    it("returns lists on success with sort", async () => {
      mockClient.get.mockResolvedValueOnce([{ id: "list1" }, { id: "list2" }])
      const result = await fetchLists("12345", "modifiedDate")
      expect(mockClient.get).toHaveBeenCalledWith(
        "/patrons/12345/lists?sort=modifiedDate"
      )
      expect(result).toEqual({
        status: 200,
        lists: [{ id: "list1" }, { id: "list2" }],
      })
    })

    it("returns lists on success without sort", async () => {
      mockClient.get.mockResolvedValueOnce([{ id: "list1" }])
      const result = await fetchLists("12345")
      expect(mockClient.get).toHaveBeenCalledWith("/patrons/12345/lists")
      expect(result).toEqual({ status: 200, lists: [{ id: "list1" }] })
    })

    it("forwards error from lists api", async () => {
      mockClient.get.mockResolvedValueOnce({
        status: 400,
        name: "error",
        error: "error message",
      })
      const result = await fetchLists("12345")
      expect(logServerError).toHaveBeenCalledWith(
        "fetchLists",
        "error message Request: /patrons/12345/lists"
      )
      expect(result).toEqual({
        status: 400,
        name: "error",
        error: "error message",
      })
    })

    it("returns 500 on exception", async () => {
      mockClient.get.mockRejectedValueOnce(new Error("server error"))
      const result = await fetchLists("12345")
      expect(logServerError).toHaveBeenCalledWith("fetchLists", "server error")
      expect(result).toEqual({ status: 500 })
    })
  })

  describe("fetchList", () => {
    it("returns list on success", async () => {
      mockClient.get.mockResolvedValueOnce({ id: "list1" })
      const result = await fetchList("12345", "list1")
      expect(mockClient.get).toHaveBeenCalledWith("/patrons/12345/list/list1")
      expect(result).toEqual({ status: 200, list: { id: "list1" } })
    })
  })

  describe("createList", () => {
    it("returns created list on success", async () => {
      mockClient.post.mockResolvedValueOnce({ id: "list1" })
      const result = await createList("12345", "My List", ["b123"], "desc")
      expect(mockClient.post).toHaveBeenCalledWith("/list", {
        listName: "My List",
        description: "desc",
        records: ["b123"],
        patronId: "12345",
      })
      expect(result).toEqual({ status: 200, list: { id: "list1" } })
    })

    it("forwards lists api error", async () => {
      mockClient.post.mockResolvedValueOnce({
        status: 422,
        name: "DuplicateNameError",
        error: "List with this name already exists",
      })
      const result = await createList("12345", "My List")
      expect(logServerError).toHaveBeenCalledWith(
        "createList",
        "List with this name already exists Request: /list"
      )
      expect(result).toEqual({
        status: 422,
        name: "DuplicateNameError",
        error: "List with this name already exists",
      })
    })

    it("returns 500 on exception", async () => {
      mockClient.post.mockRejectedValueOnce(new Error("server error"))
      const result = await createList("12345", "My List")
      expect(logServerError).toHaveBeenCalledWith("createList", "server error")
      expect(result).toEqual({ status: 500 })
    })
  })

  describe("updateList", () => {
    it("returns updated list on success", async () => {
      mockClient.post.mockResolvedValueOnce({ id: "list1" })
      const result = await updateList("12345", "list1", "New Name", "new desc")
      expect(mockClient.post).toHaveBeenCalledWith(
        "/patrons/12345/list/list1",
        {
          patronId: "12345",
          listName: "New Name",
          description: "new desc",
        }
      )
      expect(result).toEqual({
        status: 200,
        list: { id: "list1" },
      })
    })
  })

  describe("deleteList", () => {
    it("returns success on successful deletion", async () => {
      mockClient.delete.mockResolvedValueOnce({ success: true })
      const result = await deleteList("12345", "list1")
      expect(mockClient.delete).toHaveBeenCalledWith(
        "/patrons/12345/list/list1"
      )
      expect(result).toEqual({ status: 200 })
    })

    it("returns error info if response has error", async () => {
      mockClient.delete.mockResolvedValueOnce({
        status: 404,
        name: "ListNotFound",
        error: "List not found",
      })
      const result = await deleteList("12345", "list1")
      expect(logServerError).toHaveBeenCalledWith(
        "deleteList",
        "List not found Request: /patrons/12345/list/list1"
      )
      expect(result).toEqual({
        status: 404,
        name: "ListNotFound",
        error: "List not found",
      })
    })
  })

  describe("deleteRecordsFromList", () => {
    it("returns success on successful deletion", async () => {
      mockClient.delete.mockResolvedValueOnce({ success: true })
      const result = await deleteRecordsFromList("12345", "list1", [
        "b123",
        "b345",
      ])
      expect(mockClient.delete).toHaveBeenCalledWith(
        "/patrons/12345/list/list1/records",
        {
          records: ["b123", "b345"],
        }
      )
      expect(result).toEqual({ status: 200 })
    })
  })

  describe("addRecordsToList", () => {
    it("returns success on successful addition", async () => {
      mockClient.post.mockResolvedValueOnce({ success: true })
      const result = await addRecordsToList("12345", "list1", ["b123", "b345"])
      expect(mockClient.post).toHaveBeenCalledWith(
        "/patrons/12345/list/list1/records",
        {
          records: ["b123", "b345"],
        }
      )
      expect(result).toEqual({ status: 200 })
    })
  })
})
