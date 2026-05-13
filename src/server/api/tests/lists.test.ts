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
  put: jest.fn(),
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
      const result = await fetchLists({
        patronId: "12345",
        sort: "modified_date_desc",
      })
      expect(mockClient.get).toHaveBeenCalledWith(
        "/patrons/12345/lists?sort=modified_date_desc"
      )
      expect(result).toEqual({
        status: 200,
        lists: [{ id: "list1" }, { id: "list2" }],
      })
    })

    it("returns lists on success without sort", async () => {
      mockClient.get.mockResolvedValueOnce([{ id: "list1" }])
      const result = await fetchLists({ patronId: "12345" })
      expect(mockClient.get).toHaveBeenCalledWith("/patrons/12345/lists")
      expect(result).toEqual({ status: 200, lists: [{ id: "list1" }] })
    })

    it("forwards error from lists api", async () => {
      mockClient.get.mockResolvedValueOnce({
        statusCode: 400,
        name: "error",
        error: "error message",
      })
      const result = await fetchLists({ patronId: "12345" })
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
      const result = await fetchLists({ patronId: "12345" })
      expect(logServerError).toHaveBeenCalledWith("fetchLists", "server error")
      expect(result).toEqual({ status: 500 })
    })
  })

  describe("fetchList", () => {
    it("returns list on success", async () => {
      mockClient.get.mockResolvedValueOnce({ id: "list1" })
      const result = await fetchList({ patronId: "12345", listId: "list1" })
      expect(mockClient.get).toHaveBeenCalledWith("/patrons/12345/list/list1")
      expect(result).toEqual({ status: 200, list: { id: "list1" } })
    })
  })

  describe("createList", () => {
    it("returns created list on success", async () => {
      mockClient.post.mockResolvedValueOnce({ id: "list1" })
      const result = await createList({
        patronId: "12345",
        listName: "My List",
        records: ["b123"],
        description: "desc",
      })
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
        statusCode: 422,
        name: "DuplicateNameError",
        error: "List with this name already exists",
      })
      const result = await createList({
        patronId: "12345",
        listName: "My List",
      })
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
      const result = await createList({
        patronId: "12345",
        listName: "My List",
      })
      expect(logServerError).toHaveBeenCalledWith("createList", "server error")
      expect(result).toEqual({ status: 500 })
    })
  })

  describe("updateList", () => {
    it("returns updated list on success", async () => {
      mockClient.post.mockResolvedValueOnce({ id: "list1" })
      const result = await updateList({
        patronId: "12345",
        listId: "list1",
        listName: "New Name",
        description: "new desc",
      })
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
      const result = await deleteList({ patronId: "12345", listId: "list1" })
      expect(mockClient.delete).toHaveBeenCalledWith(
        "/patrons/12345/list/list1"
      )
      expect(result).toEqual({ status: 200 })
    })

    it("returns error info if response has error", async () => {
      mockClient.delete.mockResolvedValueOnce({
        statusCode: 404,
        name: "ListNotFound",
        error: "List not found",
      })
      const result = await deleteList({ patronId: "12345", listId: "list1" })
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
      mockClient.delete.mockResolvedValueOnce({
        id: "123",
        patronId: "12345",
        records: [],
        createdDate: "2026-04-15T15:58:58.396947",
        modifiedDate: "2026-04-22T10:11:20.584139",
        listName: "list 1",
        description: null,
      })
      const result = await deleteRecordsFromList({
        patronId: "12345",
        listId: "123",
        records: ["b123", "b345"],
      })
      expect(mockClient.delete).toHaveBeenCalledWith(
        "/patrons/12345/list/123/records",
        {
          records: ["b123", "b345"],
        }
      )
      expect(result).toEqual({ status: 200 })
    })
  })

  describe("addRecordsToList", () => {
    it("returns success on successful addition", async () => {
      mockClient.put.mockResolvedValueOnce({
        id: "123",
        patronId: "12345",
        records: ["b123", "b345"],
        createdDate: "2026-04-15T15:58:58.396947",
        modifiedDate: "2026-04-22T10:11:20.584139",
        listName: "second list",
        description: null,
      })
      const result = await addRecordsToList({
        patronId: "12345",
        listId: "123",
        records: ["b123", "b345"],
      })
      expect(mockClient.put).toHaveBeenCalledWith(
        "/patrons/12345/list/123/records",
        {
          records: ["b123", "b345"],
        }
      )
      expect(result).toEqual({ status: 200 })
    })
  })
})
