import Head from "next/head"
import {
  Banner,
  Accordion,
  type AccordionDataProps,
  Heading,
  Text,
} from "@nypl/design-system-react-components"

import Layout from "../../../src/components/Layout/Layout"
import { SITE_NAME } from "../../../src/config/constants"
import RCLink from "../../../src/components/Links/RCLink/RCLink"
import ExternalLink from "../../../src/components/Links/ExternalLink/ExternalLink"
// import HoldItemDetails from "../../../src/components/HoldPages/HoldItemDetails"

export default function HoldConfirmationPage() {
  // TODO: Add real title
  const metadataTitle = `Hold request | ${SITE_NAME}`
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
        <Heading level="h2" mb="l" size="heading3">
          Request for on-site use
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
        <Heading level="h3" mb="l">
          Frequently asked questions
        </Heading>
        <Accordion accordionData={faqContentData} isDefaultOpen />
      </Layout>
    </>
  )
}

const faqContentData: AccordionDataProps[] = [
  {
    label: "What's next?",
    panel: (
      <>
        <Text>
          Please allow a few minutes for this item to show up in your{" "}
          <RCLink href="/account">patron account</RCLink>.
        </Text>
        <Text>
          The item will be listed as &quot;Ready for pickup&quot; under your
          holds tab when it is available. You will receive an email confirmation
          after your item has arrived.
        </Text>
      </>
    ),
  },
  {
    label: "When will my item be ready for pickup?",
    panel: (
      <>
        <Text>
          <strong>Items stored on-site:</strong> Materials requested up to an
          hour before closing are usually ready for pickup within an hour.
          Materials requested within an hour of closing or outside business
          hours are ready about an hour after opening on the next business day.
        </Text>
        <Text>
          <strong>Items stored off-site:</strong> Materials requested before
          2:30 PM are usually ready for pickup about an hour after opening the
          next day (check{" "}
          <ExternalLink href="https://www.nypl.org/">nypl.org</ExternalLink> for
          library hours). Materials requested after 2:30 PM Mon–Thu are usually
          ready in two days; materials requested after 2:30 PM Fri–Sun are ready
          on Tuesday. Some materials are not delivered on Saturdays.
        </Text>
      </>
    ),
  },
  {
    label: "How long will my item be available for?",
    panel: (
      <>
        <Text>
          We will hold books for up to 14 days, so you can request materials up
          to two weeks in advance.
        </Text>
      </>
    ),
  },
  {
    label: "How do I pick up my item once it is ready?",
    panel: (
      <>
        <Text>
          Once your item is ready for pickup, please arrive at the pickup
          location during business hours and proceed to a help desk. An NYPL
          staff member will check your item out to you.
        </Text>
      </>
    ),
  },
  {
    label: "How do I cancel my request?",
    panel: (
      <>
        <Text>
          If you would like to cancel your request or have questions, please{" "}
          <ExternalLink href="https://gethelp.nypl.org/customer/portal/emails/new">
            email us
          </ExternalLink>{" "}
          or call 917-ASK-NYPL (
          <ExternalLink href="tel:19172756975">917-275-6975</ExternalLink>).
          Processed requests can also be canceled from the holds tab in your
          patron account.
        </Text>
        <Text>
          For more information about our requesting services, please see
          Requesting Research Materials.
        </Text>
      </>
    ),
  },
]
