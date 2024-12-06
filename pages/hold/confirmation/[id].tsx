import Head from "next/head"
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
import HoldItemDetails from "../../../src/components/HoldPages/HoldItemDetails"

import {
  fetchHoldDetails,
  fetchDeliveryLocations,
} from "../../../src/server/api/hold"
import { fetchBib } from "../../../src/server/api/bib"

import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
  getLoginRedirect,
} from "../../../src/server/auth"

import type { DiscoveryItemResult } from "../../../src/types/itemTypes"
import type { DiscoveryBibResult } from "../../../src/types/bibTypes"

interface HoldConfirmationPageProps {
  isEDD?: boolean
  pickupLocationLabel?: string
  discoveryBibResult: DiscoveryBibResult
  discoveryItemResult: DiscoveryItemResult
}

/**
 * The Hold Confirmation page shows a success message, item details, and a FAQ accordion
 * when a patron successfully places a hold request.
 */
export default function HoldConfirmationPage({
  isEDD = false,
  pickupLocationLabel,
  discoveryBibResult,
  discoveryItemResult,
}: HoldConfirmationPageProps) {
  const metadataTitle = `Request Confirmation | ${SITE_NAME}`
  console.log(discoveryBibResult)
  const bib = new Bib(discoveryBibResult)
  const item = new Item(discoveryItemResult, bib)

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
      <Layout activePage="hold">
        <Heading level="h2" mb="l" size="heading3">
          {isEDD ? EDD_PAGE_HEADING : HOLD_PAGE_HEADING}
        </Heading>
        <HoldItemDetails item={item} />
        <Banner
          type="positive"
          mb="m"
          heading="Request successful"
          content={
            <>
              <Text mt="xs" noSpace>
                You&apos;re all set! We have received your request for{" "}
                <RCLink href={`${PATHS.BIB}/${item.bibId}`}>
                  {item.bibTitle}
                </RCLink>
              </Text>
              {isEDD ? (
                <Text mt="xs" noSpace>
                  The item will be delivered to the email address you provided.
                </Text>
              ) : pickupLocationLabel ? (
                <Text mt="xs" noSpace>
                  The item will be delivered to: {pickupLocationLabel}.
                </Text>
              ) : (
                <Text>
                  please{" "}
                  <ExternalLink href="https://gethelp.nypl.org/customer/portal/emails/new">
                    email us
                  </ExternalLink>{" "}
                  or call 917-ASK-NYPL (
                  <RCLink href="tel:19172756975">917-275-6975</RCLink>) for your
                  delivery location.
                </Text>
              )}
            </>
          }
        />
        <HoldConfirmationFAQ isEDD={isEDD} />
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

    if (!discoveryItemResult) {
      throw new Error("Hold Confirmation Page - Item not found")
    }

    const bib = new Bib(discoveryBibResult)
    const item = new Item(discoveryItemResult, bib)

    const { deliveryLocations } = await fetchDeliveryLocations(
      item.barcode,
      patronId
    )
    const pickupLocationLabel = deliveryLocations.find(
      (location) => location.value === pickupLocation
    )?.label
    console.log(pickupLocation)
    return {
      props: {
        isEDD: pickupLocation === "edd",
        pickupLocationLabel: pickupLocationLabel || null,
        discoveryBibResult,
        discoveryItemResult,
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
