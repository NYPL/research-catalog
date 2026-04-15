import { logServerError } from "../../utils/logUtils"
import nyplApiClient from "../nyplApiClient"

/**
 * Get all of a patron's lists.
 *
 * @param {object} params
 * @param {string} params.patronId - The patron's ID.
 * @param {string} [params.sort] - Optional sort parameter.
 * @returns {Promise<object>} The patron's lists or an error object.
 */
export async function fetchLists({
  patronId,
  sort,
}: {
  patronId: string
  sort?: string
}) {
  try {
    const client = await nyplApiClient()
    const path = sort
      ? `/patrons/${patronId}/lists?sort=${sort}`
      : `/patrons/${patronId}/lists`
    const response = await client.get(path)
    if (response.error) {
      logServerError("fetchLists", `${response.error} Request: ${path}`)
      return {
        status: response.status,
        name: response.name,
        error: response.error,
      }
    }
    return { status: 200, lists: response }
  } catch (error) {
    logServerError("fetchLists", error.message)
    return {
      status: 500,
    }
  }
}

/**
 * Get a single list.
 *
 * @param {object} params
 * @param {string} params.patronId - The patron's ID.
 * @param {string} params.listId - The ID of the list to fetch.
 * @returns {Promise<object>} The requested list or an error object.
 */
export async function fetchList({
  patronId,
  listId,
}: {
  patronId: string
  listId: string
}) {
  try {
    const client = await nyplApiClient()
    const path = `/patrons/${patronId}/list/${listId}`
    const response = await client.get(path)
    if (response.error) {
      logServerError("fetchList", `${response.error} Request: ${path}`)
      return {
        status: response.status,
        name: response.name,
        error: response.error,
      }
    }
    return { status: 200, list: response }
  } catch (error) {
    logServerError("fetchList", error.message)
    return {
      status: 500,
    }
  }
}

/**
 * Create a list.
 *
 * @param {object} params
 * @param {string} params.patronId - The patron's ID.
 * @param {string} params.listName - The name of the new list.
 * @param {string[]} [params.records] - Optional array of record IDs to add to the list.
 * @param {string} [params.description] - Optional description for the list.
 * @returns {Promise<object>} The created list or an error object.
 */
export async function createList({
  patronId,
  listName,
  records,
  description,
}: {
  patronId: string
  listName: string
  records?: string[]
  description?: string
}) {
  try {
    const client = await nyplApiClient()
    const path = "/list"
    // TO DO: Add handling for default first list
    // (listName = "My workspace (default list)")
    const body = {
      listName,
      description,
      records,
      patronId,
    }
    const response = await client.post(path, body)
    if (response.error) {
      logServerError("createList", `${response.error} Request: ${path}`)
      return {
        status: response.status,
        name: response.name,
        error: response.error,
      }
    }
    return { status: 200, list: response }
  } catch (error) {
    logServerError("createList", error.message)
    return {
      status: 500,
    }
  }
}

/**
 * Update a list's metadata.
 *
 * @param {object} params
 * @param {string} params.patronId - The patron's ID.
 * @param {string} params.listId - The ID of the list to update.
 * @param {string} params.listName - The new name for the list.
 * @param {string} [params.description] - Optional new description for the list.
 * @returns {Promise<object>} The updated list or an error object.
 */
export async function updateList({
  patronId,
  listId,
  listName,
  description,
}: {
  patronId: string
  listId: string
  listName: string
  description?: string
}) {
  try {
    const client = await nyplApiClient()
    const path = `/patrons/${patronId}/list/${listId}`
    const body = {
      patronId,
      listName,
      description,
    }
    const response = await client.post(path, body)
    if (response.error) {
      logServerError("updateList", `${response.error} Request: ${path}`)
      return {
        status: response.status,
        name: response.name,
        error: response.error,
      }
    }
    return { status: 200, list: response }
  } catch (error) {
    logServerError("updateList", error.message)
    return {
      status: 500,
    }
  }
}

/**
 * Delete a list.
 *
 * @param {object} params
 * @param {string} params.patronId - The patron's ID.
 * @param {string} params.listId - The ID of the list to delete.
 * @returns {Promise<object>} A success status or an error object.
 */
export async function deleteList({
  patronId,
  listId,
}: {
  patronId: string
  listId: string
}) {
  try {
    const client = await nyplApiClient()
    const path = `/patrons/${patronId}/list/${listId}`
    const response = await client.delete(path)
    if (response.error) {
      logServerError("deleteList", `${response.error} Request: ${path}`)
      return {
        status: response.status,
        name: response.name,
        error: response.error,
      }
    }
    return { status: 200 }
  } catch (error) {
    logServerError("deleteList", error.message)
    return {
      status: 500,
    }
  }
}

/**
 * Delete records from a list.
 *
 * @param {object} params
 * @param {string} params.patronId - The patron's ID.
 * @param {string} params.listId - The ID of the list to update.
 * @param {string[]} params.records - An array of record IDs to remove from the list.
 * @returns {Promise<object>} A success status or an error object.
 */
export async function deleteRecordsFromList({
  patronId,
  listId,
  records,
}: {
  patronId: string
  listId: string
  records: string[]
}) {
  try {
    const client = await nyplApiClient()
    const path = `/patrons/${patronId}/list/${listId}/records`
    const body = {
      records,
    }
    const response = await client.delete(path, body)
    if (response.error) {
      logServerError(
        "deleteRecordsFromList",
        `${response.error} Request: ${path}`
      )
      return {
        status: response.status,
        name: response.name,
        error: response.error,
      }
    }
    return { status: 200 }
  } catch (error) {
    logServerError("deleteRecordsFromList", error.message)
    return {
      status: 500,
    }
  }
}

/**
 * Add records to a list.
 *
 * @param {object} params
 * @param {string} params.patronId - The patron's ID.
 * @param {string} params.listId - The ID of the list to update.
 * @param {string[]} params.records - An array of record IDs to add to the list.
 * @returns {Promise<object>} A success status or an error object.
 */
export async function addRecordsToList({
  patronId,
  listId,
  records,
}: {
  patronId: string
  listId: string
  records: string[]
}) {
  try {
    const client = await nyplApiClient()
    const path = `/patrons/${patronId}/list/${listId}/records`
    const body = {
      records,
    }
    const response = await client.post(path, body)
    if (response.error) {
      logServerError("addRecordsToList", `${response.error} Request: ${path}`)
      return {
        status: response.status,
        name: response.name,
        error: response.error,
      }
    }
    return { status: 200 }
  } catch (error) {
    logServerError("addRecordsToList", error.message)
    return {
      status: 500,
    }
  }
}
