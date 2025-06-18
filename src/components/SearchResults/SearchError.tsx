import { Heading, Flex, Link, Text } from "@nypl/design-system-react-components"
import type { HTTPStatusCode } from "../../types/appTypes"
import { appConfig } from "../../config/config"
import { SITE_NAME } from "../../config/constants"
import RCHead from "../Head/RCHead"
import Layout from "../Layout/Layout"
import ExternalLink from "../Links/ExternalLink/ExternalLink"
import { useContext } from "react"
import { FeedbackContext } from "../../context/FeedbackContext"

type ErrorPageProps = {
  errorStatus: HTTPStatusCode
}

export default function SearchError({ errorStatus }: ErrorPageProps) {
  const metadataTitle = `${errorStatus} | ${SITE_NAME}`
  const { onOpen } = useContext(FeedbackContext)
  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout activePage={"search"}>
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
          {errorStatus === 404 ? (
            <>
              <Heading level="h3">No results found.</Heading>
              <p>
                Try a different search, or search our{" "}
                <ExternalLink href={appConfig.urls.legacyCatalog}>
                  Legacy Catalog
                </ExternalLink>{" "}
                for research materials.
              </p>
            </>
          ) : (
            <>
              <Heading level="h3">Something went wrong on our end.</Heading>
              <Text marginBottom="0">
                We encountered an error while trying to load the page.
              </Text>
              <Text marginBottom="0">
                Try refreshing the page or{" "}
                <Link onClick={onOpen} id={"feedback-link"}>
                  contact us
                </Link>{" "}
                if the error persists.
              </Text>
            </>
          )}
        </Flex>
      </Layout>
    </>
  )
}
