import Head from "next/head"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import {
  Heading,
  Box,
  SkeletonLoader,
} from "@nypl/design-system-react-components"

import sierraClient from "../../../../src/server/sierraClient"

import Layout from "../../../../src/components/Layout/Layout"
import EDDRequestForm from "../../../../src/components/HoldPages/EDDRequestForm"
import HoldRequestErrorBanner from "../../../../src/components/HoldPages/HoldRequestErrorBanner"
import HoldRequestItemDetails from "../../../../src/components/HoldPages/HoldRequestItemDetails"

import { SITE_NAME, BASE_URL, PATHS } from "../../../../src/config/constants"
import useLoading from "../../../../src/hooks/useLoading"

import { fetchBib } from "../../../../src/server/api/bib"
import MyAccount from "../../../../src/models/MyAccount"

import {
  fetchDeliveryLocations,
  fetchPatronEligibility,
} from "../../../../src/server/api/hold"
import { initialEDDFormState } from "../../../../src/utils/holdPageUtils"

import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
  getLoginRedirect,
} from "../../../../src/server/auth"

import Bib from "../../../../src/models/Bib"
import Item from "../../../../src/models/Item"

import type { DiscoveryBibResult } from "../../../../src/types/bibTypes"
import type { DiscoveryItemResult } from "../../../../src/types/itemTypes"

import type {
  EDDRequestParams,
  HoldErrorStatus,
  PatronEligibilityStatus,
} from "../../../../src/types/holdPageTypes"

interface EDDRequestPropsType {
  discoveryBibResult: DiscoveryBibResult
  discoveryItemResult: DiscoveryItemResult
  patronId: string
  patronEmail?: string
  isAuthenticated?: boolean
  errorStatus?: HoldErrorStatus
  patronEligibilityStatus?: PatronEligibilityStatus
}

/**
 * The EDDRequestPage component renders a form for requesting the electronic delivery of an item
 */
export default function EDDRequestPage({
  discoveryBibResult,
  discoveryItemResult,
  patronId,
  patronEmail,
  isAuthenticated,
  errorStatus: defaultErrorStatus,
  patronEligibilityStatus: defaultEligibilityStatus,
}: EDDRequestPropsType) {
  const metadataTitle = `Electronic Delivery Request | ${SITE_NAME}`
  const bib = new Bib(discoveryBibResult)
  const item = new Item(discoveryItemResult, bib)

  const holdId = `${item.bibId}-${item.id}`

  const [errorStatus, setErrorStatus] = useState(defaultErrorStatus)
  const [patronEligibilityStatus, setPatronEligibilityStatus] = useState(
    defaultEligibilityStatus
  )

  const [eddFormState, setEddFormState] = useState<EDDRequestParams>({
    ...initialEDDFormState,
    emailAddress: patronEmail,
    patronId,
    source: item.source,
  })
  const [formPosting, setFormPosting] = useState(false)

  const bannerContainerRef = useRef<HTMLDivElement>()

  const router = useRouter()
  const isLoading = useLoading()

  useEffect(() => {
    if (
      errorStatus &&
      errorStatus !== "invalid" &&
      bannerContainerRef.current
    ) {
      bannerContainerRef.current.focus()
    }
  }, [errorStatus, patronEligibilityStatus])

  const handleServerHoldPostError = (errorMessage: string) => {
    console.error(
      "EDDRequestPage: Error in EDD request api response",
      errorMessage
    )
    setFormPosting(false)
    setErrorStatus("failed")
  }

  const postEDDRequest = async (eddParams: EDDRequestParams) => {
    try {
      setFormPosting(true)

      const response = await fetch(
        `${BASE_URL}/api/hold/request/${holdId}/edd`,
        {
          method: "POST",
          body: JSON.stringify({ ...eddParams, jsEnabled: true }),
        }
      )
      const responseJson = await response.json()

      switch (response.status) {
        // Patron is ineligible to place holds
        case 401:
          setFormPosting(false)
          setErrorStatus("patronIneligible")
          setPatronEligibilityStatus(responseJson?.patronEligibilityStatus)
          break
        case 500:
          handleServerHoldPostError(responseJson.error)
          break
        default:
          setFormPosting(false)
          // Success state
          await router.push(
            `${PATHS.HOLD_CONFIRMATION}/${holdId}?pickupLocation=edd&requestId=${responseJson?.requestId}`
          )
      }
    } catch (error) {
      handleServerHoldPostError(error)
    }
  }

  return (
    <>
      <Head>
        <meta property="og:title" content={metadataTitle} key="og-title" />
        <meta
          property="og:site_name"
          content={metadataTitle}
          key="og-site-name"
        />
        <meta name="twitter:title" content={metadataTitle} key="tw-title" />
        <title key="main-title">{metadataTitle}</title>
      </Head>
      <Layout isAuthenticated={isAuthenticated} activePage="hold">
        {/* Always render the wrapper element that will display the
          dynamically rendered notification for focus management */}
        <Box tabIndex={-1} ref={bannerContainerRef}>
          {errorStatus && (
            <HoldRequestErrorBanner
              item={item}
              errorStatus={errorStatus}
              patronEligibilityStatus={patronEligibilityStatus}
            />
          )}
        </Box>
        <Heading level="h2" mb="l" size="heading3">
          Request scan
        </Heading>
        <HoldRequestItemDetails item={item} />
        {isLoading || formPosting ? (
          <SkeletonLoader showImage={false} data-testid="edd-request-loading" />
        ) : errorStatus !== "eddUnavailable" ? (
          <EDDRequestForm
            eddFormState={eddFormState}
            setEddFormState={setEddFormState}
            handleSubmit={postEDDRequest}
            setErrorStatus={setErrorStatus}
            holdId={holdId}
          />
        ) : null}
      </Layout>
    </>
  )
}

export async function getServerSideProps({ params, req, res }) {
  const { id } = params

  // authentication redirect
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const isAuthenticated = patronTokenResponse.isTokenValid
  const redirectTrackerCookie = req.cookies["nyplAccountRedirects"]
  const redirectCount = parseInt(redirectTrackerCookie, 10) || 0
  const redirectBasedOnNyplAccountRedirects =
    doRedirectBasedOnNyplAccountRedirects(redirectCount)

  // If we end up not authenticated 3 times after redirecting to the login url, don't redirect.
  if (redirectBasedOnNyplAccountRedirects && !isAuthenticated) {
    res.setHeader(
      "Set-Cookie",
      `nyplAccountRedirects=${
        redirectCount + 1
      }; Max-Age=10; path=/; domain=.nypl.org;`
    )
    const redirect = getLoginRedirect(req, `${PATHS.HOLD_REQUEST}/${id}/edd`)

    return {
      redirect: {
        destination: redirect,
        permanent: false,
      },
    }
  }

  try {
    const patronId = patronTokenResponse?.decodedPatron?.sub

    // fetch bib and item
    const [bibId, itemId] = id.split("-")

    if (!itemId) {
      throw new Error("No item id in url")
    }
    const { discoveryBibResult } = await fetchBib(bibId, {}, itemId)
    const discoveryItemResult = discoveryBibResult?.items?.[0]

    if (!discoveryItemResult) {
      throw new Error("EDD Page - Item not found")
    }

    const bib = new Bib(discoveryBibResult)
    const item = new Item(discoveryItemResult, bib)

    // Redirect if to aeonUrl if present in the item response
    if (item.aeonUrl) {
      return {
        redirect: {
          destination: item.aeonUrl,
          permanent: false,
        },
      }
    }

    const { eddRequestable, status: locationStatus } =
      await fetchDeliveryLocations(item.barcode, patronId)

    if (locationStatus !== 200) {
      console.error("EDD Page - Error fetching edd in getServerSideProps")
    }

    const isEddAvailable = eddRequestable && item.isEDDRequestable

    const patronEligibilityStatus = await fetchPatronEligibility(patronId)

    // fetch patron's email to pre-populate the edd form if available
    const client = await sierraClient()
    const patronAccount = new MyAccount(client, patronId)
    const patron = await patronAccount.getPatron()
    const patronEmail = patron?.emails?.[0]

    const locationOrEligibilityFetchFailed =
      locationStatus !== 200 ||
      ![200, 401].includes(patronEligibilityStatus?.status)

    return {
      props: {
        discoveryBibResult,
        discoveryItemResult,
        patronId,
        patronEmail,
        isAuthenticated,
        patronEligibilityStatus,
        errorStatus: locationOrEligibilityFetchFailed
          ? "failed"
          : patronEligibilityStatus.status === 401
          ? "patronIneligible"
          : !isEddAvailable
          ? "eddUnavailable"
          : null,
      },
    }
  } catch (error) {
    console.log(error)

    return {
      redirect: {
        destination: PATHS["404"],
        permanent: false,
      },
    }
  }
}
