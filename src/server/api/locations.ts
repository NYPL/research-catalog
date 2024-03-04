import nyplApiClient from "../nyplApiClient"
import { DISCOVERY_API_NAME } from "../../config/constants"
import { encode as encodeQueryString } from "querystring"

/**
 *  Fetch locations by query {object}
 */
export async function fetchLocations(query) {
  const client = await nyplApiClient({ apiName: DISCOVERY_API_NAME })
  const path = `/locations?${encodeQueryString(query)}`
  return client.get(path)
}
