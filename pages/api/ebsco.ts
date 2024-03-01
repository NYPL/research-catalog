import { makeClient } from "../../src/utils/ebscoClient"

import { serializeEbscoPublicationResults } from "../../src/utils/ebscoUtils"

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

export async function publicationsForKeyword(q) {
  const results = await fetchEbscoPublications(q)
  if (!results?.SearchResult?.Data?.Records) return null

  // console.log("Publications for keyword: ", JSON.stringify(results, null, 2))

  // For keyword publication searches, remove anything with low relevance to
  // approximate EBSCO's behavior:
  const records = results.SearchResult.Data.Records.filter((record) => {
    // console.log("Discarding pub match with score " + record.Header.PreciseRelevancyScore)
    return parseInt(record.Header.PreciseRelevancyScore) > 2800
  })

  const serialized = serializeEbscoPublicationResults(records)

  return serialized
}

export async function publicationsForIssns(issns) {
  const results = await Promise.all(
    issns.map(async (issn) => {
      const results = await fetchEbscoPublications(`IS:${issn}`)
      if (!results?.SearchResult?.Data?.Records) return null

      const issnResults = serializeEbscoPublicationResults(
        results.SearchResult.Data.Records
      )
      return issnResults
    })
  )

  const filteredResults = results.flat()

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
