import type { SearchParams } from "../../types/searchTypes"
import type { DRBResults } from "../../types/drbTypes"
import { getDRBQueryStringFromSearchParams } from "../../utils/drbUtils"
import nyplApiClient from "../nyplApiClient"
import { DRB_API_NAME } from "../../config/constants"

/**
 * Getter function for DRB results. Accepts a SearchParams object as an argument.
 */
export async function fetchDRBResults(
  searchParams: SearchParams
): Promise<DRBResults | Error> {
  const drbQueryString = getDRBQueryStringFromSearchParams(searchParams)

  try {
    const client = await nyplApiClient({ apiName: DRB_API_NAME })
    const { data } = await client.get(drbQueryString)

    return {
      works: data.works,
      totalWorks: data.totalWorks,
    }
  } catch (error) {
    console.log(`Error fetching DRB results ${error.message}`)
    throw new Error(error)
  }
}
