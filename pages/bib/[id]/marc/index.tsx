import { useState } from "react"
import RCHead from "../../../../src/components/Head/RCHead"
import Layout from "../../../../src/components/Layout/Layout"
import Bib from "../../../../src/models/Bib"
import initializePatronTokenAuth from "../../../../src/server/auth"
import type { DiscoveryMarcResult } from "../../../../src/types/marcTypes"
import type { DiscoveryBibResult } from "../../../../src/types/bibTypes"
import { tryInstantiate } from "../../../../src/utils/appUtils"
import { buildBibMetadataTitle } from "../../../../src/utils/bibUtils"
import type { HTTPStatusCode } from "../../../../src/types/appTypes"
import { fetchBib } from "../../../../src/server/api/bib"
import { fetchMarc } from "../../../../src/server/api/marc"
import PageError from "../../../../src/components/Error/PageError"
import Link from "../../../../src/components/Link/Link"
import { Flex, Heading, Text } from "@nypl/design-system-react-components"
import Marc from "../../../../src/models/Marc"
import MarcTable from "../../../../src/components/Marc/MarcTable"

interface MarcPropsType {
  discoveryBibResult: DiscoveryBibResult
  discoveryMarcResult: DiscoveryMarcResult
  isAuthenticated?: boolean
  errorStatus?: HTTPStatusCode | null
}

/**
 * The MARC page is responsible for fetching and displaying a single bib's MARC record.
 */
export default function MarcPage({
  discoveryBibResult,
  discoveryMarcResult,
  isAuthenticated,
  errorStatus = null,
}: MarcPropsType) {
  const [bib, setBib] = useState(
    tryInstantiate({
      constructor: Bib,
      args: [discoveryBibResult],
      ignoreError: !!errorStatus,
      errorMessage: "Bib undefined",
    })
  )

  const marc = tryInstantiate({
    constructor: Marc,
    args: [discoveryMarcResult],
    ignoreError: !!errorStatus,
    errorMessage: "Marc undefined",
  })

  console.log(marc)

  const metadataTitle = buildBibMetadataTitle({
    bibTitle: bib.title,
    marc: true,
  })

  if (errorStatus) {
    return (
      <PageError
        page="marc"
        errorStatus={
          // 422 = invalid bnum, which we also display as "Not found"
          errorStatus === 404 || errorStatus === 422 ? 404 : errorStatus
        }
      />
    )
  }

  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout isAuthenticated={isAuthenticated} activePage="marc">
        <Flex flexDirection="column">
          <Link
            id="bib-link"
            href={`/bib/${bib.id}`}
            variant="standalone"
            mt="s"
            width="max-content"
          >
            <Text
              sx={{
                fontWeight: "500",
                fontSize: "14px",
                color: "ui.link.primary",
              }}
            >
              Go to standard view
            </Text>
          </Link>
          <Heading level="h2" size="heading3" mt="s">
            {bib.title}
          </Heading>
          <Heading level="h3" size="heading5" mt="m">
            MARC record
          </Heading>
          <MarcTable marc={marc} />
        </Flex>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ params, query, req }) {
  const { id } = params

  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const isAuthenticated = patronTokenResponse.isTokenValid

  // First fetch bib
  const bibResult = await fetchBib(id, query)
  if (!("discoveryBibResult" in bibResult)) {
    if (bibResult.status === 307) {
      return {
        redirect: {
          destination: bibResult.redirectUrl,
          permanent: false,
        },
      }
    } else {
      return {
        props: {
          errorStatus: bibResult.status,
        },
      }
    }
  }

  // Only try MARC once bib is handled
  const marcResult = await fetchMarc(id)
  if (!("discoveryMarcResult" in marcResult)) {
    {
      return {
        props: {
          errorStatus: marcResult.status,
        },
      }
    }
  }

  return {
    props: {
      discoveryBibResult: bibResult.discoveryBibResult,
      discoveryMarcResult: marcResult.discoveryMarcResult,
      isAuthenticated,
    },
  }
}
