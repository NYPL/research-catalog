import nyplApiClient from "../nyplApiClient"
import { encode as encodeQueryString } from "querystring"

/**
 *  Fetch locations by query {object}
 */
export async function fetchLocations(query) {
  const client = await nyplApiClient()
  const path = `/locations?${encodeQueryString(query)}`
  return client.get(path)
}
