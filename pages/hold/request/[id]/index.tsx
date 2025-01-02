import Head from "next/head"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import {
  Heading,
  Box,
  SkeletonLoader,
} from "@nypl/design-system-react-components"

import Layout from "../../../../src/components/Layout/Layout"

import HoldRequestForm from "../../../../src/components/HoldPages/HoldRequestForm"
import HoldRequestErrorBanner from "../../../../src/components/HoldPages/HoldRequestErrorBanner"
import HoldRequestItemDetails from "../../../../src/components/HoldPages/HoldRequestItemDetails"

import { SITE_NAME, BASE_URL, PATHS } from "../../../../src/config/constants"
import useLoading from "../../../../src/hooks/useLoading"

import { fetchBib } from "../../../../src/server/api/bib"
import {
  fetchDeliveryLocations,
  fetchPatronEligibility,
} from "../../../../src/server/api/hold"

import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
  getLoginRedirect,
} from "../../../../src/server/auth"

import Bib from "../../../../src/models/Bib"
import Item from "../../../../src/models/Item"

import type { DiscoveryBibResult } from "../../../../src/types/bibTypes"
import type { DiscoveryItemResult } from "../../../../src/types/itemTypes"
import type { DeliveryLocation } from "../../../../src/types/locationTypes"
import type {
  HoldErrorStatus,
  PatronEligibilityStatus,
} from "../../../../src/types/holdPageTypes"

interface HoldRequestPropsType {
  discoveryBibResult: DiscoveryBibResult
  discoveryItemResult: DiscoveryItemResult
  deliveryLocations?: DeliveryLocation[]
  patronId: string
  isAuthenticated?: boolean
  errorStatus?: HoldErrorStatus
  patronEligibilityStatus?: PatronEligibilityStatus
}

/**
 * The Hold Request page renders a form to place a hold on an item.
 * It renders some basic info about the bib and item based on the bib and item ids in the url,
 * including pickup location options rendered as radio buttons in the form.
 */
export default function HoldRequestPage({
  discoveryBibResult,
  discoveryItemResult,
  deliveryLocations = [],
  patronId,
  isAuthenticated,
  errorStatus: defaultErrorStatus,
  patronEligibilityStatus: defaultEligibilityStatus,
}: HoldRequestPropsType) {
  const metadataTitle = `Item Request | ${SITE_NAME}`

  const bib = new Bib(discoveryBibResult)
  const item = new Item(discoveryItemResult, bib)

  const holdId = `${item.bibId}-${item.id}`

  const [errorStatus, setErrorStatus] = useState(defaultErrorStatus)
  const [patronEligibilityStatus, setPatronEligibilityStatus] = useState(
    defaultEligibilityStatus
  )
  const [formPosting, setFormPosting] = useState(false)
  const bannerContainerRef = useRef<HTMLDivElement>()

  const router = useRouter()
  const isLoading = useLoading()

  useEffect(() => {
    if (errorStatus && bannerContainerRef.current) {
      bannerContainerRef.current.focus()
    }
  }, [errorStatus, patronEligibilityStatus])

  const handleServerHoldPostError = (errorMessage: string) => {
    console.error(
      "HoldRequestPage: Error in hold request api response",
      errorMessage
    )
    setFormPosting(false)
    setErrorStatus("failed")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setFormPosting(true)
      const { patronId, source, pickupLocation } = e.target

      const response = await fetch(`${BASE_URL}/api/hold/request/${holdId}`, {
        method: "POST",
        body: JSON.stringify({
          patronId: patronId?.value,
          source: source?.value,
          pickupLocation: pickupLocation?.value,
          jsEnabled: true,
        }),
      })
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
            `${PATHS.HOLD_CONFIRMATION}/${holdId}?pickupLocation=${responseJson.pickupLocation}&requestId=${responseJson.requestId}`
          )
      }
    } catch (error) {
      console.error(
        "HoldRequestPage: Error in hold request api response",
        error
      )
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
          Request for on-site use
        </Heading>
        <HoldRequestItemDetails item={item} />
        {isLoading || formPosting ? (
          <SkeletonLoader
            showImage={false}
            data-testid="hold-request-loading"
          />
        ) : item.isAvailable ? (
          <>
            <Heading level="h3" size="heading4" mb="l">
              Choose a pickup location
            </Heading>
            <HoldRequestForm
              deliveryLocations={deliveryLocations}
              handleSubmit={handleSubmit}
              holdId={holdId}
              patronId={patronId}
              errorStatus={errorStatus}
              source={item.formattedSourceForHoldRequest}
            />
          </>
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
    const redirect = getLoginRedirect(req, `${PATHS.HOLD_REQUEST}/${id}`)

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
      throw new Error("Hold Page - Item not found")
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

    const { deliveryLocations, status: locationStatus } =
      await fetchDeliveryLocations(item.barcode, patronId)

    if (locationStatus !== 200) {
      console.error(
        "HoldRequest Page - Error fetching deliveryLocations in getServerSideProps"
      )
    }

    const patronEligibilityStatus = await fetchPatronEligibility(patronId)

    const locationOrEligibilityFetchFailed =
      locationStatus !== 200 ||
      ![200, 401].includes(patronEligibilityStatus?.status)

    return {
      props: {
        discoveryBibResult,
        discoveryItemResult,
        deliveryLocations,
        patronId,
        isAuthenticated,
        patronEligibilityStatus,
        errorStatus: locationOrEligibilityFetchFailed
          ? "failed"
          : patronEligibilityStatus.status === 401
          ? "patronIneligible"
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