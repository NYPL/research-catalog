import { BASE_URL } from "../config/constants"
import type { List, ListRecord, ListRecordsSort } from "../types/listTypes"
import { formatMMDDYYYY } from "./dateUtils"

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
  return `Displaying ${`${resultsStart}-${resultsEnd} of ${totalResults.toLocaleString()}`} record${
    totalResults === 1 ? "" : "s"
  }`
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

  // Map over the fetched bib data to build whole ListRecords
  const updatedRecords = bibData.map((bib: any) => {
    const bibResult = bib.result || bib
    const uri =
      bibResult.uri || (bibResult["@id"] ? bibResult["@id"].substring(4) : "")
    const listRecord = pageRecordsMap[uri] || { uri }
    const updatedRecord = {
      uri: listRecord.uri,
      addedDate: formatMMDDYYYY(listRecord.addedDate),
      title: bibResult.titleDisplay?.[0] || bibResult?.title?.[0] || null,
      publicationStatement: bibResult?.publicationStatement?.[0] || null,
      creatorLiteral: bibResult?.creatorLiteral?.[0] || null,
      itemCount: bibResult?.numItemsTotal || bibResult?.items?.length || 0,
      callNumber:
        bibResult?.shelfMark?.[0] || bibResult?.callNumber || "Multiple",
      location: bibResult?.location || "Multiple",
    } as ListRecord
    return updatedRecord
  })

  // Append any list records that didn't have corresponding bib data
  pageRecords.forEach((record) => {
    if (!updatedRecords.find((r: any) => r.uri === record.uri)) {
      updatedRecords.push(record)
    }
  })

  // Use the given sort from ListsService for date added
  if (activeSort.includes("added_date")) {
    // O(1) lookup to prevent slow sort on large lists
    const indexMap = new Map(pageRecords.map((r, i) => [r.uri, i]))
    updatedRecords.sort((a, b) => {
      const indexA = indexMap.get(a.uri) ?? Infinity
      const indexB = indexMap.get(b.uri) ?? Infinity
      return indexA - indexB
    })
  } else {
    updatedRecords.sort((a: any, b: any) => {
      let valA = ""
      let valB = ""
      if (activeSort.includes("title")) {
        valA = a.title || ""
        valB = b.title || ""
      } else if (activeSort.includes("creator")) {
        valA = a.creatorLiteral || ""
        valB = b.creatorLiteral || ""
      } else if (activeSort.includes("callnumber")) {
        valA = a.callNumber || ""
        valB = b.callNumber || ""
      }

      const comparison = valA.localeCompare(valB)
      return activeSort.includes("desc") ? -comparison : comparison
    })
  }

  return updatedRecords
}

export const downloadList = async (
  list: List,
  sort: ListRecordsSort,
  setStatus: any,
  setStatusMessage: any
) => {
  setStatus("")
  setStatusMessage("")
  try {
    if (list.recordCount === 0 || !list.records) {
      setStatus("failure")
      setStatusMessage("Your list has no records to download.")
      return
    }

    const chunkSize = 50
    let allBibData: any[] = []

    for (let i = 0; i < list.records.length; i += chunkSize) {
      const chunk = list.records.slice(i, i + chunkSize)
      const uris = chunk.map((r) => r.uri).join(",")
      try {
        // Rather than Promise.all, to prevent 429 error
        const response = await fetch(
          `${BASE_URL}/api/account/lists/records?uris=${uris}`
        )
        if (response.ok) {
          const data = await response.json()
          allBibData = allBibData.concat(data.bibData || [])
        }
      } catch (error) {
        console.error("Error fetching bib data chunk:", error)
      }
    }

    const allUpdatedRecords = buildListRecords(
      allBibData,
      list.records,
      sort || "added_date_asc"
    )

    const tsvRows = [
      [
        "",
        "Record number",
        "Title",
        "Author",
        "Publication information",
        "Call number",
        "Location",
        "Date added",
      ],
      ...allUpdatedRecords.map((r: ListRecord, index: number) => [
        `"${index + 1}"`,
        `"${r.uri ? r.uri.replace(/"/g, '""') : ""}"`,
        `"${r.title ? r.title.replace(/"/g, '""') : ""}"`,
        `"${r.creatorLiteral ? r.creatorLiteral.replace(/"/g, '""') : ""}"`,
        `"${
          r.publicationStatement
            ? r.publicationStatement.replace(/"/g, '""')
            : ""
        }"`,
        `"${r.callNumber ? r.callNumber.replace(/"/g, '""') : ""}"`,
        `"${r.location ? r.location.replace(/"/g, '""') : ""}"`,
        `"${r.addedDate || ""}"`,
      ]),
    ]

    const tsvContent = tsvRows.map((e) => e.join("\t")).join("\n")
    const blob = new Blob([tsvContent], {
      type: "text/tab-separated-values;charset=utf-8;",
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `${list.listName || "list"}.tsv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setStatus("success")
    setStatusMessage("Your list has been downloaded.")
  } catch (error) {
    console.error("Error downloading list:", error)
    setStatus("failure")
    setStatusMessage("Your list could not be downloaded.")
  }
}
