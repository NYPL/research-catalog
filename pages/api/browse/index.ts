import nyplApiClient from "../../../src/server/nyplApiClient"

export const processEBResult = (EBResult) => {
  const { aggregate_bib_count, normalized_label, label } = EBResult.n
  return {
    aggregateBibCount: aggregate_bib_count,
    normalizedLabel: normalized_label,
    label: label,
  }
}

export const fetchEBResults = async (query) => {
  const { q, type } = query
  if (q && type) {
    const platformClient = await nyplApiClient()
    const data = await platformClient.get(
      `/subject-headings?q=${q},type=${type}`
    )
    const results = data.main.map(processEBResult)
    return results
  } else return []
}
