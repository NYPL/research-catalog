import Head from "next/head"
import { Banner, Heading, Text } from "@nypl/design-system-react-components"

import Layout from "../../../src/components/Layout/Layout"
import {
  SITE_NAME,
  HOLD_PAGE_HEADING,
  EDD_PAGE_HEADING,
} from "../../../src/config/constants"

import HoldConfirmationFAQ from "../../../src/components/HoldPages/HoldConfirmationFAQ"
// import HoldItemDetails from "../../../src/components/HoldPages/HoldItemDetails"

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

export async function getServerSideProps({ query }) {
  const { pickupLocation } = query
  return {
    props: {
      isEdd: pickupLocation === "edd",
    },
  }
}
