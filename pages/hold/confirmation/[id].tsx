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

import RCLink from "../../../src/components/Links/RCLink/RCLink"
import ExternalLink from "../../../src/components/Links/RCLink/RCLink"

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

import type { DiscoveryBibResult } from "../../../src/types/bibTypes"
import RCHead from "../../../src/components/Head/RCHead"
import Custom404 from "../../404"
import { useEffect } from "react"

interface HoldConfirmationPageProps {
  isEDD?: boolean
  pickupLocationLabel?: string
  discoveryBibResult: DiscoveryBibResult
  notFound?: boolean
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
  notFound = false,
  itemId,
}: HoldConfirmationPageProps) {
  useEffect(() => {
    // Set flag to show hold already happened, if user goes back to form page
    if (itemId) {
      sessionStorage.setItem(`holdCompleted-${itemId}`, "true")
    }
  }, [])

  if (notFound) {
    return <Custom404 activePage="hold" />
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
          type="positive"
          mb="l"
          heading="Request successful"
          content={
            <Text mt="xs" noSpace>
              You&apos;re all set! We have received your {isEDD ? "scan " : ""}
              request for{" "}
              <RCLink href={`${PATHS.BIB}/${item.bibId}`}>
                {item.bibTitle}
              </RCLink>
            </Text>
          }
        />
        <HoldConfirmationItemDetails
          item={item}
          pickupLocationLabel={pickupLocationLabel}
        />
        <HoldConfirmationFAQ isEDD={isEDD} />
        <ExternalLink
          href={PATHS.HOME}
          fontSize={{
            base: "mobile.body.body2",
            md: "desktop.body.body2",
          }}
          type="standalone"
          fontWeight="bold"
          isUnderlined={false}
          my="l"
        >
          Start a new search
        </ExternalLink>
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
        "Error in HoldConfirmationPage getServerSideProps: Logged in patron Id doesn't match the patron Id in the hold request."
      )
    }

    // TODO: Determine error state when there are errors in hold details endpoint reponse
    if (responseStatus !== 200) {
      throw new Error(
        "Hold Confirmation Page - Bad response from hold confirmation request"
      )
    }

    // fetch bib and item
    const [bibId, itemId] = id.split("-")

    if (!itemId) {
      throw new Error("No item id in url")
    }
    const { discoveryBibResult } = await fetchBib(bibId, {}, itemId)
    const discoveryItemResult = discoveryBibResult?.items?.[0]

    const bib = new Bib(discoveryBibResult)
    const item = new Item(discoveryItemResult, bib)
    const itemBarcode = item?.barcode

    if (!itemBarcode) {
      throw new Error("Hold Confirmation Page - Item barcode not found")
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
      props: { notFound: true },
    }
  }
}
