export const parseCoverageDates = (coverages) => {
  if (!coverages) return null
  return coverages
    .map((coverage) => [coverage.StartDate, coverage.EndDate])
    .map((pair) =>
      pair.map(
        (s) => `${s.substring(0, 4)}-${s.substring(4, 6)}-${s.substring(6, 8)}`
      )
    )
}

export const issnsForSearchResults = (discoveryApiResults) => {
  return (discoveryApiResults.results.itemListElement || [])
    .filter((result) => result.result.idIssn)
    .map((result) => {
      return result.result.idIssn.map((issn) => ({
        uri: result.result.uri,
        issn,
      }))
    })
    .flat()
    .map((result) => result.issn)
}

export const serializeEbscoPublicationResults = (records) => {
  return records
    .map((record) => {
      const issnItem = record.Items?.find((item) => item.Name === "ISSN")
      if (!issnItem) return null

      const publicationId = record.Header.PublicationId.replace(/^[^\d]*/, "")
      const publicationTitle = record.Items.find(
        (item) => item.Name === "Title"
      )?.Data
      const publicationType = record.Header.ResourceType

      return record.FullTextHoldings.filter((holding) => holding.URL).map(
        (holding) => {
          return {
            issn: issnItem.Data.split(" ").shift(),
            url: holding.URL,
            publicationId,
            publicationTitle,
            publicationType,
            name: holding.Name,
            coverage: parseCoverageDates(holding.CoverageDates),
          }
        }
      )
    })
    .flat(4)
    .filter((entry) => entry)
}

export const formatCoverageDate = (dateString) => {
  const date = new Date(dateString)
  if (date.getFullYear() === 9999) return "present"

  const formatOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    year: "numeric",
    month: "numeric",
    timeZone: "America/New_York",
  }
  try {
    return Intl.DateTimeFormat("en", formatOptions).format(date)
  } catch {
    return `[${dateString}]`
  }
}

export const formatCoverageRange = (range) => {
  return range.map(formatCoverageDate).join("—")
}

/**
 *  Build a single sort comparator based on any number of value callbacks.
 *  Useful for passing to Array.sort when you want to sort by multiple
 *  properties.
 *
 *  e.g. Given this array:
 *    const a = [{ k1: "k1v1", k2: "k2v1" }, { k1: "k1v1", k2: "k2v2" }]
 *
 *  .. This will fail because k1 is identical between two elements:
 *    a.sort(compoundSort(
 *      (o) => o.k1
 *    ))
 *
 *  .. whereas this will succeed because k2 is distinct:
 *    a.sort(compoundSort(
 *      (o) => o.k1,
 *      (o) => o.k2
 *    ))
 */
const compoundSorter = function (...comparators) {
  return (el1, el2) => {
    let ind = null
    for (ind in comparators) {
      const comparator = comparators[ind]
      const v1 = comparator(el1) || ""
      const v2 = comparator(el2) || ""
      if (v1 > v2) return 1
      else if (v1 < v2) return -1
    }
    /*
    // Throw error if comparators failed to find a defined sort for any two elements:
    const el1Values = comparators.map((comp) => comp(el1))
    const el2Values = comparators.map((comp) => comp(el2))
    throw new Error(
      `Could not sort elements because comparators returned identical values: ${el1Values}; ${el2Values}`
    )
    */
  }
}

export const groupLinksByPublication = (ebscoLinks) => {
  return (
    ebscoLinks
      .sort(
        compoundSorter(
          // Sort by start date ascending:
          (link) =>
            link.coverage && link.coverage[0] && link.coverage[0].join("🎸"),
          // .. followed by name (if dates match)
          (link) => link.name,
          // .. followed by URL (if dates and name match)
          (link) => link.url
        )
      )
      // Group by coverage:
      .reduce((h, link) => {
        const publicationKey = `${link.publicationId}||${link.publicationTitle}`

        if (!h[publicationKey]) h[publicationKey] = []
        h[publicationKey].push(link)
        return h
      }, {})
  )
}

export const groupLinksByCoverage = (ebscoLinks, maxToShow = Infinity) => {
  return (
    ebscoLinks
      .sort(
        compoundSorter(
          // Sort by start date ascending:
          (link) =>
            link.coverage && link.coverage[0] && link.coverage[0].join("🎸"),
          // .. followed by name (if dates match)
          (link) => link.name,
          // .. followed by URL (if dates and name match)
          (link) => link.url
        )
      )
      // Only show first N links, however they're grouped:
      .slice(0, maxToShow)
      // Group by coverage:
      .reduce((h, link) => {
        const coverageString = link.coverage?.length
          ? link.coverage.map(formatCoverageRange).join("; ")
          : "Various dates"

        if (!h[coverageString]) h[coverageString] = []
        h[coverageString].push(link)
        return h
      }, {})
  )
}

export const overallCoverageRange = (ebscoLinks) => {
  // Get the lowest date for all link coverages:
  const minCoverage = ebscoLinks
    .filter((link) => link.coverage && link.coverage[0] && link.coverage[0][0])
    .map((link) => link.coverage[0][0])
    .sort()
    .shift()
  // Get the highest date for all link coverages:
  const maxCoverage = ebscoLinks
    .filter(
      (link) => link.coverage && link.coverage.at(-1) && link.coverage.at(-1)[1]
    )
    .map((link) => link.coverage.at(-1)[1])
    .sort()
    .pop()

  return minCoverage && maxCoverage && [minCoverage, maxCoverage]
}
