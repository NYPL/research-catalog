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
import HoldRequestBanner from "../../../../src/components/HoldPages/HoldRequestBanner"
import HoldItemDetails from "../../../../src/components/HoldPages/HoldItemDetails"

import { SITE_NAME, BASE_URL, PATHS } from "../../../../src/config/constants"
import useLoading from "../../../../src/hooks/useLoading"

import { fetchBib } from "../../../../src/server/api/bib"
import { fetchDeliveryLocations } from "../../../../src/server/api/hold"

import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
  getLoginRedirect,
} from "../../../../src/server/auth"

import Bib from "../../../../src/models/Bib"
import Item from "../../../../src/models/Item"

import type { DiscoveryBibResult } from "../../../../src/types/bibTypes"
import type { DiscoveryItemResult } from "../../../../src/types/itemTypes"
import type { DeliveryLocation } from "../../../../src/types/locationTypes"

interface HoldRequestPropsType {
  discoveryBibResult: DiscoveryBibResult
  discoveryItemResult: DiscoveryItemResult
  deliveryLocations?: DeliveryLocation[]
  patronId: string
  isAuthenticated?: boolean
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
}: HoldRequestPropsType) {
  const metadataTitle = `Item Request | ${SITE_NAME}`

  const bib = new Bib(discoveryBibResult)
  const item = new Item(discoveryItemResult, bib)

  const holdId = `${item.bibId}-${item.id}`

  // Initialize alert to true if item is not available. This will show the error banner.
  const [alert, setAlert] = useState(!item.isAvailable)
  const [errorDetail, setErrorDetail] = useState("")
  const [formPosting, setFormPosting] = useState(false)
  const bannerContainerRef = useRef<HTMLDivElement>()

  const router = useRouter()
  const isLoading = useLoading()

  useEffect(() => {
    if (alert && bannerContainerRef.current) {
      bannerContainerRef.current.focus()
    }
  }, [alert])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setFormPosting(true)
      const { patronId, source, pickupLocation } = e.target

      const response = await fetch(`${BASE_URL}/api/hold/request/${holdId}`, {
        method: "POST",
        body: JSON.stringify({
          patronId: patronId.value,
          source: source.value,
          pickupLocation: pickupLocation.value,
          jsEnabled: true,
        }),
      })
      const responseJson = await response.json()

      if (response.status !== 200) {
        console.error(
          "HoldRequestPage: Error in hold request api response",
          responseJson.error
        )
        setAlert(true)
        setErrorDetail(responseJson?.error?.detail || "")
        setFormPosting(false)
        return
      }
      const { pickupLocation: pickupLocationFromResponse, requestId } =
        responseJson

      setFormPosting(false)

      // Success state
      await router.push(
        `${PATHS.HOLD_CONFIRMATION}/${holdId}?pickupLocation=${pickupLocationFromResponse}&requestId=${requestId}`
      )
    } catch (error) {
      console.error(
        "HoldRequestPage: Error in hold request api response",
        error
      )
      setFormPosting(false)
      setAlert(true)
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
          {alert && (
            <HoldRequestBanner
              item={item}
              heading={
                !item.isAvailable ? "Item unavailable" : "Request failed"
              }
              errorMessage={
                !item.isAvailable
                  ? "This item is currently unavailable."
                  : "We were unable to process your request at this time."
              }
              errorDetail={errorDetail}
            />
          )}
        </Box>
        <Heading level="h2" mb="l" size="heading3">
          Request for on-site use
        </Heading>
        <HoldItemDetails item={item} />
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
              source={item.source}
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
    const redirect = getLoginRedirect(req, `${PATHS.HOLD_REQUEST}[${id}]`)

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
      throw new Error("Item not found")
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
      throw new Error(
        "HoldRequestPage: Error fetching delivery locations in getServerSideProps"
      )
    }

    return {
      props: {
        discoveryBibResult,
        discoveryItemResult,
        deliveryLocations,
        patronId,
        isAuthenticated,
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
