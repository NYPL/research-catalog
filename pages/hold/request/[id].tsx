import Head from "next/head"
import {
  Heading,
  Form,
  FormField,
  RadioGroup,
  Radio,
  Accordion,
  Text,
  ButtonGroup,
  Button,
  type AccordionDataProps,
} from "@nypl/design-system-react-components"

import Layout from "../../../src/components/Layout/Layout"
import RCLink from "../../../src/components/Links/RCLink/RCLink"
import ExternalLink from "../../../src/components/Links/ExternalLink/ExternalLink"
import { SITE_NAME, BASE_URL } from "../../../src/config/constants"

import initializePatronTokenAuth from "../../../src/server/auth"

interface BibPropsType {
  bibId?: string
  itemId?: string
  isAuthenticated?: boolean
}

/**
 * The Bib page is responsible for fetching and displaying a single Bib's details.
 */
export default function BibPage({
  bibId,
  itemId,
  isAuthenticated,
}: BibPropsType) {
  const metadataTitle = `Item Request | ${SITE_NAME}`
  console.log("bibId", bibId)
  console.log("itemId", itemId)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("submitting form")
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
      <Layout isAuthenticated={isAuthenticated} activePage="bib">
        <Heading level="h2" mb="l">
          Request for on-site use
        </Heading>
        <Heading level="h3">Choose a pickup location</Heading>
        <Form
          id="holdForm"
          // We are using a post request on hold requests when JS is disabled
          method="post"
          action={`${BASE_URL}/search`}
          onSubmit={handleSubmit}
          mb="l"
        >
          <FormField>
            <RadioGroup
              name="pickup-location"
              id="pickup-location"
              labelText="Pickup location"
              defaultValue="1"
              isRequired
              showLabel={false}
            >
              <Radio
                id="1"
                labelText={
                  <>
                    My Scholar Room
                    <br />
                    476 Fifth Avenue (42nd St and Fifth Ave)
                  </>
                }
                value="1"
              />
              <Radio
                id="2"
                labelText={
                  <>
                    Schwarzman Building - Rose Main Reading Room
                    <br />
                    315 476 Fifth Avenue (42nd St and Fifth Ave)
                  </>
                }
                value="2"
              />
              <Radio
                id="3"
                labelText={
                  <>
                    Schwarzman Building - Art & Architecture Room 300
                    <br />
                    476 Fifth Avenue (42nd St and Fifth Ave)
                  </>
                }
                value="3"
              />
              <Radio
                id="4"
                labelText={
                  <>
                    Schwarzman Building - Dorot Jewish Division Room 111
                    <br />
                    476 Fifth Avenue (42nd St and Fifth Ave)
                  </>
                }
                value="4"
              />
            </RadioGroup>
          </FormField>
          <ButtonGroup>
            <Button id="holdRequestSubmit" type="submit" size="large">
              Submit
            </Button>
          </ButtonGroup>
        </Form>
        <Heading level="h3" mb="l">
          Frequently asked questions
        </Heading>
        <Accordion accordionData={faqContentData} />
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

export async function getServerSideProps({ params, req }) {
  const { id } = params
  const [bibId, itemId] = id.split("-")
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const isAuthenticated = patronTokenResponse.isTokenValid

  return {
    props: { bibId, itemId, isAuthenticated },
  }
}
