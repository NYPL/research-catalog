import { Banner, Heading, Text } from "@nypl/design-system-react-components"

import Layout from "../../../src/components/Layout/Layout"
import {
  SITE_NAME,
  HOLD_PAGE_HEADING,
  EDD_PAGE_HEADING,
  PATHS,
} from "../../../src/config/constants"

import Bib from "../../../src/models/Bib"
import Item from "../../../src/models/Item"

import Link from "../../../src/components/Link/Link"

import HoldConfirmationFAQ from "../../../src/components/HoldPages/HoldConfirmationFAQ"
import HoldConfirmationItemDetails from "../../../src/components/HoldPages/HoldConfirmationItemDetails"

import {
  fetchHoldDetails,
  fetchDeliveryLocations,
} from "../../../src/server/api/hold"
import { fetchBib } from "../../../src/server/api/bib"

import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
  getLoginRedirect,
} from "../../../src/server/auth"

import type {
  BibResponse,
  DiscoveryBibResult,
} from "../../../src/types/bibTypes"
import RCHead from "../../../src/components/Head/RCHead"
import { useEffect } from "react"
import PageError from "../../../src/components/Error/PageError"
import type { HTTPStatusCode } from "../../../src/types/appTypes"

interface HoldConfirmationPageProps {
  isEDD?: boolean
  pickupLocationLabel?: string
  discoveryBibResult: DiscoveryBibResult
  errorStatus?: HTTPStatusCode | null
  itemId?: string
}

/**
 * The Hold Confirmation page shows a success message, item details, and a FAQ accordion
 * when a patron successfully places a hold request.
 */
export default function HoldConfirmationPage({
  isEDD = false,
  pickupLocationLabel,
  discoveryBibResult,
  errorStatus = null,
  itemId,
}: HoldConfirmationPageProps) {
  useEffect(() => {
    // Set flag to show hold already happened, if user goes back to form page
    if (itemId) {
      sessionStorage.setItem(`holdCompleted-${itemId}`, "true")
    }
  }, [])

  if (errorStatus) {
    return <PageError page="hold" errorStatus={errorStatus} />
  }

  const bib = new Bib(discoveryBibResult)
  const item = bib?.items[0]
  const metadataTitle = `Request Confirmation | ${SITE_NAME}`

  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout activePage="hold">
        <Heading level="h2" mb="l" size="heading3">
          {isEDD ? EDD_PAGE_HEADING : HOLD_PAGE_HEADING}
        </Heading>

        <Banner
          variant="positive"
          mb="l"
          heading="Request successful"
          content={
            <Text mt="xs">
              You&apos;re all set! We have received your {isEDD ? "scan " : ""}
              request for{" "}
              <Link href={`${PATHS.BIB}/${item.bibId}`}>{item.bibTitle}</Link>
            </Text>
          }
        />
        <HoldConfirmationItemDetails
          item={item}
          pickupLocationLabel={pickupLocationLabel}
        />
        <HoldConfirmationFAQ isEDD={isEDD} />
        <Link
          href={PATHS.HOME}
          fontSize={{
            base: "mobile.body.body2",
            md: "desktop.body.body2",
          }}
          variant="standalone"
          fontWeight="bold"
          isUnderlined={false}
          my="l"
        >
          Start a new search
        </Link>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ params, req, res, query }) {
  const { id } = params
  const { requestId, pickupLocation } = query

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
    const redirect = getLoginRedirect(
      req,
      `${PATHS.HOLD_CONFIRMATION}?requestId=${requestId}`
    )

    return {
      redirect: {
        destination: redirect,
        permanent: false,
      },
    }
  }

  const patronId = patronTokenResponse?.decodedPatron?.sub

  try {
    const { patronId: patronIdFromResponse, status: responseStatus } =
      await fetchHoldDetails(requestId)

    if (patronId !== patronIdFromResponse) {
      throw new Error(
        "Hold confirmation: Logged in patron ID doesn't match the patron ID in the hold request."
      )
    }

    // TODO: Determine error state when there are errors in hold details endpoint reponse
    if (responseStatus !== 200) {
      throw new Error(
        "Hold confirmation: Bad response from hold confirmation request"
      )
    }

    // fetch bib and item
    const [bibId, itemId] = id.split("-")

    if (!itemId) {
      throw new Error("Hold confirmation: No item ID in url")
    }
    const discoveryBib = await fetchBib(bibId, {}, itemId)
    const discoveryBibResult = (discoveryBib as BibResponse).discoveryBibResult
    const discoveryItemResult = discoveryBibResult?.items?.[0]

    if ("status" in discoveryBib && discoveryBib.status !== 200) {
      return {
        props: { pageError: discoveryBib.status },
      }
    }
    if (!discoveryItemResult) {
      console.error("Hold confirmation: Item not found")
      return {
        props: { pageError: discoveryBib.status },
      }
    }

    const bib = new Bib(discoveryBibResult)
    const item = new Item(discoveryItemResult, bib)
    const itemBarcode = item?.barcode

    if (!itemBarcode) {
      throw new Error("Hold confirmation: Item barcode not found")
    }

    const { deliveryLocations } = await fetchDeliveryLocations(
      itemBarcode,
      patronId
    )
    const pickupLocationLabel = deliveryLocations?.find(
      (location) => location.value === pickupLocation
    )?.label

    return {
      props: {
        isEDD: pickupLocation === "edd",
        pickupLocationLabel: pickupLocationLabel || null,
        discoveryBibResult,
        itemId: item.id,
      },
    }
  } catch (error) {
    console.log(error)
    return {
      props: { errorStatus: 500 },
    }
  }
}
