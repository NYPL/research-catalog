import {
  Box,
  Heading,
  Link as DSLink,
} from "@nypl/design-system-react-components"
import RCLink from "../RCLink/RCLink"
import { PATHS, BASE_URL } from "../../config/constants"
import type SearchResultsBib from "../../models/SearchResultsBib"
import {
  formatCoverageRange,
  groupLinksByCoverage,
  overallCoverageRange,
} from "../../utils/ebscoUtils"

interface EbscoLinksProps {
  bib: SearchResultsBib
}

/**
 * The SearchResult component displays a single search result element.
 */
const EbscoLinks = ({ bib }: EbscoLinksProps) => {
  const MAX_TO_SHOW = 10

  const ebscoResultsGrouped = groupLinksByCoverage(
    bib.ebscoResults,
    MAX_TO_SHOW
  )

  const coverageRange = overallCoverageRange(bib.ebscoResults)

  // More links than shown?
  const viewMoreUrl =
    bib.ebscoResults.length > MAX_TO_SHOW ? (
      <RCLink href={`${BASE_URL}${PATHS.BIB}/${bib.id}`}>
        View all {bib.ebscoResults.length} resources available online
      </RCLink>
    ) : null

  return (
    <Box border="2px" borderColor="red.200">
      <>
        <Heading level="four" size="callout" mb="xxs">
          <>
            <div style={{ width: "auto", float: "right" }}>
              {coverageRange && formatCoverageRange(coverageRange) + " • "}{bib.ebscoResults.length}{" "}
              items
            </div>
            Available Online (EBSCO)
          </>
        </Heading>
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
      {viewMoreUrl}
    </Box>
  )
}

export default EbscoLinks
