import { Flex, Heading, Link, Text } from "@nypl/design-system-react-components"
import { SITE_NAME } from "../../src/config/constants"
import Layout from "../../src/components/Layout/Layout"
import RCHead from "../../src/components/Head/RCHead"
import { useContext } from "react"
import { FeedbackContext } from "../../src/context/FeedbackContext"
import Image from "next/image"
import errorImage from "../../src/assets/errorImage.png"
import ExternalLink from "../../src/components/Links/ExternalLink/ExternalLink"
import { appConfig } from "../../src/config/config"

export default function Redirect404() {
  const metadataTitle = `404 Redirect | ${SITE_NAME}`
  const { openFeedbackFormWithError } = useContext(FeedbackContext)
  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout activePage="404">
        <Flex
          flexDir="column"
          marginTop="xxl"
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
            width={98}
            height={68}
            style={{ marginBottom: "48px" }}
          />

          <Heading level="h3">We couldn&apos;t find that page</Heading>
          <Text noSpace>
            You&apos;ve followed an out-of-date link to our research catalog.
          </Text>
          <Text noSpace>
            Try our{" "}
            <ExternalLink href={appConfig.urls.circulatingCatalog}>
              Branch Catalog
            </ExternalLink>{" "}
            or{" "}
            <ExternalLink href={appConfig.urls.legacyCatalog}>
              Legacy Catalog
            </ExternalLink>{" "}
            for more materials, or{" "}
            <Link onClick={openFeedbackFormWithError} id="feedback-link">
              contact us
            </Link>{" "}
            for assistance.
          </Text>
        </Flex>
      </Layout>
    </>
  )
}
