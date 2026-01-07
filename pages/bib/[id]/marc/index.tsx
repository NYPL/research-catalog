import { useState } from "react"
import RCHead from "../../../../src/components/Head/RCHead"
import Layout from "../../../../src/components/Layout/Layout"
import Bib from "../../../../src/models/Bib"
import initializePatronTokenAuth from "../../../../src/server/auth"
import type { DiscoveryMarcResult } from "../../../../src/types/bibDetailsTypes"
import type { DiscoveryBibResult } from "../../../../src/types/bibTypes"
import { tryInstantiate } from "../../../../src/utils/appUtils"
import { buildBibMetadataTitle } from "../../../../src/utils/bibUtils"
import type { HTTPStatusCode } from "../../../../src/types/appTypes"
import { fetchBib } from "../../../../src/server/api/bib"

interface MarcPropsType {
  discoveryMarcResult: DiscoveryMarcResult
  discoveryBibResult: DiscoveryBibResult
  isAuthenticated?: boolean
  errorStatus?: HTTPStatusCode | null
}

/**
 * The Marc page is responsible for fetching and displaying a single bib's MARC record.
 */
export default function MarcPage({
  discoveryMarcResult,
  discoveryBibResult,
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

  const metadataTitle = buildBibMetadataTitle({
    bibTitle: bib.title,
    marc: true,
  })

  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout isAuthenticated={isAuthenticated} activePage="marc"></Layout>
    </>
  )
}

export async function getServerSideProps({ params, query, req }) {
  const { id } = params
  const results = await fetchBib(id, query)
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const isAuthenticated = patronTokenResponse.isTokenValid

  // Direct to error display according to status
  if (!("discoveryBibResult" in results)) {
    if (results.status === 307)
      return {
        redirect: {
          destination: results.redirectUrl,
          permanent: false,
        },
      }
    else
      return {
        props: {
          errorStatus: results.status,
        },
      }
  }

  return {
    props: {
      discoveryBibResult: results.discoveryBibResult,
      isAuthenticated,
    },
  }
}
