import {
  Box,
  Heading,
  Link as DSLink,
  SearchBar,
} from "@nypl/design-system-react-components"
import RCLink from "../RCLink/RCLink"
import { PATHS, BASE_URL } from "../../config/constants"
import type SearchResultsBib from "../../models/SearchResultsBib"
import {
  formatCoverageRange,
  groupLinksByCoverage,
  groupLinksByPublication,
  overallCoverageRange,
} from "../../utils/ebscoUtils"

interface EbscoLinksProps {
  bib: SearchResultsBib
  linksCount: number
  showSearchInside?: boolean
}

/**
 * The SearchResult component displays a single search result element.
 */
const EbscoLinks = ({ bib, linksCount = Infinity, showSearchInside = false }: EbscoLinksProps) => {
  const ebscoResultsGrouped = groupLinksByCoverage(
    bib.ebscoResults,
    linksCount 
  )

  const coverageRange = overallCoverageRange(bib.ebscoResults)

  // More links than shown?
  const viewMoreUrl =
    bib.ebscoResults.length > linksCount ? (
      <RCLink href={`${BASE_URL}${PATHS.BIB}/${bib.id}`}>
        View all {bib.ebscoResults.length} resources available online
      </RCLink>
    ) : null

  const searchInside = (event) => {
    event.preventDefault();

    const [publicationId, publicationTitle] = event.target.selectName.value.split("||")
    const baseUrl = `https://research-ebsco-com.i.ezproxy.nypl.org/c/2styhb/search/results?autocorrect=y&publicationId=${publicationId}&publicationTitle=${publicationTitle}`
    const query = event.target.textInputName.value

    const url = `${baseUrl}&q=${query}`
    window.location.href = url
  }

  const searchInsideOptions = Object.entries(groupLinksByPublication(bib.ebscoResults))
    .map(([publicationKey, holdings]) => {
      let db = holdings.map((h) => h.name).join(", ")
      db = db.length > 40 ? db.substring(0, 37) + "..." : db

      return {
        text: formatCoverageRange(overallCoverageRange(holdings)) + ` (${db})`,
        value: publicationKey
      }
    })
  console.log("Options: ", searchInsideOptions)

  return (
    <Box>
      <>
        <Heading background="gray.100" level="four" size="callout" mb="xxs" padding="0.3em 1em">
          <>
            <div style={{ width: "auto", float: "right" }}>
              {coverageRange && formatCoverageRange(coverageRange) + " • "}
              {bib.ebscoResults.length} items
            </div>
            Available Online (EBSCO)
          </>
        </Heading>
        {showSearchInside && (
          <Box padding="1em" background="gray.100">
            Search inside this publication
            <SearchBar
              id="searchBar-id"
              labelText="SearchBar Label"
              onSubmit={searchInside}
              selectProps={{
                labelText: "Select a coverage",
                name: "selectName",
                optionsData: searchInsideOptions,
              }}
              textInputProps={{
                labelText: "Item Search",
                name: "textInputName",
                placeholder: "Article title or keyword",
              }}
            />
          </Box>
        )}
        <Box margin="1em">
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
          {viewMoreUrl}
        </Box>
      </>
    </Box>
  )
}

export default EbscoLinks
