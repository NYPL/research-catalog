import { Heading, Flex, Link, Text } from "@nypl/design-system-react-components"
import type { HTTPStatusCode } from "../../types/appTypes"
import { appConfig } from "../../config/config"
import { SITE_NAME } from "../../config/constants"
import RCHead from "../Head/RCHead"
import Layout from "../Layout/Layout"
import ExternalLink from "../Links/ExternalLink/ExternalLink"
import { useContext } from "react"
import { FeedbackContext } from "../../context/FeedbackContext"
import Image from "next/image"
import errorImage from "../../assets/errorImage.png"

type SearchErrorProps = {
  errorStatus: HTTPStatusCode
}

export default function SearchError({ errorStatus }: SearchErrorProps) {
  const metadataTitle = `${errorStatus} | ${SITE_NAME}`
  const { onOpen } = useContext(FeedbackContext)

  let errorContent

  switch (errorStatus) {
    case 404:
      errorContent = (
        <>
          <Heading level="h3" tabIndex={-1} id="search-results-heading">
            No results found
          </Heading>
          <Text>
            We couldn&apos;t find anything matching your criteria. Try a
            different search term.{" "}
          </Text>
          <Text>
            You can also search our{" "}
            <ExternalLink href={appConfig.urls.circulatingCatalog}>
              Branch Catalog
            </ExternalLink>{" "}
            or{" "}
            <ExternalLink href={appConfig.urls.legacyCatalog}>
              Legacy Catalog
            </ExternalLink>{" "}
            for more materials, or{" "}
            <Link onClick={onOpen} id="feedback-link">
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
          <Heading level="h3" tabIndex={-1} id="search-results-heading">
            Something went wrong on our end
          </Heading>
          <Text marginBottom="0">
            We encountered an error while trying to load the page.
          </Text>
          <Text marginBottom="0">
            Try refreshing the page or{" "}
            <Link onClick={onOpen} id="feedback-link">
              contact us
            </Link>{" "}
            if the error persists.
          </Text>
        </>
      )
      break

    default:
      errorContent = (
        <>
          <Heading level="h3" tabIndex={-1} id="search-results-heading">
            There was an unexpected error
          </Heading>
          <Text marginBottom="0">
            We couldn&apos;t process your request at this time.
          </Text>
          <Text marginBottom="0">
            Try again later or{" "}
            <Link onClick={onOpen} id="feedback-link">
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
      <RCHead metadataTitle={metadataTitle} />
      <Layout activePage="search">
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
