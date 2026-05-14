export const LIST_RECORDS_PER_PAGE = 20

/**
 * listsSortOptions
 * The allowed sort keys for all lists
 */
export const listsSortOptions: Record<string, string> = {
  record_count_desc: "Number of records (high to low)",
  record_count_asc: "Number of records (low to high)",
  list_name_asc: "List name (A-Z)",
  list_name_desc: "List name (Z-A)",
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
  title_asc: "Title (A-Z)",
  title_desc: "Title (Z-A)",
  author_asc: "Author (A-Z)",
  author_desc: "Author (Z-A)",
  callnumber: "Call number",
  added_date_desc: "Date added (new to old)",
  added_date_asc: "Date added (old to new)",
}

export const generateListSlug = (name: string) => {
  if (!name) return ""
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export const listResultsHeading = (list, currentPage) => {
  const totalResults = list?.records.length || 0
  const resultsStart = (currentPage - 1) * LIST_RECORDS_PER_PAGE + 1
  const resultsEnd = Math.min(currentPage * LIST_RECORDS_PER_PAGE, totalResults)
  return `Displaying ${
    totalResults > LIST_RECORDS_PER_PAGE
      ? `${resultsStart}-${resultsEnd} of ${totalResults.toLocaleString()}`
      : totalResults.toLocaleString()
  } item${totalResults === 1 ? "" : "s"}`
}
