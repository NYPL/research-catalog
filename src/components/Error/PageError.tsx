import { Heading, Flex, Text } from "@nypl/design-system-react-components"
import type { HTTPStatusCode } from "../../types/appTypes"
import { SITE_NAME } from "../../config/constants"
import RCHead from "../Head/RCHead"
import Layout from "../Layout/Layout"
import { useContext } from "react"
import { FeedbackContext } from "../../context/FeedbackContext"
import Image from "next/image"
import errorImage from "../../assets/errorImage.png"
import type { RCPage } from "../../types/pageTypes"
import Link from "../Link/Link"

type PageErrorProps = {
  page: RCPage
  errorStatus: HTTPStatusCode
}

/* Display error state that replaces entire page contents. */
export default function PageError({ errorStatus, page }: PageErrorProps) {
  const { openFeedbackFormWithError } = useContext(FeedbackContext)
  let metadataTitle = "Error"
  let errorContent
  const headingID = `${page}-results-heading`
  const contactUsLink = (
    <Link
      onClick={() => openFeedbackFormWithError(errorStatus)}
      id="feedback-link"
    >
      contact us
    </Link>
  )

  switch (errorStatus) {
    case 404:
      metadataTitle = "Page not found"
      errorContent = (
        <>
          <Heading level="h3" mb="s">
            We couldn&apos;t find that page
          </Heading>
          <Text>
            The page you were looking for doesn&apos;t exist or may have moved
            elsewhere.
          </Text>
          <Text>
            Try a <Link href="/">new search</Link> or {contactUsLink} if the
            error persists.
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
            Try refreshing the page or {contactUsLink}
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
            Try again later or {contactUsLink}
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
