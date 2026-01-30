import { Flex, Heading, Text } from "@nypl/design-system-react-components"
import { SITE_NAME } from "../../src/config/constants"
import Layout from "../../src/components/Layout/Layout"
import RCHead from "../../src/components/Head/RCHead"
import { useContext } from "react"
import { FeedbackContext } from "../../src/context/FeedbackContext"
import Image from "next/image"
import errorImage from "../../src/assets/errorImage.png"
import { appConfig } from "../../src/config/appConfig"
import Link from "../../src/components/Link/Link"

export default function Redirect404() {
  const metadataTitle = `Page not found | ${SITE_NAME}`
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

          <Heading level="h3" mb="s">
            We couldn&apos;t find that page
          </Heading>
          <Text>
            You&apos;ve followed an out-of-date link to our research catalog.
          </Text>
          <Text>
            Try our{" "}
            <Link isExternal href={appConfig.urls.circulatingCatalog}>
              Branch Catalog
            </Link>{" "}
            for more materials, or{" "}
            <Link
              onClick={() => openFeedbackFormWithError(404)}
              id="feedback-link"
            >
              contact us
            </Link>{" "}
            for assistance.
          </Text>
        </Flex>
      </Layout>
    </>
  )
}
