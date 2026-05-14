import ListRecord from "../models/ListRecord"

export const LIST_RECORDS_PER_PAGE = 20

/**
 * listsSortOptions
 * The allowed sort keys for all lists
 */
export const listsSortOptions: Record<string, string> = {
  record_count_desc: "Number of records (high to low)",
  record_count_asc: "Number of records (low to high)",
  list_name_asc: "List name (A - Z)",
  list_name_desc: "List name (Z - A)",
  modified_date_desc: "Date modified (new to old)",
  modified_date_asc: "Date modified (old to new)",
  created_date_desc: "Date created (new to old)",
  created_date_asc: "Date created (old to new)",
}

/**
 * listSortOptions
 * The allowed sort keys for the records in a list
 */
export const listSortOptions: Record<string, string> = {
  title_asc: "Title (A - Z)",
  title_desc: "Title (Z - A)",
  creator_asc: "Author (A - Z)",
  creator_desc: "Author (Z - A)",
  callnumber_asc: "Call number",
  added_date_asc: "Date added (new to old)",
  added_date_desc: "Date added (old to new)",
}

export const generateListSlug = (name: string) => {
  if (!name) return ""
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export const listResultsHeading = (list, currentPage) => {
  const totalResults = list?.recordCount
  const resultsStart = (currentPage - 1) * LIST_RECORDS_PER_PAGE + 1
  const resultsEnd = Math.min(currentPage * LIST_RECORDS_PER_PAGE, totalResults)
  return `Displaying ${
    totalResults > LIST_RECORDS_PER_PAGE
      ? `${resultsStart}-${resultsEnd} of ${totalResults.toLocaleString()}`
      : totalResults.toLocaleString()
  } item${totalResults === 1 ? "" : "s"}`
}

export const buildListRecords = (
  bibData: any[],
  pageRecords: ListRecord[],
  activeSort: string
): ListRecord[] => {
  // Map of the page's list records keyed by their URI
  const pageRecordsMap = pageRecords.reduce((acc: any, record: any) => {
    acc[record.uri] = record
    return acc
  }, {})

  // Map over the fetched bib data to instantiate ListRecords (preserve Discovery API sort order)
  const updatedRecords = bibData.map((bib: any) => {
    const bibResult = bib.result || bib
    const uri =
      bibResult.uri || (bibResult["@id"] ? bibResult["@id"].substring(4) : "")
    const record = pageRecordsMap[uri] || { uri }
    // Temp ListRecord
    const updated = new ListRecord(
      {
        uri: record.uri,
        addedToListDate: new Date().toISOString(),
      } as any,
      bibResult
    )
    // restore the addedDate
    updated.addedDate = record.addedDate
    return updated
  })

  // Append any records that Discovery API didn't return
  pageRecords.forEach((record) => {
    if (!updatedRecords.find((r: any) => r.uri === record.uri)) {
      updatedRecords.push(record)
    }
  })

  // Sort directly if added sort, don't use Discovery API bib sort
  if (activeSort.includes("added_date")) {
    updatedRecords.sort((a, b) => {
      const indexA = pageRecords.findIndex((r) => r.uri === a.uri)
      const indexB = pageRecords.findIndex((r) => r.uri === b.uri)
      return indexA - indexB
    })
  }

  return updatedRecords
}
