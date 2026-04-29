/**
 * listSortOptions
 * The allowed keys for the sort field and their respective labels
 */
export const listSortOptions: Record<string, string> = {
  count_desc: "Number of records (high to low)",
  count_asc: "Number of records (low to high)",
  list_name_asc: "List name (A-Z)",
  list_name_desc: "List name (Z-A)",
  modified_date_desc: "Date modified (new to old)",
  modified_date_asc: "Date modified (old to new)",
  created_date_desc: "Date created (new to old)",
  created_date_asc: "Date created (old to new)",
}
