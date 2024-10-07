import Head from "next/head"
import {
  Heading,
  Form,
  Box,
  RadioGroup,
  Radio,
  Accordion,
} from "@nypl/design-system-react-components"

import Layout from "../../../src/components/Layout/Layout"
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
        <Form
          id="holdForm"
          // We are using a post request on hold requests when JS is disabled
          method="post"
          action={`${BASE_URL}/search`}
          onSubmit={handleSubmit}
        >
          <RadioGroup
            name="pickup-location"
            id="pickup-location"
            labelText="Choose a pickup location"
          >
            <Radio id="1" labelText="Radio 1" value="1" />
            <Radio id="2" labelText="Radio 2" value="2" />
            <Radio id="3" labelText="Radio 3" value="3" />
            <Radio id="4" labelText="Radio 4" value="4" />
          </RadioGroup>
        </Form>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ params, req }) {
  const { id } = params
  const [bibId, itemId] = id.split("-")
  const patronTokenResponse = await initializePatronTokenAuth(req.cookies)
  const isAuthenticated = patronTokenResponse.isTokenValid

  return {
    props: { bibId, itemId, isAuthenticated },
  }
}
