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
import type {
  BibResponse,
  DiscoveryBibResult,
} from "../../../../src/types/bibTypes"
import type { DiscoveryItemResult } from "../../../../src/types/itemTypes"
import type { DeliveryLocation } from "../../../../src/types/locationTypes"
import type {
  HoldErrorStatus,
  PatronEligibilityStatus,
} from "../../../../src/types/holdPageTypes"
import RCHead from "../../../../src/components/Head/RCHead"
import HoldRequestCompletedBanner from "../../../../src/components/HoldPages/HoldRequestCompletedBanner"
import {
  idConstants,
  useFocusContext,
} from "../../../../src/context/FocusContext"
import { tryInstantiate } from "../../../../src/utils/appUtils"
import PageError from "../../../../src/components/Error/PageError"
import type { HTTPStatusCode } from "../../../../src/types/appTypes"

interface HoldRequestPropsType {
  discoveryBibResult: DiscoveryBibResult
  discoveryItemResult: DiscoveryItemResult
  deliveryLocations?: DeliveryLocation[]
  patronId: string
  isAuthenticated?: boolean
  patronEligibilityStatus?: PatronEligibilityStatus
  // Hold request process errors
  holdErrorStatus?: HoldErrorStatus
  // Bib/item fetching errors
  bibItemErrorStatus?: HTTPStatusCode | null
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
  holdErrorStatus: defaultErrorStatus,
  patronEligibilityStatus: defaultEligibilityStatus,
  bibItemErrorStatus = null,
}: HoldRequestPropsType) {
  const metadataTitle = `Item Request | ${SITE_NAME}`

  const [holdCompleted, setHoldCompleted] = useState(false)

  const { setPersistentFocus } = useFocusContext()

  const bib = tryInstantiate({
    constructor: Bib,
    args: [discoveryBibResult],
    ignoreError: !!bibItemErrorStatus,
    errorMessage: "Bib undefined",
  })
  const item = tryInstantiate({
    constructor: Item,
    args: [discoveryItemResult, bib],
    ignoreError: !!bibItemErrorStatus,
    errorMessage: "Item undefined",
  })
  const holdId = item ? `${item.bibId}-${item.id}` : ""

  // Check if hold request was completed already.
  useEffect(() => {
    const bannerFlag = sessionStorage.getItem(`holdCompleted-${item?.id}`)
    if (bannerFlag === "true") {
      setHoldCompleted(true)
      sessionStorage.removeItem(`holdCompleted-${item?.id}`)
      setPersistentFocus(idConstants.holdCompletedBanner)
    }
  }, [])

  const [holdErrorStatus, setHoldErrorStatus] = useState(defaultErrorStatus)
  const [patronEligibilityStatus, setPatronEligibilityStatus] = useState(
    defaultEligibilityStatus
  )
  const [formPosting, setFormPosting] = useState(false)

  const router = useRouter()
  const isLoading = useLoading()

  if (bibItemErrorStatus) {
    return <PageError page="hold" errorStatus={bibItemErrorStatus} />
  }

  const handleServerHoldPostError = (errorMessage: string) => {
    console.error(
      "HoldRequestPage: Error in hold request api response",
      errorMessage
    )
    setFormPosting(false)
    setHoldErrorStatus("failed")
    setPersistentFocus(idConstants.holdErrorBanner)
  }

  const handleHoldRequestGAEvent = (item: Item) => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "catalog_request",
        catalog_type: "research",
        request_type: "on_site",
        item_title: item.bibTitle,
        item_author: null,
        record_i_number: item.id,
        record_b_number: item.bibId,
      })
    }
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
          setHoldErrorStatus("patronIneligible")
          setPatronEligibilityStatus(responseJson?.patronEligibilityStatus)
          break
        case 403:
          setFormPosting(false)
          setHoldErrorStatus("failed")
          break
        case 500:
          handleServerHoldPostError(responseJson.error)
          break
        default:
          setFormPosting(false)
          // Success state
          handleHoldRequestGAEvent(item)
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
      <RCHead metadataTitle={metadataTitle} />
      <Layout isAuthenticated={isAuthenticated} activePage="hold">
        {/* Always render the wrapper element that will display the
          dynamically rendered notification for focus management */}
        <Box tabIndex={-1} id={idConstants.holdErrorBanner}>
          {holdErrorStatus && (
            <HoldRequestErrorBanner
              item={item}
              errorStatus={holdErrorStatus}
              patronEligibilityStatus={patronEligibilityStatus}
            />
          )}
        </Box>
        <Box tabIndex={-1} id={idConstants.holdCompletedBanner}>
          {holdCompleted && <HoldRequestCompletedBanner />}
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
              errorStatus={holdErrorStatus}
              source={item.formattedSourceForHoldRequest}
              isDisabled={holdCompleted}
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
      throw new Error("Hold request: No item id in url")
    }
    const discoveryBib = await fetchBib(bibId, {}, itemId)
    const discoveryBibResult = (discoveryBib as BibResponse).discoveryBibResult
    const discoveryItemResult = discoveryBibResult?.items?.[0]

    if ("status" in discoveryBib && discoveryBib.status !== 200) {
      return {
        props: { bibItemErrorStatus: discoveryBib.status },
      }
    }
    if (!discoveryItemResult) {
      throw new Error("Hold request: Item not found")
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
      console.error("Hold request: error fetching deliveryLocations")
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
        holdErrorStatus: locationOrEligibilityFetchFailed
          ? "failed"
          : patronEligibilityStatus.status === 401
          ? "patronIneligible"
          : null,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: { bibItemErrorStatus: 500 },
    }
  }
}
