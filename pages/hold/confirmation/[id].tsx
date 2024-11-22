import Head from "next/head"
import { Banner, Heading, Text } from "@nypl/design-system-react-components"

import Layout from "../../../src/components/Layout/Layout"
import {
  SITE_NAME,
  HOLD_PAGE_HEADING,
  EDD_PAGE_HEADING,
  PATHS,
} from "../../../src/config/constants"

import HoldConfirmationFAQ from "../../../src/components/HoldPages/HoldConfirmationFAQ"
// import HoldItemDetails from "../../../src/components/HoldPages/HoldItemDetails"

import { fetchHoldDetails } from "../../../src/server/api/hold"

import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
  getLoginRedirect,
} from "../../../src/server/auth"

interface HoldConfirmationPageProps {
  isEDD?: boolean
}

/**
 * The Hold Confirmation page shows a success message, item details, and a FAQ accordion
 * when a patron successfully places a hold request.
 */
export default function HoldConfirmationPage({
  isEDD = false,
}: HoldConfirmationPageProps) {
  const metadataTitle = `Request Confirmation | ${SITE_NAME}`
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
        {/* <HoldItemDetails item={item} /> */}
        <Banner
          type="positive"
          mb="m"
          heading="Request successful"
          content={
            <Text mb={0} mt="xs">
              You&apos;re all set! We have received your on-site request for
              TODO replace with bib link
            </Text>
          }
        />
        <HoldConfirmationFAQ isEDD={isEDD} />
      </Layout>
    </>
  )
}

export async function getServerSideProps({ req, res, query }) {
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

  const patronId = patronTokenResponse?.decodedPatron?.sub
  const { pickupLocation, requestId } = query

  try {
    const { patronId: patronIdFromResponse } = await fetchHoldDetails(requestId)

    if (patronId !== patronIdFromResponse) {
      throw new Error(
        "Error in HoldConfirmationPage getServerSideProps: Logged in patron Id doesn't match the patron Id in the hold request."
      )
    }

    return {
      props: {
        isEDD: pickupLocation === "edd",
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
