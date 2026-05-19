import { Heading, Flex, Text } from "@nypl/design-system-react-components"
import type { HTTPStatusCode } from "../../types/appTypes"
import { appConfig } from "../../config/appConfig"
import { SITE_NAME } from "../../config/constants"
import RCHead from "../Head/RCHead"
import Layout from "../Layout/Layout"
import { useContext } from "react"
import { FeedbackContext } from "../../context/FeedbackContext"
import Image from "next/image"
import errorImage from "../../assets/errorImage.png"
import type { RCPage } from "../../types/pageTypes"
import Link from "../Link/Link"

type ResultsErrorProps = {
  page: RCPage
  errorStatus: HTTPStatusCode
}

/* Display error state that replaces browse/search results. */
export default function ResultsError({ errorStatus, page }: ResultsErrorProps) {
  const { openFeedbackFormWithError } = useContext(FeedbackContext)
  let metadataTitle = "Error"
  let errorContent
  const headingID = `${page}-results-heading`

  switch (errorStatus) {
    case 404:
      metadataTitle = "Results not found"
      errorContent = (
        <>
          <Heading level="h3" tabIndex={-1} id={headingID} mb="s">
            No results found
          </Heading>
          <Text>
            We couldn&apos;t find anything matching your criteria. Try a
            different search term.{" "}
          </Text>
          <Text>
            You can also search our{" "}
            <Link isExternal href={appConfig.urls.circulatingCatalog}>
              Branch Catalog
            </Link>{" "}
            for more materials, or{" "}
            <Link
              onClick={() => openFeedbackFormWithError(errorStatus)}
              id="feedback-link"
            >
              contact us
            </Link>{" "}
            for assistance.
          </Text>
        </>
      )
      break

    case 500:
      errorContent = (
        <>
          <Heading level="h3" tabIndex={-1} id={headingID} mb="s">
            Something went wrong on our end
          </Heading>
          <Text marginBottom="0">
            We encountered an error while trying to load the page.
          </Text>
          <Text marginBottom="0">
            Try refreshing the page or{" "}
            <Link
              onClick={() => openFeedbackFormWithError(errorStatus)}
              id="feedback-link"
            >
              contact us
            </Link>{" "}
            if the error persists.
          </Text>
        </>
      )
      break

    // 4xx
    default:
      errorContent = (
        <>
          <Heading level="h3" tabIndex={-1} id={headingID} mb="s">
            There was an unexpected error
          </Heading>
          <Text marginBottom="0">
            We couldn&apos;t process your request at this time.
          </Text>
          <Text marginBottom="0">
            Try again later or{" "}
            <Link
              onClick={() => openFeedbackFormWithError(errorStatus)}
              id="feedback-link"
            >
              contact us
            </Link>{" "}
            if the error persists.
          </Text>
        </>
      )
      break
  }

  return (
    <>
      <RCHead metadataTitle={`${metadataTitle} | ${SITE_NAME}`} />
      <Layout activePage={page}>
        <Flex
          flexDir="column"
          marginTop="l"
          marginBottom="xxl"
          marginLeft="l"
          marginRight="l"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Image
            src={errorImage}
            alt="Error image"
            width={96}
            height={64}
            style={{ marginBottom: "48px" }}
          />
          {errorContent}
        </Flex>
      </Layout>
    </>
  )
}
