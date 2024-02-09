import { makeClient } from "../../src/utils/ebscoClient"

import { parseCoverageDates } from "../../src/utils/ebscoUtils"

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
  const results = await fetchEbscoPublications(
    issns.slice(0, 1).map((issn) => `IS:${issn}`)
  )

  if (!results?.SearchResult?.Data?.Records) return null

  return results.SearchResult.Data.Records.map((record) => {
    const issnItem = record.Items?.find((item) => item.Name === "ISSN")
    if (!issnItem) return null

    return record.FullTextHoldings.filter((holding) => holding.URL).map(
      (holding) => {
        return {
          issn: issnItem.Data.split(" ").shift(),
          url: holding.URL,
          name: holding.Name,
          coverage: parseCoverageDates(holding.CoverageDates),
        }
      }
    )
  })
    .flat()
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
