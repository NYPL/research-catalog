import { logServerError } from "../../utils/logUtils"
import nyplApiClient from "../nyplApiClient"

/**
 * Get all of a patron's lists.
 */
export async function fetchLists(patronId: string, sort?: string) {
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
 */
export async function fetchList(patronId: string, listId: string) {
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
 */
export async function createList(
  patronId: string,
  listName: string,
  records?: string[],
  description?: string
) {
  try {
    const client = await nyplApiClient()
    const path = "/list"
    // TO DO: Add handling for defeault first list
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
 */
export async function updateList(
  patronId: string,
  listId: string,
  listName: string,
  description?: string
) {
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
 */
export async function deleteList(patronId: string, listId: string) {
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
 */
export async function deleteRecordsFromList(
  patronId: string,
  listId: string,
  records: string[]
) {
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
 */
export async function addRecordsToList(
  patronId: string,
  listId: string,
  records: string[]
) {
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
