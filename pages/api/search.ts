import type { NextApiRequest, NextApiResponse } from "next"

import { BASE_URL, PATHS } from "../../src/config/constants"
import {
  getSearchQuery,
  mapQueryToSearchParams,
  mapRequestBodyToSearchParams,
} from "../../src/utils/searchUtils"
import { fetchResults } from "../../src/server/api/search"

/**
 * Default API route handler for Search
 * Calls a helper function that maps the query params object to a SearchParams object
 * It is then passed to fetchResults, which fetches the results and returns a JSON response
 * via its onSuccess callback on a successful fetch
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const searchParams = mapQueryToSearchParams(req.query)
    const response = await fetchResults(searchParams)
    res.status(200).json(response)
  }
  // If we emit a POST request to the route handler, we are likely submitting an advanced search
  // with JS disabled. In this case, parse the request body and redirect to the results page.
  if (req.method === "POST") {
    const searchParams = mapRequestBodyToSearchParams(req.body)
    const queryString = getSearchQuery(searchParams)
    res.redirect(BASE_URL + PATHS.SEARCH + queryString)
  }
}

export default handler
