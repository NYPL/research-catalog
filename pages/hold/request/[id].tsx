import Head from "next/head"
import { useState, useContext, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import {
  Heading,
  List,
  Button,
  Banner,
  Box,
  SkeletonLoader,
} from "@nypl/design-system-react-components"

import Layout from "../../../src/components/Layout/Layout"
import { FeedbackContext } from "../../../src/context/FeedbackContext"

import HoldRequestForm from "../../../src/components/HoldPages/HoldRequestForm"
import {
  PlainTextElement,
  LinkedDetailElement,
} from "../../../src/components/BibPage/BibDetail"
import RCLink from "../../../src/components/Links/RCLink/RCLink"

import {
  SITE_NAME,
  BASE_URL,
  PATHS,
  BUTTON_LINK_STYLES,
} from "../../../src/config/constants"
import useLoading from "../../../src/hooks/useLoading"

import { fetchBib } from "../../../src/server/api/bib"
import initializePatronTokenAuth, {
  doRedirectBasedOnNyplAccountRedirects,
  getLoginRedirect,
} from "../../../src/server/auth"

import Bib from "../../../src/models/Bib"
import Item from "../../../src/models/Item"

import bibDetailStyles from "../../../styles/components/BibDetails.module.scss"

import type { DiscoveryBibResult } from "../../../src/types/bibTypes"
import type { DiscoveryItemResult } from "../../../src/types/itemTypes"
import type { ItemMetadata } from "../../../src/types/itemTypes"

interface HoldRequestPropsType {
  discoveryBibResult: DiscoveryBibResult
  discoveryItemResult: DiscoveryItemResult
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
  isAuthenticated,
}: HoldRequestPropsType) {
  const metadataTitle = `Item Request | ${SITE_NAME}`

  const bib = new Bib(discoveryBibResult)
  const item = new Item(discoveryItemResult, bib)
  const holdId = `${item.bibId}-${item.id}`

  const [alert, setAlert] = useState(false)
  const [formPosting, setFormPosting] = useState(false)
  const notificationRef = useRef<HTMLDivElement>()
  const { onOpen, setItemMetadata } = useContext(FeedbackContext)

  const router = useRouter()
  const isLoading = useLoading()

  useEffect(() => {
    if (alert && notificationRef.current) {
      notificationRef.current.focus()
    }
  }, [alert])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setFormPosting(true)
      const response = await fetch(`${BASE_URL}/api/hold/request/${holdId}`, {
        method: "POST",
        // TODO: serialize form data
        body: "",
      })
      const responseJson = await response.json()

      if (response.status !== 200) {
        console.error("Error in hold  request api response", responseJson.error)
        setAlert(true)
        setFormPosting(false)
        return
      }

      // Success state
      await router.push(`${PATHS.HOLD_CONFIRMATION}/${holdId}`)
      setFormPosting(false)
    } catch (error) {
      console.error("Error in hold  request api response", error)
      setAlert(true)
      setFormPosting(false)
    }
  }

  const onContact = (metadata: ItemMetadata) => {
    setItemMetadata(metadata)
    onOpen()
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
        <Box tabIndex={-1} ref={notificationRef}>
          {alert && (
            <Banner
              type="negative"
              heading="Request failed"
              data-testid="hold-request-error"
              sx={{ a: { color: "ui.link.primary" } }}
              content={
                <>
                  We were unable to process your request at this time. Please
                  try again,{" "}
                  <Button
                    id="hold-contact"
                    onClick={() =>
                      onContact({
                        id: item.id,
                        barcode: item.barcode,
                        callNumber: item.callNumber,
                        bibId: item.bibId,
                        notificationText: `Request failed for call number ${item.callNumber}`,
                      })
                    }
                    buttonType="link"
                    sx={BUTTON_LINK_STYLES}
                  >
                    contact us
                  </Button>{" "}
                  for assistance, or{" "}
                  <RCLink href="/search">start a new search.</RCLink>
                </>
              }
              mb="s"
            />
          )}
        </Box>
        <Heading level="h2" mb="l" size="heading3">
          Request for on-site use
        </Heading>
        <List
          noStyling
          type="dl"
          showRowDividers={false}
          className={bibDetailStyles.bibDetails}
          mb="xs"
          mt={0}
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
          ) : (
            <></>
          )}
        </List>
        {isLoading || formPosting ? (
          <SkeletonLoader
            showImage={false}
            data-testid="hold-request-loading"
          />
        ) : (
          <>
            <Heading level="h3" size="heading4" mb="l">
              Choose a pickup location
            </Heading>
            <HoldRequestForm
              deliveryLocations={[
                {
                  label: "My Scholar Room",
                  address: "476 Fifth Avenue (42nd St and Fifth Ave)",
                },
                {
                  label: "Schwarzman Building - Rose Main Reading Room",
                  address: "315 476 Fifth Avenue (42nd St and Fifth Ave)",
                },
                {
                  label: "Schwarzman Building - Art & Architecture Room 300",
                  address: "476 Fifth Avenue (42nd St and Fifth Ave)",
                },
                {
                  label: "Schwarzman Building - Dorot Jewish Division Room 111",
                  address: "476 Fifth Avenue (42nd St and Fifth Ave)",
                },
              ]}
              handleSubmit={handleSubmit}
              holdId={holdId}
            />
          </>
        )}
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
    const redirect = getLoginRedirect(req, `/hold/request/[${id}]`)

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
