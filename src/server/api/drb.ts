import type { SearchParams } from "../../types/searchTypes"
import type { DRBResults } from "../../types/drbTypes"
import { getDRBQueryStringFromSearchParams } from "../../utils/drbUtils"
import nyplApiClient from "../nyplApiClient"
import { DRB_API_NAME } from "../../config/constants"
import logger from "../../../logger"

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
    console.log("data response in fetchDRBResults", data)

    return {
      works: data.works,
      totalWorks: data.totalWorks,
    }
  } catch (error) {
    console.error(`Error fetching DRB results ${error.message}`)
    console.log("error in fetchDRBResults", error)
    throw new Error(error)
  }
}
