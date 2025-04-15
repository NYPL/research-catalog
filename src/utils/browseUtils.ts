import { fetchResults } from "../server/api/search"
import type { SearchResultsResponse } from "../types/searchTypes"

export const getBibThatMatchesSubject = async (subject) => {
  const resp = (await fetchResults({
    filters: { subjectLiteral: subject },
    q: "",
  })) as SearchResultsResponse
  if (resp.results?.totalResults === 0) return
  const bibMatch = resp.results.itemListElement.find((bib) => {
    return bib.result.subjectLiteral.includes(subject)
  })
  return bibMatch.result.uri
}
