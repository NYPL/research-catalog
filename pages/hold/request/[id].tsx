import Head from "next/head"
import { useState } from "react"

import {
  Heading,
  List,
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
import {
  PlainTextElement,
  LinkedDetailElement,
} from "../../../src/components/BibPage/BibDetail"
import { SITE_NAME, BASE_URL, PATHS } from "../../../src/config/constants"

import { findItemInBibResult } from "../../../src/utils/bibUtils"
import { fetchBib } from "../../../src/server/api/bib"
import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
  getLoginRedirect,
} from "../../../src/server/auth"
import { getPatronData } from "../../api/account/[id]"

import Bib from "../../../src/models/Bib"
import Item from "../../../src/models/Item"

import bibDetailStyles from "../../../styles/components/BibDetails.module.scss"

import type { DiscoveryBibResult } from "../../../src/types/bibTypes"
import type { DiscoveryItemResult } from "../../../src/types/itemTypes"

interface BibPropsType {
  discoveryBibResult: DiscoveryBibResult
  discoveryItemResult: DiscoveryItemResult
  isAuthenticated?: boolean
}

/**
 * The Bib page is responsible for fetching and displaying a single Bib's details.
 */
export default function BibPage({
  discoveryBibResult,
  discoveryItemResult,
  isAuthenticated,
}: BibPropsType) {
  const metadataTitle = `Item Request | ${SITE_NAME}`
  // console.log("discoveryBibResult", discoveryBibResult)
  // console.log("discoveryItemResult", discoveryItemResult)
  const bib = new Bib(discoveryBibResult)
  const item = new Item(discoveryItemResult, bib)

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
      <Layout isAuthenticated={isAuthenticated} activePage="search">
        <Heading level="h2" mb="l">
          Request for on-site use
        </Heading>
        <List
          noStyling
          type="dl"
          showRowDividers={false}
          className={bibDetailStyles.bibDetails}
          mb="xs"
        >
          <LinkedDetailElement
            label="Title"
            value={[
              { url: `${PATHS.BIB}/${bib.id}`, urlLabel: bib.titleDisplay },
            ]}
            link="internal"
          />
          <PlainTextElement label="Call number" value={[item.callNumber]} />
          {item.volume ? (
            <PlainTextElement label="Volume/date" value={[item.volume]} />
          ) : null}
        </List>
        <Heading level="h3" size="heading4" mb="m">
          Choose a pickup location
        </Heading>
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
              mb="xs"
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
    const redirect = getLoginRedirect(req, `/hold/request/${id}`)

    return {
      redirect: {
        destination: redirect,
        permanent: false,
      },
    }
  }

  try {
    const patronId = patronTokenResponse.decodedPatron.sub
    const { patron } = await getPatronData(patronId)
    console.log(patron)

    // fetch bib and item
    const [bibId, itemId] = id.split("-")
    const { discoveryBibResult } = await fetchBib(bibId, {
      all_items: true,
    })
    const discoveryItemResult =
      discoveryBibResult && findItemInBibResult(discoveryBibResult, itemId)

    if (!discoveryItemResult) {
      return {
        redirect: {
          destination: PATHS["404"],
          permanent: false,
        },
      }
    }

    return {
      props: { discoveryBibResult, discoveryItemResult, isAuthenticated },
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
