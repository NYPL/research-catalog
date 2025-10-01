import { Heading, Text, Flex, Link } from "@nypl/design-system-react-components"
import Layout from "../../src/components/Layout/Layout"
import { SITE_NAME } from "../../src/config/constants"
import RCHead from "../../src/components/Head/RCHead"
import type { RCPage } from "../../src/types/pageTypes"
import Image from "next/image"
import errorImage from "../../src/assets/errorImage.png"
import { useContext } from "react"
import { FeedbackContext } from "../../src/context/FeedbackContext"
import RCLink from "../../src/components/Links/RCLink/RCLink"

type ErrorPageProps = {
  activePage: RCPage
}

export default function Custom404({ activePage }: ErrorPageProps) {
  const metadataTitle = `404 | ${SITE_NAME}`
  const { openFeedbackFormWithError } = useContext(FeedbackContext)
  return (
    <>
      <RCHead metadataTitle={metadataTitle} />
      <Layout activePage={activePage}>
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
            The page you were looking for doesn&apos;t exist or may have moved
            elsewhere.
          </Text>
          <Text>
            Try a <RCLink href="/">new search</RCLink> or
            <Link onClick={openFeedbackFormWithError} id="feedback-link">
              contact us
            </Link>{" "}
            if the error persists.
          </Text>
        </Flex>
      </Layout>
    </>
  )
}
