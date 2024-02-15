import { makeClient } from "../../src/utils/ebscoClient"

import {
  parseCoverageDates,
  ebscoSearchResultsToIssnResults,
} from "../../src/utils/ebscoUtils"

let ebscoClient

export async function fetchEbscoResults(query) {
  if (!ebscoClient) {
    try {
      ebscoClient = await makeClient()
    } catch {
      return null
    }
  }

  return ebscoClient.search(query)
}

export async function publicationsForIssns(issns) {
  const results = await Promise.all(
    issns
      .map(async (issn) => {
        const results = await fetchEbscoPublications(`IS:${issn}`)

        const issnResults = ebscoSearchResultsToIssnResults(results)
        return issnResults
      })
  )

  const filteredResults = results
    .flat(4)

  return filteredResults
    .filter((result) => result)
    .reduce((h, result) => {
      if (!h[result.issn]) {
        h[result.issn] = []
      }
      h[result.issn].push(result)
      return h
    }, {})
}

export async function fetchEbscoPublications(query) {
  if (!ebscoClient) {
    try {
      ebscoClient = await makeClient()
    } catch {
      return null
    }
  }

  return ebscoClient.publications(query)
}
