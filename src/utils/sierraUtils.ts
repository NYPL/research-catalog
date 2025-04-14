/**
 *
 * Query by timestamp:
 *
 * Query authorities by string
 *   node query-sierra-authorities.js --name 'Poe, Edgar Allan'
 *
 * Common params:
 *  --envfile PATH - Specify path to a json file (see config/sample.json) REQ
 *  --outfile PATH - Specify where to write csv (default out.json)
 *  --type TYPE - Specify bib or item
 */

import type { VarField } from "../models/Headings/AuthorityVarfield"
import type { SierraAuthority } from "../models/Headings/Heading"
import sierraClient from "../server/sierraClient/index"
type QueryOptions = {
  query: string
  limit?: number
  offset?: number
  operator?: "has" | "starts_with"
}
/**
 *  Get authority records by id:
 *
 *  @return Promise<object[]>
 */
const getRecordsByIds = async (ids) => {
  const fields =
    "default,varFields,updatedDate,createdDate,deletedDate,deleted,suppressed" // ,marc'
  const path = `authorities/?id=${ids.join(",")}&fields=${fields}`
  console.log(`Issuing query: GET ${path}`)
  const sierraWrapper = await sierraClient()
  return sierraWrapper
    .get(path)
    .then((result) => result.entries)
    .catch((e) => {
      console.log(
        "getRecordsByIds: Encountered error getting: ",
        e.response.data
      )
    })
}

/**
 *  Get authority records by (personal) name
 *
 *  @return Promise<object[]>
 */
const getRecordsByName = async (
  name,
  options: QueryOptions,
  allResults = []
) => {
  const sierraWrapper = await sierraClient()
  options = Object.assign(
    {
      offset: 0,
      limit: 100,
      operator: "starts_with",
    },
    options
  )

  const query = {
    target: {
      record: {
        type: "authority",
      },
      field: {
        tag: "d",
        // "marcTag": argv.tag,
        // "subfields": "a"
      },
    },
    expr: {
      op: options.operator,
      operands: [name],
    },
  }
  const path = `authorities/query?offset=${options.offset}&limit=${options.limit}`
  console.log(`Issuing query: POST ${path}`, query)
  let result
  try {
    result = await sierraWrapper.post(path, query)
  } catch (e) {
    console.log(
      "getRecordsByName: Encountered error posting: ",
      e.response.data
    )
  }

  if (!result || !result.entries || !result.entries.length) return allResults

  const ids = result.entries.map((r) => r.link.split("/").pop())
  const records = await getRecordsByIds(ids)
  console.log(`Got ${records.length} records:`)
  allResults = allResults.concat(records)
  // console.log(allResults)

  // console.log(`Added ${records.length} results (${allResults.length} total)`)

  // Reached end?
  if (records.length < options.limit) {
    return allResults
  } else {
    // Recurse:
    return getRecordsByName(
      name,
      Object.assign({}, options, { offset: options.offset + options.limit }),
      allResults
    )
  }
}

export const run = async (
  options: QueryOptions,
  prefetchedIds?: string[]
): Promise<SierraAuthority[]> => {
  console.log(`Querying authorities  by ${options.query}`)
  let records
  if (prefetchedIds) {
    records = prefetchedIds
  } else {
    records = await getRecordsByName(options.query, { ...options })
  }
  return records
}

export const headings = {
  0: "Personal Name",
  10: "Corporate Name",
  11: "Meeting Name",
  30: "Uniform Title",
  47: "Named Event",
  48: "Chronological Term",
  50: "Topical Term",
  51: "Geographic Name",
  55: "Genre/Form Term",
  62: "Medium of Performance Term",
  80: "General Subdivision",
  81: "Geographic Subdivision",
  82: "Chronological Subdivision",
  85: "Form Subdivision",
}
