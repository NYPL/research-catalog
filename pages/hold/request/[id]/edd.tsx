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

import type {
  BibResponse,
  DiscoveryBibResult,
} from "../../../../src/types/bibTypes"
import type { DiscoveryItemResult } from "../../../../src/types/itemTypes"

import type {
  EDDRequestParams,
  HoldErrorStatus,
  PatronEligibilityStatus,
} from "../../../../src/types/holdPageTypes"
import RCHead from "../../../../src/components/Head/RCHead"
import { tryInstantiate } from "../../../../src/utils/appUtils"
import HoldRequestCompletedBanner from "../../../../src/components/HoldPages/HoldRequestCompletedBanner"
import PageError from "../../../../src/components/Error/PageError"
import type { HTTPStatusCode } from "../../../../src/types/appTypes"

interface EDDRequestPropsType {
  discoveryBibResult: DiscoveryBibResult
  discoveryItemResult: DiscoveryItemResult
  patronId: string
  patronEmail?: string
  isAuthenticated?: boolean
  patronEligibilityStatus?: PatronEligibilityStatus
  // Hold request process errors
  holdErrorStatus?: HoldErrorStatus
  // Bib/item fetching errors
  bibItemErrorStatus?: HTTPStatusCode | null
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
  holdErrorStatus: defaultErrorStatus,
  patronEligibilityStatus: defaultEligibilityStatus,
  bibItemErrorStatus = null,
}: EDDRequestPropsType) {
  const metadataTitle = `Electronic Delivery Request | ${SITE_NAME}`
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

  const [holdErrorStatus, setHoldErrorStatus] = useState(defaultErrorStatus)
  const [patronEligibilityStatus, setPatronEligibilityStatus] = useState(
    defaultEligibilityStatus
  )

  const [formPosting, setFormPosting] = useState(false)

  const bannerContainerRef = useRef<HTMLDivElement>()

  const router = useRouter()
  const isLoading = useLoading()

  // Derive form values from query string in case of js-disabled server-side redirect
  const formStateFromServer = router.query?.formState
    ? JSON.parse(router.query.formState as string)
    : []

  const [eddFormState, setEddFormState] = useState<EDDRequestParams>({
    ...initialEDDFormState,
    emailAddress: patronEmail,
    patronId,
    source: item?.formattedSourceForHoldRequest,
    // Override values with server form state in the case of a no-js request
    ...formStateFromServer,
  })

  const [holdCompleted, setHoldCompleted] = useState(false)

  // Check if hold request was completed already.
  useEffect(() => {
    const bannerFlag = sessionStorage.getItem(`holdCompleted-${item?.id}`)
    if (bannerFlag === "true") {
      setHoldCompleted(true)
      sessionStorage.removeItem(`holdCompleted-${item?.id}`)
      if (bannerContainerRef.current) {
        bannerContainerRef.current.focus()
      }
    }
  }, [])

  useEffect(() => {
    if (
      holdErrorStatus &&
      holdErrorStatus !== "invalid" &&
      bannerContainerRef.current
    ) {
      bannerContainerRef.current.focus()
    }
  }, [holdErrorStatus, patronEligibilityStatus])

  if (bibItemErrorStatus) {
    return <PageError page="hold" errorStatus={bibItemErrorStatus} />
  }

  const handleServerHoldPostError = (errorMessage: string) => {
    console.error(
      "EDDRequestPage: Error in EDD request api response",
      errorMessage
    )
    setFormPosting(false)
    setHoldErrorStatus("failed")
  }

  const handleEDDRequestGAEvent = (item: Item) => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "catalog_request",
        catalog_type: "research",
        request_type: "scan",
        item_title: item.bibTitle,
        item_author: null,
        record_i_number: item.id,
        record_b_number: item.bibId,
      })
    }
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
      <RCHead metadataTitle={metadataTitle} />
      <Layout isAuthenticated={isAuthenticated} activePage="hold">
        {/* Always render the wrapper element that will display the
          dynamically rendered notification for focus management */}
        <Box tabIndex={-1} ref={bannerContainerRef}>
          {holdErrorStatus && (
            <HoldRequestErrorBanner
              item={item}
              errorStatus={holdErrorStatus}
              patronEligibilityStatus={patronEligibilityStatus}
            />
          )}
          {holdCompleted && <HoldRequestCompletedBanner isEDD />}
        </Box>
        <Heading level="h2" mb="l" size="heading3">
          Request scan
        </Heading>
        <HoldRequestItemDetails item={item} />
        {isLoading || formPosting ? (
          <SkeletonLoader showImage={false} data-testid="edd-request-loading" />
        ) : holdErrorStatus !== "eddUnavailable" ? (
          <EDDRequestForm
            eddFormState={eddFormState}
            setEddFormState={setEddFormState}
            handleSubmit={postEDDRequest}
            setErrorStatus={setHoldErrorStatus}
            errorStatus={holdErrorStatus}
            handleGAEvent={() => handleEDDRequestGAEvent(item)}
            holdId={holdId}
          />
        ) : null}
      </Layout>
    </>
  )
}

export async function getServerSideProps({ params, req, res, query }) {
  const { id } = params
  const { formInvalid } = query
  const serverValidationFailed = formInvalid ? JSON.parse(formInvalid) : false

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
      throw new Error("No item ID in URL")
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
      console.error("EDD: Item not found")
      return {
        props: { bibItemErrorStatus: discoveryBib.status },
      }
    }

    const bib = new Bib(discoveryBibResult)
    const item = new Item(discoveryItemResult, bib)

    // Redirect to aeonUrl if present in the item response
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
      console.error("EDD: Error fetching delivery locations")
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
        holdErrorStatus: locationOrEligibilityFetchFailed
          ? "failed"
          : patronEligibilityStatus.status === 401
          ? "patronIneligible"
          : !isEddAvailable
          ? "eddUnavailable"
          : serverValidationFailed
          ? "invalid"
          : null,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: { bibItemErrorStatus: 500 },
    }
  }
}
