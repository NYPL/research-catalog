import { logServerError } from "../../utils/logUtils"
import nyplApiClient from "../nyplApiClient"

async function callListsServiceAndHandleError({
  methodName,
  path,
  apiCall,
  onSuccess = () => ({ status: 200 }),
}: {
  methodName: string
  path: string
  apiCall: (client: any) => Promise<any>
  onSuccess?: (response: any) => any
}) {
  try {
    const client = await nyplApiClient()
    const response = await apiCall(client)
    if (response.error) {
      logServerError(methodName, `${response.error} Request: ${path}`)
      return {
        status: response.statusCode,
        name: response.name,
        error: response.error,
      }
    }
    return onSuccess(response)
  } catch (error: any) {
    logServerError(methodName, error.message)
    return { status: 500 }
  }
}

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
  const path = sort
    ? `/patrons/${patronId}/lists?sort=${sort}`
    : `/patrons/${patronId}/lists`
  return callListsServiceAndHandleError({
    methodName: "fetchLists",
    path,
    apiCall: (client) => client.get(path),
    onSuccess: (response) => ({ status: 200, lists: response }),
  })
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
  const path = `/patrons/${patronId}/list/${listId}`
  return callListsServiceAndHandleError({
    methodName: "fetchList",
    path,
    apiCall: (client) => client.get(path),
    onSuccess: (response) => ({ status: 200, list: response }),
  })
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
  const path = "/list"
  // TO DO: Add handling for default first list
  // (listName = "My workspace (default list)")
  const body = {
    listName,
    description,
    records,
    patronId,
  }
  return callListsServiceAndHandleError({
    methodName: "createList",
    path,
    apiCall: (client) => client.post(path, body),
    onSuccess: (response) => ({ status: 200, list: response }),
  })
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
  const path = `/patrons/${patronId}/list/${listId}`
  const body = {
    patronId,
    listName,
    description,
  }
  return callListsServiceAndHandleError({
    methodName: "updateList",
    path,
    apiCall: (client) => client.post(path, body),
    onSuccess: (response) => ({ status: 200, list: response }),
  })
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
  const path = `/patrons/${patronId}/list/${listId}`
  return callListsServiceAndHandleError({
    methodName: "deleteList",
    path,
    apiCall: (client) => client.delete(path),
  })
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
  const path = `/patrons/${patronId}/list/${listId}/records`
  const body = {
    records,
  }
  return callListsServiceAndHandleError({
    methodName: "deleteRecordsFromList",
    path,
    apiCall: (client) => client.delete(path, body),
  })
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
  const path = `/patrons/${patronId}/list/${listId}/records`
  const body = {
    records,
  }
  return callListsServiceAndHandleError({
    methodName: "addRecordsToList",
    path,
    apiCall: (client) => client.post(path, body),
  })
}
