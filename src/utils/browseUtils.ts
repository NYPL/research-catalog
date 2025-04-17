import { fetchResults } from "../server/api/search"
import type { SearchResultsResponse } from "../types/searchTypes"
import nyplApiClient from "../server/nyplApiClient"
import { DISCOVERY_API_SEARCH_ROUTE } from "../config/constants"
import AuthorityVarfield from "../models/Headings/AuthorityVarfield"

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

export const getSubjectMarc = async (bibId, subject) => {
  const client = await nyplApiClient()

  const annotatedMarc = await client.get(
    `${DISCOVERY_API_SEARCH_ROUTE}/${bibId}.annotated-marc`
  )
  const subjectMarc = annotatedMarc.bib.fields
    .find(({ label }) => label === "Subject")
    .values.find(({ content }) => content === subject)

  return subjectMarc
}
