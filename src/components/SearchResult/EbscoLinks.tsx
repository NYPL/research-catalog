import {
  Box,
  Heading,
  Link as DSLink,
} from "@nypl/design-system-react-components"

import type { EbscoResult } from "../../types/bibTypes"

interface EbscoLinksProps {
  ebscoResults: EbscoResult[]
}

/**
 * The SearchResult component displays a single search result element.
 */
const EbscoLinks = ({ ebscoResults }: EbscoLinksProps) => {
  const MAX_TO_SHOW = 3

  const formatCoverageDate = (dateString) => {
    const date = new Date(dateString)
    if (date.getFullYear() === 9999) return "present"

    const formatOptions: Intl.DateTimeFormatOptions = {
      day: "numeric",
      year: "numeric",
      month: "numeric",
      timeZone: "America/New_York",
    }
    return Intl.DateTimeFormat("en", formatOptions).format(date)
  }

  const ebscoResultsGrouped = ebscoResults
    // Sort by start date ascending:
    .sort((l1, l2) => {
      const [d1, d2] = [l1, l2].map((link) => link.coverage && link.coverage[0]) // ? link.coverage.split(" - ").shift() : "")
      return d1 > d2 ? 1 : -1
    })
    // Only show first N links, however they're grouped:
    .slice(0, MAX_TO_SHOW)
    // Group by coverage:
    .reduce((h, link) => {
      const coverageString = link.coverage
        ? link.coverage
            .map((coverage) => coverage.map(formatCoverageDate).join("—"))
            .join("; ")
        : "Various dates"

      if (!h[coverageString]) h[coverageString] = []
      h[coverageString].push(link)
      return h
    }, {})

  const viewMoreLabel =
    ebscoResults.length > MAX_TO_SHOW
      ? `View all ${ebscoResults.length} resources available online`
      : null

  return (
    <Box border="2px" borderColor="red.200">
      <>
        [EBSCO]
        {Object.keys(ebscoResultsGrouped).map((coverage) => (
          <p key={coverage}>
            {coverage}:
            {ebscoResultsGrouped[coverage].map((result) => (
              <>
                <br />
                <DSLink
                  href={result.url}
                  target="_blank"
                  rel="noreferrer"
                  key={result.id}
                >
                  {result.name}
                </DSLink>
              </>
            ))}
          </p>
        ))}
      </>
      {viewMoreLabel && (
        <Heading level="four" size="callout" mb="xxs">
          {viewMoreLabel}
        </Heading>
      )}
    </Box>
  )
}

export default EbscoLinks
